import { motion } from "framer-motion";
import { Product } from "../../types/Shopping";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}




const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleNavigate = (product: Product) => {
    // format product name
    const formattedName = product.name.toLowerCase().split(" ").join("-");
    navigate(`/product/${formattedName}/${product.id}`);
  };

  return (
    <div className="mx-auto overflow-hidden relative text-center group max-w-xs sm:max-w-sm md:max-w-md">
      <div className="relative">
        <img
        onClick={() => handleNavigate(product)}
          src={product.images[0]}
          alt="Product"
          className="object-cover cursor-pointer w-full h-72 sm:h-80 md:h-96 lg:h-80"
        />
        <motion.div className="absolute bottom-0 left-0 right-0 mx-auto bg-white dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span
          onClick={() => console.log("Quick Add")}
           className="text-gray-700 dark:text-gray-200 text-xs font-poppins cursor-pointer py-4 text-center transition-colors duration-300 w-full">
            QUICK ADD
          </span>
        </motion.div>
      </div>
      <div
      onClick={() => handleNavigate(product)}
       className="pt-1 text-center">
        <p className="text-[0.9rem] w-[22rem] mx-auto font-normal font-poppins text-gray-700 dark:text-gray-200 hover:opacity-60 dark:hover:text-gray-300 transition-opacity duration-300 cursor-pointer leading-relaxed">
          {product.name}
        </p>
        <div className="flex items-center pt-0.5 cursor-pointer justify-center">
          {product.discountPercentage ? (
            <>
              <p className="text-sm font-normal font-poppins text-[#c07575] dark:text-white">
                ${product.price - (product.price * product.discountPercentage) / 100}
              </p>
              <p className="text-sm font-poppins text-gray-400 font-light dark:text-gray-300 line-through ml-2">
                ${product.price}
              </p>
            </>
          ) : (
            <p className="text-sm font-normal font-poppins text-gray-500 dark:text-white">
              ${product.price}
            </p>
          )}
          {product.discountPercentage && (
            <p className="text-xs py-0.5 font-poppins bg-orange-500 text-white pl-1 pr-5 ml-2 absolute top-3 right-3">
              -{product.discountPercentage}%
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
