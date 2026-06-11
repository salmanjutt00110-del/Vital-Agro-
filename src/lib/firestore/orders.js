import {
  collection, addDoc, doc, updateDoc,
  serverTimestamp, query, orderBy,
  onSnapshot, where, getCountFromServer,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

const ORDERS_COLLECTION = 'orders';

/**
 * Generates an incremented order number: VA-YYYY-NNNN.
 * 
 * @returns {Promise<string>} Next order number.
 */
const generateOrderNumber = async () => {
  const year = new Date().getFullYear();
  const colRef = collection(db, ORDERS_COLLECTION);
  const snapshot = await getCountFromServer(colRef);
  const count = snapshot.data().count + 1;
  return `VA-${year}-${String(count).padStart(4, '0')}`;
};

/**
 * Saves a new Cash on Delivery order to Firestore.
 * 
 * @param {object} orderData - Payload containing product item and customer details.
 * @returns {Promise<string>} Created document ID.
 */
export const createOrder = async (orderData) => {
  const orderNumber = await generateOrderNumber();

  const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
    ...orderData,
    orderNumber,
    status:     'pending',
    createdAt:  serverTimestamp(),
    updatedAt:  serverTimestamp(),
  });

  return docRef.id;
};

/**
 * Updates the order state status in Firestore.
 * 
 * @param {string} orderId 
 * @param {string} status 
 * @param {string} [notes] 
 * @returns {Promise<void>}
 */
export const updateOrderStatus = async (orderId, status, notes = "") => {
  const docRef = doc(db, ORDERS_COLLECTION, orderId);
  await updateDoc(docRef, {
    status,
    notes:      notes,
    updatedAt:  serverTimestamp(),
    ...(status === 'confirmed'  && { confirmedAt: serverTimestamp() }),
    ...(status === 'delivered'  && { deliveredAt: serverTimestamp() }),
  });
};

/**
 * Attaches a real-time snapshot listener on the complete orders list.
 * 
 * @param {function} callback - Triggers on every snapshot update.
 * @returns {function} Unsubscribe handle.
 */
export const subscribeToOrders = (callback) => {
  const q = query(
    collection(db, ORDERS_COLLECTION),
    orderBy('createdAt', 'desc')
  );
  return onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(orders);
  });
};

/**
 * Attaches a listener to count the number of currently pending orders.
 * 
 * @param {function} callback 
 * @returns {function} Unsubscribe handle.
 */
export const subscribeToPendingCount = (callback) => {
  const q = query(
    collection(db, ORDERS_COLLECTION),
    where('status', '==', 'pending')
  );
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.size);
  });
};
