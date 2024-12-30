import { motion } from "framer-motion";
import { Product } from "../../types/Shopping";
import { FC, } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { addCartItem, } from "../../redux/cart/cartSlice";
import { toast } from "react-toastify";
import MiniLoading from "../../shared/MiniLoading";
import { saleValidRightNow } from "../../utils/saleValidRightNow";

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { cart, loading } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);

  const handleNavigate = (product: Product) => {
    const formattedName = product.name.toLowerCase().split(" ").join("-");
    navigate(`/product/${formattedName}/${product.id}`);
  };

  const handleAddToCart = async (product: Product) => {
    if (loading) return;

    if (!user) {
      toast.error("Please login to add items to cart.");
      return;
    }

    try {
      await dispatch(
        addCartItem({
          userId: cart?.userId || user?.id,
          product: product,
          quantity: 1,
        })
      ).unwrap();

      toast.success(
        <div className="flex items-start">
          <img src={product.images[0]} alt="Product" className="w-16 h-16 mr-4 rounded" />
          <div className="flex flex-col">
            <p className="text-sm font-poppins text-gray-800  truncate pr-2 w-48 md:w-32 ">
              {product.name}
            </p>
            <p className="text-xs font-poppins text-gray-500">
              <p className="text-xs font-poppins text-gray-500">
                Quantity: {((cart?.cartItems.find((item) => item.product.id === product.id)?.quantity || 0) + 1)}
              </p>
              <p className="text-xs font-poppins text-gray-500">
                {saleValidRightNow(
                  product?.discountStartDate || new Date(),
                  product?.discountExpiryDate || new Date()
                ) ? (
                  <>
                    <p className="text-xs font-poppins text-gray-500">
                      ${product.price - (product.price * (product.discountPercentage ?? 0)) / 100}
                    </p>
                  </>
                ) : (
                  <p className="text-xs font-poppins text-gray-500">
                    ${product.price}
                  </p>
                )}
              </p>

            </p>
          </div>
        </div>,
        { autoClose: 5000 }
      );

    } catch (err) {
      toast.error(typeof err === "string" ? err : "Failed to add item to cart. Please try again.");
    }
  };

  return (
    <div className="mx-auto overflow-hidden relative text-center group max-w-xs sm:max-w-sm ">
      <div className="relative overflow-hidden">
        <img
          onClick={() => handleNavigate(product)}
          src={product.images[0]}
          alt="Product"
          className="object-contain w-full h-80 sm:h-96 md:h-96 cursor-pointer transition-transform duration-300 ease-in-out transform group-hover:scale-105 group-hover:opacity-80"
        />
        <motion.div className="absolute bottom-0 left-0 right-0 mx-auto bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => handleAddToCart(product)}
            className="text-gray-700 dark:text-gray-200 text-sm sm:text-base font-poppins cursor-pointer py-2 sm:py-3 text-center transition-colors duration-300 w-full"
          >
            {loading ? <MiniLoading /> : "QUICK ADD"}
          </button>
        </motion.div>
      </div>
      <div className="pt-2 text-center">
        <p className="text-sm sm:text-base md:text-lg font-normal font-poppins text-gray-700 dark:text-gray-200 hover:opacity-60 dark:hover:text-gray-300 transition-opacity duration-300 cursor-pointer leading-snug truncate w-full px-4">
          {product.name}
        </p>
        <div className="flex items-center pt-2 justify-center space-x-2">
          {saleValidRightNow(
            product?.discountStartDate || new Date(),
            product?.discountExpiryDate || new Date()
          ) ? (
            <>
              <p className="text-sm sm:text-base font-normal font-poppins text-[#c07575] dark:text-white">
                ${product.price - (product.price * (product.discountPercentage ?? 0)) / 100}
              </p>
              <p className="text-sm font-poppins text-gray-400 font-light dark:text-gray-300 line-through">
                ${product.price}
              </p>
            </>
          ) : (
            <p className="text-sm font-normal font-poppins text-gray-500 dark:text-white">
              ${product.price}
            </p>
          )}
          {saleValidRightNow(
            product?.discountStartDate || new Date(),
            product?.discountExpiryDate || new Date()
          ) && (
              <p className="text-xs py-1 px-3 font-medium font-poppins bg-orange-500 text-white ml-2  absolute top-4 right-4">
                -{product.discountPercentage}%
              </p>
            )}
        </div>
      </div>
    </div>
  );

};

export default ProductCard;