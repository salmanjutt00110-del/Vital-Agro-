import { useState, useEffect } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import {
  getFirestore,
  enableIndexedDbPersistence,
  collection as realCollection,
  addDoc as realAddDoc,
  doc as realDoc,
  updateDoc as realUpdateDoc,
  serverTimestamp as realServerTimestamp,
  query as realQuery,
  orderBy as realOrderBy,
  where as realWhere,
  getDocs as realGetDocs,
  getCountFromServer as realGetCountFromServer,
  onSnapshot as realOnSnapshot
} from 'firebase/firestore';
import {
  getAuth,
  signInWithEmailAndPassword as realSignIn,
  signOut as realSignOut
} from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { useAuthState as realUseAuthState } from 'react-firebase-hooks/auth';

const hasFirebaseConfig = !!import.meta.env.VITE_FIREBASE_API_KEY && 
                          import.meta.env.VITE_FIREBASE_API_KEY !== 'your_api_key_here' && 
                          import.meta.env.VITE_FIREBASE_API_KEY.trim() !== '';

let db, auth, analytics;

if (hasFirebaseConfig) {
  const firebaseConfig = {
    apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId:             import.meta.env.VITE_FIREBASE_APP_ID,
  };

  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  db = getFirestore(app);
  auth = getAuth(app);
  analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

  if (typeof window !== 'undefined') {
    enableIndexedDbPersistence(db).catch((err) => {
      console.warn("Firestore persistence failed to initialize:", err.code);
    });
  }
} else {
  db = { type: 'db' };
  auth = { type: 'auth' };
  analytics = null;
}

export { db, auth, analytics };

// Helper to convert dates stored as strings in localStorage to Firestore-like Timestamp objects
const convertDates = (obj) => {
  if (!obj) return obj;
  const newObj = { ...obj };
  if (newObj.createdAt && typeof newObj.createdAt === 'string') {
    const date = new Date(newObj.createdAt);
    newObj.createdAt = { toDate: () => date };
  }
  if (newObj.updatedAt && typeof newObj.updatedAt === 'string') {
    const date = new Date(newObj.updatedAt);
    newObj.updatedAt = { toDate: () => date };
  }
  if (newObj.confirmedAt && typeof newObj.confirmedAt === 'string') {
    const date = new Date(newObj.confirmedAt);
    newObj.confirmedAt = { toDate: () => date };
  }
  if (newObj.deliveredAt && typeof newObj.deliveredAt === 'string') {
    const date = new Date(newObj.deliveredAt);
    newObj.deliveredAt = { toDate: () => date };
  }
  return newObj;
};

// Global subscription listener management
const listeners = [];
const notifyListeners = (path) => {
  listeners.forEach(lis => {
    if (lis.path === path) {
      lis.trigger();
    }
  });
};

// Firestore Methods Wrapper
export const collection = (dbRef, path) => {
  if (hasFirebaseConfig) return realCollection(dbRef, path);
  return { type: 'collection', path };
};

export const doc = (dbRef, path, id) => {
  if (hasFirebaseConfig) return realDoc(dbRef, path, id);
  return { type: 'doc', path, id };
};

export const serverTimestamp = () => {
  if (hasFirebaseConfig) return realServerTimestamp();
  return { type: 'serverTimestamp' };
};

const resolveServerTimestamps = (data) => {
  const resolved = { ...data };
  Object.keys(resolved).forEach(key => {
    if (resolved[key] && resolved[key].type === 'serverTimestamp') {
      resolved[key] = new Date().toISOString();
    }
  });
  return resolved;
};

export const addDoc = async (colRef, data) => {
  if (hasFirebaseConfig) return realAddDoc(colRef, data);

  const path = colRef.path;
  const list = JSON.parse(localStorage.getItem('vital_mock_' + path) || '[]');
  const id = 'mock-' + Math.random().toString(36).substring(2, 11);
  const resolvedData = resolveServerTimestamps(data);
  const newDoc = { id, ...resolvedData };

  list.push(newDoc);
  localStorage.setItem('vital_mock_' + path, JSON.stringify(list));
  notifyListeners(path);

  return { id };
};

export const updateDoc = async (docRef, data) => {
  if (hasFirebaseConfig) return realUpdateDoc(docRef, data);

  const path = docRef.path;
  const list = JSON.parse(localStorage.getItem('vital_mock_' + path) || '[]');
  const idx = list.findIndex(item => item.id === docRef.id);
  if (idx !== -1) {
    const resolvedData = resolveServerTimestamps(data);
    list[idx] = { ...list[idx], ...resolvedData };
    localStorage.setItem('vital_mock_' + path, JSON.stringify(list));
    notifyListeners(path);
  }
};

export const query = (colRef, ...constraints) => {
  if (hasFirebaseConfig) return realQuery(colRef, ...constraints);
  return { type: 'query', path: colRef.path, constraints };
};

export const where = (field, op, val) => {
  if (hasFirebaseConfig) return realWhere(field, op, val);
  return { type: 'where', field, op, val };
};

export const orderBy = (field, dir) => {
  if (hasFirebaseConfig) return realOrderBy(field, dir);
  return { type: 'orderBy', field, dir };
};

export const getDocs = async (queryRef) => {
  if (hasFirebaseConfig) return realGetDocs(queryRef);

  const path = queryRef.path;
  const list = JSON.parse(localStorage.getItem('vital_mock_' + path) || '[]');
  let filtered = [...list];

  if (queryRef.type === 'query' && queryRef.constraints) {
    queryRef.constraints.forEach(c => {
      if (c.type === 'where') {
        filtered = filtered.filter(item => {
          const getNestedVal = (obj, pathStr) => {
            return pathStr.split('.').reduce((acc, part) => acc && acc[part], obj);
          };
          const val = getNestedVal(item, c.field);
          if (c.op === '==') return val === c.val;
          return true;
        });
      }
    });
  }

  const docs = filtered.map(item => ({
    id: item.id,
    data: () => convertDates(item)
  }));

  return {
    docs,
    empty: docs.length === 0,
    size: docs.length
  };
};

export const getCountFromServer = async (ref) => {
  if (hasFirebaseConfig) return realGetCountFromServer(ref);

  const path = ref.path;
  const list = JSON.parse(localStorage.getItem('vital_mock_' + path) || '[]');
  return {
    data: () => ({ count: list.length })
  };
};

export const onSnapshot = (ref, callback, errorCallback) => {
  if (hasFirebaseConfig) return realOnSnapshot(ref, callback, errorCallback);

  const path = ref.path;
  const trigger = () => {
    try {
      if (ref.type === 'doc') {
        const list = JSON.parse(localStorage.getItem('vital_mock_' + path) || '[]');
        const docData = list.find(item => item.id === ref.id);
        callback({
          exists: () => !!docData,
          id: ref.id,
          data: () => docData ? convertDates(docData) : null
        });
      } else {
        const list = JSON.parse(localStorage.getItem('vital_mock_' + path) || '[]');
        let filtered = [...list];

        if (ref.type === 'query' && ref.constraints) {
          ref.constraints.forEach(c => {
            if (c.type === 'where') {
              filtered = filtered.filter(item => {
                const getNestedVal = (obj, pathStr) => {
                  return pathStr.split('.').reduce((acc, part) => acc && acc[part], obj);
                };
                const val = getNestedVal(item, c.field);
                if (c.op === '==') return val === c.val;
                return true;
              });
            }
          });
        }

        callback({
          docs: filtered.map(item => ({
            id: item.id,
            data: () => convertDates(item)
          })),
          size: filtered.length
        });
      }
    } catch (e) {
      if (errorCallback) errorCallback(e);
      else console.error(e);
    }
  };

  listeners.push({ path, ref, trigger });
  setTimeout(trigger, 10);

  return () => {
    const idx = listeners.findIndex(lis => lis.trigger === trigger);
    if (idx !== -1) listeners.splice(idx, 1);
  };
};

// Auth Methods Wrapper
export const signInWithEmailAndPassword = async (authRef, email, password) => {
  if (hasFirebaseConfig) return realSignIn(authRef, email, password);

  const adminEmail = import.meta.env.ADMIN_EMAIL || 'admin@vitalagro.com';
  const adminPassword = import.meta.env.ADMIN_PASSWORD || 'your_secure_password_here';

  if (email === adminEmail && password === adminPassword) {
    const user = { email, uid: 'mock-admin-uid' };
    localStorage.setItem('vital_mock_user', JSON.stringify(user));
    window.dispatchEvent(new Event('vital_mock_auth_update'));
    return { user };
  } else {
    const err = new Error('Auth failed: Invalid admin credentials');
    err.code = 'auth/invalid-credential';
    throw err;
  }
};

export const signOut = async (authRef) => {
  if (hasFirebaseConfig) return realSignOut(authRef);

  localStorage.removeItem('vital_mock_user');
  window.dispatchEvent(new Event('vital_mock_auth_update'));
};

export const useAuthState = (authRef) => {
  if (hasFirebaseConfig) return realUseAuthState(authRef);

  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem('vital_mock_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('vital_mock_user');
      setUser(saved ? JSON.parse(saved) : null);
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('vital_mock_auth_update', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('vital_mock_auth_update', handleStorageChange);
    };
  }, []);

  return [user, loading, null];
};
