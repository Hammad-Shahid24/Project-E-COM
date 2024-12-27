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


export interface Cart {
  id?: string; // Unique ID for the cart
  userId: string; // Reference to the user ID
  cartItems: { product: Product, quantity: number }[]; // Array of cart items
  total: number; // Total price of items in the cart
  createdAt?: Timestamp | Date | string; // Optional timestamps
  updatedAt?: Timestamp | Date | string;
}

export interface Order {
  id?: string; // Unique ID for the order
  userId: string; // Reference to the user ID
  orderItems: {product: Product, quantity: number}[]; // Array of cart items
  total: number; // Total amount for the order
  voucherId?: string; // Reference to the voucher ID
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  createdAt: Date; // Order creation date
  updatedAt: Date; // Order last update date
}

export interface Voucher {
  id?: string;
  code: string;
  discountPercentage: number;
  voucherStartDate: Date;
  voucherExpiryDate: Date;
  createdAt?: Timestamp | Date | string;
  updatedAt?: Timestamp | Date | string;
}
