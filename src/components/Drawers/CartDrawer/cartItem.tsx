import { FC, useCallback } from "react";
import { debounce, set } from "lodash";
import { Cart } from "../../../types/Shopping";
import { useNavigate } from "react-router-dom";
import { saleValidRightNow } from "../../../utils/saleValidRightNow";
import { truncateText } from "../../../utils/truncateText";
import {
    TbSquareRoundedMinus,
    TbSquareRoundedMinusFilled,
    TbSquareRoundedPlusFilled,
} from "react-icons/tb";
import { MdRemoveShoppingCart } from "react-icons/md";

interface CartItemListProps {
    cart: Cart;
    loading: boolean;
    handleUpdateQuantity: ({ productId, quantity }: { productId: string, quantity: number }) => Promise<void>;
    handleRemoveItem: ({ productId }: { productId: string }) => Promise<void>;
    setSkipLoading: (value: boolean) => void;
}

const CartItemList: FC<CartItemListProps> = ({ cart, loading, handleRemoveItem, handleUpdateQuantity, setSkipLoading }) => {
    const navigate = useNavigate();

    // Debounced version of handleUpdateQuantity
    const debouncedUpdateQuantity = useCallback(
        debounce(({ productId, quantity }) => {
            setSkipLoading(true);
            console.log("Updating quantity: ", quantity);
            handleUpdateQuantity({ productId, quantity }).then(() => {
                setSkipLoading(false);
            });
        }, 300),
        [handleUpdateQuantity]
    );

    const handleQuantityChange = ({ productId, quantity }: { productId: string, quantity: number }) => {
        debouncedUpdateQuantity({ productId, quantity });
    };

    const deleteHandler = () => {
        setSkipLoading(true);
        handleRemoveItem({ productId: cart.cartItems[0].product.id! }).then(() => {

            setSkipLoading(false);
        });
    };

    return (
        <div className="w-full">
            {cart?.cartItems.map((item, index) => {
                return (
                    <div
                        key={index}
                        className="flex justify-between items-center w-full py-4 px-5 border-b md:border-none border-gray-300 dark:border-gray-700 mb-1"
                    >
                        <div className="flex items-start ">
                            <img
                                onClick={() => navigate(`/product/${item.product.id}`)}
                                src={item.product.images[0]}
                                alt="product"
                                className="h-20 w-20 cursor-pointer"
                            />

                            <div className="flex flex-col ml-3 ">
                                <p
                                    onClick={() => navigate(`/product/${item.product.id}`)}
                                    className="text-sm font-medium font-poppins text-gray-700 dark:text-gray-200 hover:text-teal-700 dark:hover:text-teal-300 transition-colors duration-300 cursor-pointer leading-relaxed ">
                                    {truncateText(item.product.name, 45)}
                                </p>
                                <div className="flex items-center pt-0.5">
                                    {saleValidRightNow(
                                        item?.product.discountStartDate || new Date(),
                                        item?.product.discountExpiryDate || new Date()
                                    ) ? (
                                        <>
                                            <p className="text-sm font-medium font-poppins text-gray-500 dark:text-gray-300">
                                                $
                                                {(
                                                    item.product.price -
                                                    item.product.price *
                                                    ((item.product.discountPercentage || 0) / 100)
                                                ).toFixed(2)}
                                            </p>
                                        </>
                                    ) : (
                                        <p className="text-sm font-medium font-poppins text-gray-500 dark:text-gray-300">
                                            ${item.product.price}
                                        </p>
                                    )}

                                    {saleValidRightNow(
                                        item.product?.discountStartDate || new Date(),
                                        item.product?.discountExpiryDate || new Date()
                                    ) && (
                                            <p className="text-xs py-0.5 font-poppins bg-orange-500 text-white pl-1 pr-5 ml-2">
                                                -{item.product.discountPercentage}%
                                            </p>
                                        )}
                                </div>

                                {/* Quantity Controller */}
                                <div className="flex justify-start items-center mt-3 gap-x-2 w-full">
                                    <button
                                        onClick={() => handleQuantityChange({ productId: item.product.id!, quantity: item.quantity - 1 })}
                                        disabled={item.quantity === 1}
                                        className="flex items-center justify-center rounded-md  text-gray-600  hover:text-gray-700 dark:bg-white dark:text-gray-700   dark:hover:text-gray-800 transition-all duration-300"
                                    >
                                        {item.quantity === 1 ? (
                                            <TbSquareRoundedMinusFilled className="h-5 w-5" />
                                        ) : (
                                            <TbSquareRoundedMinus className="h-5 w-5" />
                                        )}
                                    </button>
                                    <p className="text-sm min-w-6  text-center font-medium font-poppins text-gray-700 dark:text-gray-200">
                                        {item.quantity}
                                    </p>
                                    <button
                                        disabled={item.quantity === item.product.stock}
                                        onClick={() => handleQuantityChange({ productId: item.product.id!, quantity: item.quantity + 1 })}
                                        className="flex items-center justify-center rounded-md  text-teal-600 hover:text-teal-700 dark:bg-white  transition-all duration-300"
                                    >
                                        <TbSquareRoundedPlusFilled className="h-5  w-5" />
                                    </button>
                                    {/* Remove Button */}
                                    <button
                                        disabled={loading}
                                        onClick={deleteHandler}
                                        className="text-sm font-medium font-poppins ml-4 text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-500"
                                    >
                                        <MdRemoveShoppingCart className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CartItemList;
