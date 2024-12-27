import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  doc,
  getDoc,
  deleteDoc,
  serverTimestamp,
  QueryDocumentSnapshot,
  orderBy,
  limit,
  startAfter,
  Timestamp,
  getCountFromServer,
  DocumentData,
} from "firebase/firestore";
import app from "../../config/firebase";
import { Product } from "../../types/Shopping";
import { convertTimestampToDate } from "../../utils/formatDate";

const db = getFirestore(app);

export const fetchProducts = async (
  lastVisible: QueryDocumentSnapshot<Product> | null | string = null,
  categoryId: string | null = null,
  sortField: string = "createdAt",
  sortOrder: "asc" | "desc" = "desc",
  pageSize: number = 1,
): Promise<{
  products: Product[];
  lastVisible: QueryDocumentSnapshot<Product, DocumentData> | string | null; // Store just the document ID or other serializable value
  totalProducts: number;
}> => {
  try {
    const productsCol = collection(db, "products");
    let q;

    if (lastVisible) {
      q = query(
        productsCol,
        where("categoryId", "==",  categoryId),
        orderBy(sortField, sortOrder),
        startAfter(lastVisible),
        limit(pageSize)
      );
    } else {
      q = query(productsCol, where("categoryId", "==", categoryId), orderBy(sortField, sortOrder), limit(pageSize));
    }

    const productSnapshot = await getDocs(q);

    const productsList: Product[] = productSnapshot.docs.map((doc) => {
      const data = doc.data() as Product;

      // Convert Timestamp to Date string (ISO format)
      data.discountStartDate = convertTimestampToDate(data.discountStartDate) as Date;
      data.discountExpiryDate = convertTimestampToDate(data.discountExpiryDate) as Date;

      return { ...data };
    });

    // Get the last visible document and store just the ID or serializable data
    const lastVisibleDocRef = 
      productSnapshot.docs[productSnapshot.docs.length - 1] || null;

    // Get the total number of documents in the collection
    const countQuery = query(productsCol, where("categoryId", "==", categoryId));
    const totalCountSnapshot = await getCountFromServer(countQuery);
    const totalProducts = totalCountSnapshot.data().count;

    return {
      products: productsList,
      lastVisible: lastVisibleDocRef as QueryDocumentSnapshot<Product>,
      totalProducts,
    };
  } catch (error) {
    console.error("Error fetching more products:", error);
    if (error instanceof Error) {
      throw new Error("Error fetching products: " + error.message);
    } else {
      throw new Error("Error fetching products: " + String(error));
    }
  }
};


export const getFilteredProducts = async (
  filters: {
    categoryId?: string;
    tags?: string[];
  },
): Promise<{
  products: Product[];
  totalProducts: number;
}> => {
  try {

    const productsCol = collection(db, "products");
    let constraints: any[] = [];

    // Apply filters
    if (filters.categoryId) {
      constraints.push(where("categoryId", "==", filters.categoryId));
    }
    if (filters.tags && filters.tags.length > 0) {
      constraints.push(where("tags", "array-contains-any", ["Best Sellers" ]));
    }

    // Get total products matching the filters
    const countQuery = query(productsCol, ...constraints);
    const countSnapshot = await getCountFromServer(countQuery);
    const totalProducts = countSnapshot.data().count;

    console.log("Total Products:", totalProducts);


    // Execute the query
    const paginatedQuery = query(productsCol, ...constraints);
    const productSnapshot = await getDocs(paginatedQuery);

    console.log("Returned Documents:", productSnapshot.docs.length);

    const productsList: Product[] = productSnapshot.docs.map((doc) => {
      const data = doc.data() as Product;

      // Adjust data as needed
      if (data.discountStartDate) {
        data.discountStartDate = convertTimestampToDate(data.discountStartDate) as Date;
      }
      if (data.discountExpiryDate) {
        data.discountExpiryDate = convertTimestampToDate(data.discountExpiryDate) as Date;
      }

      return { ...data };
    });

    return {
      products: productsList,
      totalProducts,
    };
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    if (error instanceof Error) {
      throw new Error("Error fetching products: " + error.message);
    } else {
      throw new Error("Error fetching products: " + String(error));
    }
  }
};

export const fetchSingleProductById = async (productId: string): Promise<Product | null> => {
  try {
    const productRef = doc(db, "products", productId);
    const productSnapshot = await getDoc(productRef);

    if (!productSnapshot.exists()) {
      throw new Error("Product not found");
    }

    const data = productSnapshot.data() as Product;
    return {
      ...data,
    };
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    if (error instanceof Error) {
      throw new Error("Error fetching product: " + error.message);
    } else {
      throw new Error("Error fetching product: " + String(error));
    }
  }
};

