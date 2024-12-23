import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  doc,
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

// export const fetchProducts = async (
//   lastVisible: QueryDocumentSnapshot<Product> | null | string = null,
//   pageSize: number = 1,
//   sortField: string = "createdAt",
//   sortOrder: "asc" | "desc" = "desc"
// ): Promise<{
//   products: Product[];
//   lastVisible: QueryDocumentSnapshot<Product, DocumentData> | string | null; // Store just the document ID or other serializable value
//   totalProducts: number;
// }> => {
//   try {
//     const productsCol = collection(db, "products");
//     let q;

//     console.log(pageSize, sortField, sortOrder, lastVisible);

//     if (lastVisible) {
//       q = query(
//         productsCol,
//         orderBy(sortField, sortOrder),
//         startAfter(lastVisible),
//         limit(pageSize)
//       );
//     } else {
//       q = query(productsCol, orderBy(sortField, sortOrder), limit(pageSize));
//     }

//     const productSnapshot = await getDocs(q);

//     const productsList: Product[] = productSnapshot.docs.map((doc) => {
//       const data = doc.data() as Product;

//       // Convert Timestamp to Date string (ISO format)
//       data.createdAt = (data.createdAt as Timestamp).toDate().toISOString();
//       data.updatedAt = (data.updatedAt as Timestamp).toDate().toISOString();

//       return { ...data };
//     });

//     // Get the last visible document and store just the ID or serializable data
//     const lastVisibleDocRef =
//       productSnapshot.docs[productSnapshot.docs.length - 1];

//     // Get the total number of documents in the collection
//     const totalCountSnapshot = await getCountFromServer(productsCol);
//     const totalProducts = totalCountSnapshot.data().count;

//     return {
//       products: productsList,
//       lastVisible: lastVisibleDocRef as QueryDocumentSnapshot<Product>,
//       totalProducts,
//     };
//   } catch (error) {
//     console.error("Error fetching more products:", error);
//     if (error instanceof Error) {
//       throw new Error("Error fetching products: " + error.message);
//     } else {
//       throw new Error("Error fetching products: " + String(error));
//     }
//   }
// };

export const getFilteredProducts = async (
  filters: {
    categoryId?: string;
    tags?: string[];
    minPrice?: number;
    maxPrice?: number;
    discountOnly?: boolean;
  },
  lastVisible: QueryDocumentSnapshot<Product> | null = null,
  pageSize: number = 1,
  sortField: string = "createdAt",
  sortOrder: "asc" | "desc" = "desc"
): Promise<{
  products: Product[];
  lastVisible: QueryDocumentSnapshot<Product> | null;
}> => {
  try {
    const productsCol = collection(db, "products");
    let constraints: any[] = [];

    // Apply filters
    if (filters.categoryId) {
      constraints.push(where("categoryId", "==", filters.categoryId));
    }

    if (filters.tags && filters.tags.length > 0) {
      constraints.push(where("tags", "array-contains-any", filters.tags));
    }

    // Add sorting and pagination
    constraints.push(orderBy(sortField, sortOrder));
    if (lastVisible) {
      constraints.push(startAfter(lastVisible));
    }
    constraints.push(limit(pageSize));

    // Create the query
    const q = query(productsCol, ...constraints);

    // Execute the query
    const productSnapshot = await getDocs(q);
    const productsList: Product[] = productSnapshot.docs.map((doc) => {
      const data = doc.data() as Product;

      delete data.createdAt;
      delete data.updatedAt;

      if (data.discountStartDate) {
        data.discountStartDate = convertTimestampToDate(data.discountStartDate) as Date;
      } 
      if (data.discountExpiryDate) {
        data.discountExpiryDate = convertTimestampToDate(data.discountExpiryDate) as Date;
      }

      return { ...data };
    });

    const lastVisibleDocRef =
      productSnapshot.docs[productSnapshot.docs.length - 1] || null;

    return {
      products: productsList,
      lastVisible: lastVisibleDocRef as QueryDocumentSnapshot<Product>,
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
