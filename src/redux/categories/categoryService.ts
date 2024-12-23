import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "../../config/firebase";
import { Category } from "../../types/Shopping";

const db = getFirestore(app);

// Fetch all categories from Firestore
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const categoriesCol = collection(db, "categories");
    const categorySnapshot = await getDocs(categoriesCol);

    // Map each document to the Category type with proper type assertion
    const categoriesList: Category[] = categorySnapshot.docs.map((doc) => {
      const data = doc.data() as Category; // Explicitly cast Firestore data to Category type

      delete data?.createdAt;
      delete data?.updatedAt;

      return { ...data }; // Add the Firestore doc id to Category
    });

    return categoriesList;
  } catch (error) {
    console.error("Error fetching categories:", error);
    if (error instanceof Error) {
      throw new Error("Error fetching categories: " + error.message);
    } else {
      throw new Error("Error fetching categories: " + String(error));
    }
  }
};
