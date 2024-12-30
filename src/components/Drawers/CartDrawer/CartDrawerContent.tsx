import { FC, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { TbShoppingBagX } from "react-icons/tb";
import { Cart } from "../../../types/Shopping";
import CartItemList from "./cartItem";
import { CustomScroll } from "react-custom-scroll";
// import "../../../styles/custom-scroll.css";
import MiniLoading from "../../../shared/MiniLoading";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";


interface CartDrawerContentProps {
  onClose: () => void;
  cart: Cart;
  loading: boolean;
  user: Record<string, any> | null;
  handleUpdateQuantity: ({ productId, quantity }: { productId: string, quantity: number }) => Promise<void>;
  handleRemoveItem: ({ productId }: { productId: string }) => Promise<void>;
}

const CartDrawerContent: FC<CartDrawerContentProps> = ({ onClose,
  cart,
  loading,
  handleUpdateQuantity,
  handleRemoveItem
  , user
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [skipLoading, setSkipLoading] = useState(false);

  return (
    <div className="flex flex-col h-full items-center">
      {/* Header with Title and Close Button */}
      <div className="flex justify-between items-center w-full py-4 px-5 border-b border-gray-300 dark:border-gray-700">
        <h1 className="text-lg font-poppins text-teal-950 dark:text-teal-200">
          {t("drawers.cartdrawer.shoppingcart")}
        </h1>
        <motion.svg
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.4 }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="h-7 w-7 cursor-pointer text-gray-600 dark:text-teal-300"
          onClick={onClose}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </motion.svg>
      </div>

      {/* Main Content */}
      {user && loading && !skipLoading ? (
        <MiniLoading />
      ) : cart?.cartItems.length === 0 ? (
        <div className="w-8/12 py-12 px-4 space-y-4 mx-auto text-center">
          <TbShoppingBagX className="w-12 h-12 text-cyan-800 dark:text-gray-400 mx-auto" />
          <h1 className="text-sm font-poppins text-cyan-800 dark:text-teal-200">
            {t("drawers.cartdrawer.emptycart")}
          </h1>
          <button
            onClick={() => {
              navigate("/")
              onClose()
            }
            }
            className="bg-cyan-800 rounded-3xl text-white font-semibold hover:bg-opacity-75 text-sm transition-colors duration-300 py-2 px-2 w-full dark:bg-teal-600 dark:hover:bg-teal-700"
          >
            {t("drawers.cartdrawer.return")}
          </button>
        </div>
      ) : (
        <>
          <div className="grow w-full overflow-y-auto bg-[#fafafa] dark:bg-gray-800">
            <CustomScroll heightRelativeToParent="calc(100%)">
              <CartItemList cart={cart} loading={loading} handleRemoveItem={handleRemoveItem} handleUpdateQuantity={handleUpdateQuantity} setSkipLoading={setSkipLoading} />
            </CustomScroll>
          </div>
          {/* Footer Section */}
          <div className="w-full">
            {/* Divider (Hidden on Small Screens) */}
            <div className="hidden md:flex justify-center w-full">
              <hr className="w-full border-t border-gray-300 dark:border-gray-700 mx-4 my-1" />
            </div>

            {/* Checkout Button */}
            {/* <div className="flex justify-center w-full pt-4">
              <button
                onClick={() => navigate("/checkout")}
                className="bg-cyan-800 rounded-3xl text-white font-semibold hover:bg-opacity-75 text-sm transition-colors duration-300 py-2 px-2 w-8/12 dark:bg-teal-600 dark:hover:bg-teal-700"
              >
                {t("drawers.cartdrawer.checkout")}
              </button>
            </div> */}

            {/* Subtotal */}
            {
              user &&
              <div className="flex justify-between items-center w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 rounded-md shadow">
                <p className="text-lg font-semibold text-gray-800 dark:text-teal-300 uppercase">
                  Subtotal
                </p>
                <p className="text-lg font-semibold text-gray-800 dark:text-teal-300">
                  ${cart?.total.toFixed(2)} <span className="text-sm">USD</span>
                </p>
              </div>
            }


            {/* Taxes Details */}
            {
              user &&
              <div className="flex justify-between w-full px-4">
                <p className="text-xs font-poppins text-gray-900 dark:text-teal-200 ">
                  Shipping, taxes, and discount codes are calculated at checkout
                </p>
              </div>
            }

            {/* View All Link */}
            {
              user &&
              <div className="py-4 w-full">
                <motion.div
                  className="w-full flex items-center group"
                  whileHover="hover"
                  whileTap="hover"
                >
                  <button
                    onClick={() => {
                      navigate("/checkout")
                      onClose()
                    }}
                    className="py-1 ml-4 mr-1 text-sm font-poppins text-gray-900 font-medium dark:text-teal-200">
                    {/* {t("drawers.cartdrawer.viewall")} */}
                    {t("drawers.cartdrawer.checkout")}
                  </button>
                  <motion.div
                    className="h-5 w-5"
                    variants={{ hover: { x: 5 } }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ArrowRightIcon className="h-5 w-5 text-gray-900 dark:text-teal-300" />
                  </motion.div>
                </motion.div>
              </div>
            }


          </div>
        </>
      )
      }


    </div >
  );

};

export default CartDrawerContent;
