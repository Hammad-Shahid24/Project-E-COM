import { Timestamp } from "firebase/firestore";

export interface Rating {
  rate: number;
  count?: number;
}

export interface Category {
  id?: string;
  name: string;
  image: string;
  createdAt?: Timestamp | Date;
  updatedAt?: Timestamp | Date;

}

export interface Product {
  id?: string; // Firestore document ID
  name: string;
  price: number;
  stock: number;
  description: string;
  images: string[]; // Array of image URLs
  tags?: string[];
  discountPercentage?: number;
  discountStartDate?: Date;
  discountExpiryDate?: Date;
  categoryId: string; // Reference to the category document ID
  createdAt?: Timestamp | Date | string
  updatedAt?: Timestamp | Date | string
  
}
