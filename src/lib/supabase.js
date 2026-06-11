import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const hasSupabaseConfig = !!import.meta.env.VITE_SUPABASE_URL && 
                          !!import.meta.env.VITE_SUPABASE_ANON_KEY && 
                          import.meta.env.VITE_SUPABASE_URL !== 'your_supabase_url_here' && 
                          import.meta.env.VITE_SUPABASE_URL.trim() !== '';

// Setup Realtime subscribers registry for mock mode
const realtimeChannels = [];
const notifyRealtime = (table, eventType, newRecordOrRecords) => {
  realtimeChannels.forEach(ch => {
    if (ch.table === '*' || ch.table === table) {
      const records = Array.isArray(newRecordOrRecords) ? newRecordOrRecords : [newRecordOrRecords];
      records.forEach(record => {
        ch.callback({
          schema: 'public',
          table,
          commit_timestamp: new Date().toISOString(),
          eventType,
          new: eventType !== 'DELETE' ? record : {},
          old: eventType === 'DELETE' ? record : {}
        });
      });
    }
  });
};

const authListeners = [];
const triggerAuthChange = (event, session) => {
  authListeners.forEach(lis => lis(event, session));
};

// Supabase Local Storage Mock Query Chain Builder
class SupabaseQueryBuilder {
  constructor(table) {
    this.table = table;
    this.filters = [];
    this.orderByField = null;
    this.orderByAsc = true;
    this.limitVal = null;
    this.isSingle = false;
    this.action = 'select';
    this.payload = null;
  }

  select(cols = '*') {
    this.action = 'select';
    return this;
  }

  insert(data) {
    this.action = 'insert';
    this.payload = data;
    return this;
  }

  update(data) {
    this.action = 'update';
    this.payload = data;
    return this;
  }

  delete() {
    this.action = 'delete';
    return this;
  }

  eq(field, value) {
    this.filters.push({ type: 'eq', field, value });
    return this;
  }

  order(field, { ascending = true } = {}) {
    this.orderByField = field;
    this.orderByAsc = ascending;
    return this;
  }

  limit(val) {
    this.limitVal = val;
    return this;
  }

  single() {
    this.isSingle = true;
    return this;
  }

  async then(resolve, reject) {
    try {
      const res = await this.execute();
      resolve(res);
    } catch (e) {
      if (reject) reject(e);
      else throw e;
    }
  }

  async execute() {
    const listKey = 'vital_sb_' + this.table;
    let list = JSON.parse(localStorage.getItem(listKey) || '[]');

    if (this.action === 'select') {
      let filtered = [...list];
      this.filters.forEach(f => {
        if (f.type === 'eq') {
          filtered = filtered.filter(item => {
            const getNestedVal = (obj, pathStr) => {
              return pathStr.split('->').reduce((acc, part) => acc && acc[part], obj);
            };
            const val = f.field.includes('->') ? getNestedVal(item, f.field) : item[f.field];
            return val === f.value;
          });
        }
      });

      if (this.orderByField) {
        filtered.sort((a, b) => {
          const valA = a[this.orderByField];
          const valB = b[this.orderByField];
          if (valA < valB) return this.orderByAsc ? -1 : 1;
          if (valA > valB) return this.orderByAsc ? 1 : -1;
          return 0;
        });
      }

      if (this.limitVal !== null) {
        filtered = filtered.slice(0, this.limitVal);
      }

      const data = this.isSingle ? (filtered[0] || null) : filtered;
      return { data, error: null };
    }

    if (this.action === 'insert') {
      const rows = Array.isArray(this.payload) ? this.payload : [this.payload];
      const inserted = rows.map(r => {
        const id = r.id || 'sb-row-' + Math.random().toString(36).substring(2, 11);
        const createdAt = new Date().toISOString();
        return { id, created_at: createdAt, ...r };
      });
      list = [...list, ...inserted];
      localStorage.setItem(listKey, JSON.stringify(list));
      
      notifyRealtime(this.table, 'INSERT', inserted);
      return { data: this.isSingle ? inserted[0] : inserted, error: null };
    }

    if (this.action === 'update') {
      let updatedRows = [];
      list = list.map(item => {
        let match = true;
        this.filters.forEach(f => {
          if (f.type === 'eq' && item[f.field] !== f.value) match = false;
        });
        if (match) {
          const updatedItem = { ...item, ...this.payload, updated_at: new Date().toISOString() };
          updatedRows.push(updatedItem);
          return updatedItem;
        }
        return item;
      });

      localStorage.setItem(listKey, JSON.stringify(list));
      if (updatedRows.length > 0) {
        notifyRealtime(this.table, 'UPDATE', updatedRows);
      }
      return { data: this.isSingle ? updatedRows[0] : updatedRows, error: null };
    }

    if (this.action === 'delete') {
      let deletedRows = [];
      list = list.filter(item => {
        let match = true;
        this.filters.forEach(f => {
          if (f.type === 'eq' && item[f.field] !== f.value) match = false;
        });
        if (match) {
          deletedRows.push(item);
          return false;
        }
        return true;
      });

      localStorage.setItem(listKey, JSON.stringify(list));
      if (deletedRows.length > 0) {
        notifyRealtime(this.table, 'DELETE', deletedRows);
      }
      return { data: deletedRows, error: null };
    }
  }
}

// Emulated Mock Supabase Client Object
const mockSupabase = {
  auth: {
    async signInWithPassword({ email, password }) {
      const adminEmail = import.meta.env.ADMIN_EMAIL || 'admin@vitalagro.com';
      const adminPassword = import.meta.env.ADMIN_PASSWORD || 'your_secure_password_here';

      if (email === adminEmail && password === adminPassword) {
        const user = { email, id: 'sb-admin-uid', role: 'admin' };
        const session = { access_token: 'mock-sb-token', user };
        localStorage.setItem('vital_sb_session', JSON.stringify(session));
        triggerAuthChange('SIGNED_IN', session);
        return { data: { user, session }, error: null };
      }
      return { data: { user: null, session: null }, error: { message: 'Invalid admin credentials', code: 'invalid_credentials' } };
    },

    async signOut() {
      localStorage.removeItem('vital_sb_session');
      triggerAuthChange('SIGNED_OUT', null);
      return { error: null };
    },

    async getSession() {
      if (typeof window === 'undefined') return { data: { session: null }, error: null };
      const saved = localStorage.getItem('vital_sb_session');
      return { data: { session: saved ? JSON.parse(saved) : null }, error: null };
    },

    async getUser() {
      if (typeof window === 'undefined') return { data: { user: null }, error: null };
      const saved = localStorage.getItem('vital_sb_session');
      const session = saved ? JSON.parse(saved) : null;
      return { data: { user: session ? session.user : null }, error: null };
    },

    onAuthStateChange(callback) {
      if (typeof window === 'undefined') return { data: { subscription: { unsubscribe() {} } } };
      const saved = localStorage.getItem('vital_sb_session');
      const session = saved ? JSON.parse(saved) : null;
      
      const listener = (event, currentSession) => {
        callback(event, currentSession);
      };
      authListeners.push(listener);
      setTimeout(() => callback('INITIAL_SESSION', session), 10);

      return {
        data: {
          subscription: {
            unsubscribe() {
              const idx = authListeners.indexOf(listener);
              if (idx !== -1) authListeners.splice(idx, 1);
            }
          }
        }
      };
    }
  },

  from(table) {
    return new SupabaseQueryBuilder(table);
  },

  channel(name) {
    return {
      on(event, filter, callback) {
        const table = filter.table || '*';
        realtimeChannels.push({ channelName: name, event, table, callback });
        return this;
      },
      subscribe() {
        return this;
      }
    };
  },

  removeChannel(ch) {
    // No-op for mock channels
  }
};

export const supabase = hasSupabaseConfig 
  ? createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)
  : mockSupabase;

// Compatibility adapters
export const db = { type: 'db' };
export const auth = supabase;

export const useAuthState = (supabaseClient) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const initAuth = async () => {
      const { data } = await supabaseClient.auth.getSession();
      if (isMounted) {
        setUser(data.session?.user || null);
        setLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (isMounted) {
        setUser(session?.user || null);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [supabaseClient]);

  return [user, loading, null];
};

export const signInWithEmailAndPassword = async (authRef, email, password) => {
  const { data, error } = await authRef.auth.signInWithPassword({ email, password });
  if (error) {
    const err = new Error(error.message);
    err.code = error.code || 'auth/invalid-credential';
    throw err;
  }
  return data;
};

export const signOut = async (authRef) => {
  const { error } = await authRef.auth.signOut();
  if (error) throw new Error(error.message);
};

// Firestore Query Adapter mappings over Supabase queries
export const collection = (dbRef, path) => {
  return { type: 'collection', path };
};

export const doc = (dbRef, path, id) => {
  return { type: 'doc', path, id };
};

export const addDoc = async (colRef, data) => {
  const { data: insertedData, error } = await supabase
    .from(colRef.path)
    .insert([data])
    .select();
  
  if (error) throw new Error(error.message);
  return { id: insertedData[0].id };
};

export const updateDoc = async (docRef, data) => {
  const { error } = await supabase
    .from(docRef.path)
    .update(data)
    .eq('id', docRef.id);
  
  if (error) throw new Error(error.message);
};

export const query = (colRef, ...constraints) => {
  return { type: 'query', path: colRef.path, constraints };
};

export const where = (field, op, val) => {
  return { type: 'where', field, op, val };
};

export const orderBy = (field, dir) => {
  return { type: 'orderBy', field, dir };
};

// Helper to convert date strings to a Timestamp-like object
const convertDates = (obj) => {
  if (!obj) return obj;
  const newObj = { ...obj };
  const dateFields = ['created_at', 'updated_at', 'confirmedAt', 'deliveredAt'];
  dateFields.forEach(f => {
    if (newObj[f] && typeof newObj[f] === 'string') {
      const d = new Date(newObj[f]);
      newObj[f] = { toDate: () => d };
      // Map to legacy Firestore naming for safety
      if (f === 'created_at') newObj.createdAt = { toDate: () => d };
      if (f === 'updated_at') newObj.updatedAt = { toDate: () => d };
    }
  });
  return newObj;
};

export const getDocs = async (queryRef) => {
  let q = supabase.from(queryRef.path).select('*');
  if (queryRef.type === 'query' && queryRef.constraints) {
    queryRef.constraints.forEach(c => {
      if (c.type === 'where' && c.op === '==') {
        q = q.eq(c.field, c.val);
      }
    });
  }
  const { data, error } = await q;
  if (error) throw new Error(error.message);

  const docs = (data || []).map(item => ({
    id: item.id,
    data: () => convertDates(item)
  }));

  return {
    docs,
    empty: docs.length === 0,
    size: docs.length
  };
};

export const onSnapshot = (ref, callback, errorCallback) => {
  let active = true;

  const trigger = async () => {
    try {
      if (ref.type === 'doc') {
        const { data, error } = await supabase.from(ref.path).select('*').eq('id', ref.id).single();
        if (error) throw new Error(error.message);
        if (active) {
          callback({
            exists: () => !!data,
            id: ref.id,
            data: () => data ? convertDates(data) : null
          });
        }
      } else {
        let q = supabase.from(ref.path).select('*');
        if (ref.type === 'query' && ref.constraints) {
          ref.constraints.forEach(c => {
            if (c.type === 'where' && c.op === '==') {
              q = q.eq(c.field, c.val);
            }
          });
        }
        const { data, error } = await q;
        if (error) throw new Error(error.message);
        if (active) {
          callback({
            docs: (data || []).map(item => ({
              id: item.id,
              data: () => convertDates(item)
            })),
            size: (data || []).length
          });
        }
      }
    } catch (e) {
      if (errorCallback) errorCallback(e);
      else console.error("Snapshot error:", e);
    }
  };

  trigger();

  const channelName = `realtime-${ref.path}-${Math.random().toString(36).substring(7)}`;
  const channel = supabase
    .channel(channelName)
    .on('postgres_changes', { event: '*', schema: 'public', table: ref.path }, () => {
      trigger();
    })
    .subscribe();

  return () => {
    active = false;
    supabase.removeChannel(channel);
  };
};

export const serverTimestamp = () => {
  return new Date().toISOString();
};

export const getCountFromServer = async (ref) => {
  const { data, error } = await supabase.from(ref.path).select('id');
  if (error) throw new Error(error.message);
  return {
    data: () => ({ count: (data || []).length })
  };
};
