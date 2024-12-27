import { Category } from "../types/Shopping";

export  const getCategoryId = (categoryName: string, categories: Category[]) => {
    const category = categories.find((category) => category.name === categoryName);
    return category ? category.id : "";
  };