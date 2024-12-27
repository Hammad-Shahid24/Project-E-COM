import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  doc,
  serverTimestamp,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import app from "../../config/firebase";
import { Order } from "../../types/Shopping";

const db = getFirestore(app);

// Create a new order
export const createOrder = async (order: Order): Promise<Order> => {
  try {
    const ordersCol = collection(db, "orders");
    const docRef = await addDoc(ordersCol, {
      ...order,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    await updateDoc(docRef, { id: docRef.id }); // Assign the Firestore-generated ID
    // clear cart
    const cartCol = collection(db, "carts");
    const q = query(cartCol, where("userId", "==", order.userId));
    const cartSnapshot = await getDocs(q);
    const cartDoc: QueryDocumentSnapshot<DocumentData> = cartSnapshot.docs[0];
    await updateDoc(doc(cartCol, cartDoc.id), { cartItems: [] });
    

    return { ...order, id: docRef.id };
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Error creating order: " + (error instanceof Error ? error.message : String(error)));
  }
};

// Fetch orders by user ID
export const fetchOrdersByUserId = async (userId: string): Promise<Order[]> => {
  try {
    const ordersCol = collection(db, "orders");
    const q = query(ordersCol, where("userId", "==", userId));
    const orderSnapshot = await getDocs(q);

    const ordersList: Order[] = orderSnapshot.docs.map((doc) => {
      const data = doc.data() as Order;
      return { ...data, id: doc.id };
    });

    return ordersList;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Error fetching orders: " + (error instanceof Error ? error.message : String(error)));
  }
};

// 