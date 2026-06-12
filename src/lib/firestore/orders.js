import {
  collection, addDoc, doc, updateDoc,
  serverTimestamp, query, orderBy,
  onSnapshot, getCountFromServer,
} from 'firebase/firestore';
import { db } from '../firebase';

const COL = 'orders';

// Auto order number: VA-[Year]-[Count]
const genOrderNum = async () => {
  const year = new Date().getFullYear();
  const snap = await getCountFromServer(collection(db, COL));
  return `VA-${year}-${String(snap.data().count + 1).padStart(4, '0')}`;
};

export const createOrder = async (data) => {
  const orderNumber = await genOrderNum();
  const ref = await addDoc(collection(db, COL), {
    ...data,
    orderNumber,
    status: 'pending',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
};

export const updateOrder = async (id, status, notes) => {
  await updateDoc(doc(db, COL, id), {
    status,
    notes: notes || '',
    updatedAt: serverTimestamp(),
    ...(status === 'confirmed'  && { confirmedAt: serverTimestamp() }),
    ...(status === 'delivered'  && { deliveredAt: serverTimestamp() }),
  });
};

// Legacy compatibility wrapper
export const updateOrderStatus = async (id, status, notes = '', paymentDetails = null) => {
  await updateDoc(doc(db, COL, id), {
    status,
    notes: notes || '',
    updatedAt: serverTimestamp(),
    ...(paymentDetails && { paymentDetails }),
    ...(status === 'confirmed'  && { confirmedAt: serverTimestamp() }),
    ...(status === 'delivered'  && { deliveredAt: serverTimestamp() }),
  });
};

export const subscribeOrders = (cb) =>
  onSnapshot(
    query(collection(db, COL), orderBy('createdAt', 'desc')),
    snap => cb(snap.docs.map(d => {
      const data = d.data();
      // Ensure date conversion helper to handle toDate() if pages call it
      const convertDates = (obj) => {
        if (!obj) return obj;
        const newObj = { ...obj };
        const dateFields = ['createdAt', 'updatedAt', 'confirmedAt', 'deliveredAt'];
        dateFields.forEach(f => {
          if (newObj[f] && typeof newObj[f].toDate !== 'function') {
            const dVal = newObj[f].seconds 
              ? new Date(newObj[f].seconds * 1000) 
              : new Date(newObj[f]);
            newObj[f] = { toDate: () => dVal };
          }
        });
        return newObj;
      };
      return { id: d.id, ...convertDates(data) };
    }))
  );

// Legacy compatibility wrapper
export const subscribeToOrders = (cb) => subscribeOrders(cb);
export const subscribeToPendingCount = (cb) => {
  return onSnapshot(
    query(collection(db, COL)),
    snap => {
      const pendings = snap.docs.filter(d => d.data().status === 'pending');
      cb(pendings.length);
    }
  );
};
