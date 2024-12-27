import { FC } from "react";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Cart } from "../../../types/Shopping";
import { useNavigate } from "react-router-dom";
import { saleValidRightNow } from "../../../utils/saleValidRightNow";
import { truncateText } from "../../../utils/truncateText";

interface CartItemProps {
    cart: Cart;
}

const CartItem: FC<CartItemProps> = ({
    cart
}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="w-full bg-transparent ">
            {cart.cartItems.map((item, index) => {
                return (
                    <div
                        key={index}
                        className="flex  justify-between items-center w-full py-4 px-5 border-b md:border-none border-gray-300 dark:border-gray-700"
                    >
                        <div className="flex justify-between items-start">
                            <img
                                src={item.product.images[0]}
                                alt="product"
                                className="h-20 w-20 cursor-pointer"
                            />

                            <div className="flex flex-col ml-3">
                                                   
                                
                                <p className="text-sm font-medium font-poppins text-gray-700 dark:text-gray-200 hover:text-teal-700 dark:hover:text-gray-300 transition-colors duration-300 cursor-pointer leading-relaxed">
                                  {truncateText(item.product.name, 30)}
                                </p>
                                <div className="flex items-center pt-0.5">
                                    {saleValidRightNow(
                                        item?.product.discountStartDate || new Date(),
                                        item?.product.discountExpiryDate || new Date()
                                    ) ? (
                                        <>
                                                                                      <p className="text-sm font-medium font-poppins text-gray-500 dark:text-white ">
                                              ${(
                                                item.product.price - item.product.price * ((item.product.discountPercentage || 0) / 100)
                                              ).toFixed(2)}
                                            </p>
                                           
                                        </>
                                    ) : (
                                        <p className="text-sm font-medium font-poppins text-gray-500 dark:text-white">
                                            ${item.product.price}
                                        </p>
                                    )}

                                    {saleValidRightNow(
                                        item.product?.discountStartDate || new Date(),
                                        item.product?.discountExpiryDate || new Date()
                                    ) && (
                                            <p className="text-xs py-0.5 font-poppins bg-orange-500  text-white  pl-1 pr-5 ml-2">
                                                -{item.product.discountPercentage}%
                                            </p>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
            <div className="hidden md:flex justify-center w-full">
                <hr className="w-full border-t border-gray-300 mx-4 my-1" />
            </div>

            <div className="flex justify-center w-full pt-4">
                <button
                    onClick={() => navigate("/checkout")}
                    className="bg-cyan-800 rounded-3xl text-white font-semibold hover:bg-opacity-75 text-sm transition-colors duration-300 py-2 px-2 w-8/12 mb-2 dark:bg-teal-600 dark:hover:bg-teal-700"
                >
                    {/* {t("drawers.cartdrawer.checkout")} */}
                    checkout
                </button>
            </div>

            <div className="py-4 w-full">
                <motion.div
                    className="w-full  flex items-center group "
                    whileHover="hover" // Trigger animation state on hover
                    whileTap="hover"
                >
                    <button className="py-1 ml-4 mr-1 text-sm font-poppins text-gray-900 font-medium dark:text-teal-200 ">
                        {t("drawers.searchdrawer.viewall")}
                    </button>
                    <motion.div
                        className="h-5 w-5"
                        variants={{
                            hover: { x: 5 }, // Move 5px to the right when the parent is hovered
                        }}
                        transition={{ type: "spring", stiffness: 300 }} // Smooth movement
                    >
                        <ArrowRightIcon className="h-5 w-5 cursor-pointer text-gray-900 dark:text-teal-300 " />
                    </motion.div>
                </motion.div>
            </div>

        </div>
    );
};

export default CartItem;
