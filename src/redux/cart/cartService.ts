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
} from "firebase/firestore";
import app from "../../config/firebase";
import { Cart, Product } from "../../types/Shopping";
import { convertTimestampToDate } from "../../utils/formatDate";
import { saleValidRightNow } from "../../utils/saleValidRightNow";

const db = getFirestore(app);

// Add a product to the cart
export const addToCart = async (
  userId: string,
  product: Product,
  quantity: number
): Promise<Cart> => {
  try {
    let cart = await fetchCartByUserId(userId);

    if (!cart) {
      const cartsCol = collection(db, "carts");
      const docRef = await addDoc(cartsCol, {
        userId,
        cartItems: [],
        total: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      cart = { id: docRef.id, userId, cartItems: [], total: 0 };
    }

    const existingItemIndex = cart.cartItems.findIndex(
      (item) => item.product.id === product.id
    );

    let newQuantity = quantity;
    if (existingItemIndex !== -1) {
      const existingItem = cart.cartItems[existingItemIndex];
      newQuantity = existingItem.quantity + quantity;
    }

    if (newQuantity > product.stock) {
      throw new Error(
        `Requested quantity (${newQuantity}) exceeds stock (${product.stock}).`
      );
    }

    if (existingItemIndex !== -1) {
      cart.cartItems[existingItemIndex].quantity = newQuantity;
    } else {
      cart.cartItems.push({ product, quantity });
    }

    // Recalculate the total price
    cart.total = cart.cartItems.reduce((sum, item) => {
      const { discountPercentage, discountStartDate, discountExpiryDate, price } = item.product;

      let finalPrice = price;

      // Apply discount if within the valid period
      if (
        saleValidRightNow(discountStartDate || new Date(), discountExpiryDate || new Date())
      ) {
        finalPrice = price - (price * (discountPercentage ?? 0)) / 100;
      }

      return sum + finalPrice * item.quantity;
    }, 0);

    console.log("Cart after adding:", cart.total);

    const cartRef = doc(db, "carts", cart.id!);
    await updateDoc(cartRef, {
      cartItems: cart.cartItems,
      total: cart.total,
      updatedAt: serverTimestamp(),
    });

    return cart;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw new Error("Error adding to cart: " + (error instanceof Error ? error.message : String(error)));
  }
};


// Fetch a user's cart from Firestore
export const fetchCartByUserId = async (userId: string): Promise<Cart | null> => {
  try {
    const cartsCol = collection(db, "carts");
    const q = query(cartsCol, where("userId", "==", userId));
    const cartSnapshot = await getDocs(q);

    if (cartSnapshot.empty) {
      return null;
    }
    
    const cartDoc = cartSnapshot.docs[0];
    const cartData = cartDoc.data() as Cart;

    cartData.createdAt = convertTimestampToDate(cartData.createdAt) as Date;
    cartData.updatedAt = convertTimestampToDate(cartData.updatedAt) as Date;

    return { ...cartData, id: cartDoc.id };
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw new Error("Error fetching cart: " + (error instanceof Error ? error.message : String(error)));
  }
};




// Empty a user's cart
export const emptyCart = async (userId: string): Promise<void> => {
  try {
    const cart = await fetchCartByUserId(userId);

    if (!cart) {
      throw new Error("Cart not found for the user.");
    }

    const cartRef = doc(db, "carts", cart.id!);
    await updateDoc(cartRef, {
      cartItems: [],
      total: 0,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error emptying cart:", error);
    throw new Error("Error emptying cart: " + (error instanceof Error ? error.message : String(error)));
  }
};
