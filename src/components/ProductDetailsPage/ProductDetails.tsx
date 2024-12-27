import { FC } from "react";
import { Product } from "../../types/Shopping";
import { BsTruck } from "react-icons/bs";
import ChevronDownIcon from "@heroicons/react/20/solid/ChevronDownIcon";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import DurationCalculator from "./DurationCalculator";
import { saleValidRightNow } from "../../utils/saleValidRightNow";
import MiniLoading from "../../shared/MiniLoading";

interface ProductDetailProps {
    product: Product;
    currentImageIndex: number;
    handleMainImageClick: () => void;
    handleThumbnailClick: (index: number) => void;
    selectedQuantity: number;
    setSelectedQuantity: (value: number | ((prev: number) => number)) => void;
    handleAddToCart: () => void;
    isDescriptionCollapsed: boolean;
    toggleDescription: () => void;
    user: Record<string, any> | null;
    loading: boolean;
}

const ProductDetails: FC<ProductDetailProps> = ({
    product,
    currentImageIndex,
    handleMainImageClick,
    handleThumbnailClick,
    selectedQuantity,
    setSelectedQuantity,
    handleAddToCart,
    isDescriptionCollapsed,
    toggleDescription,
    user,
    loading
}) => {
    
    return <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start relative  bg-">
        {/* Product Image */}
        <div className="flex flex-col items-center">
            <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full max-w-md rounded-lg cursor-pointer"
                onClick={handleMainImageClick} />
            <div className="flex space-x-4 mt-4 overflow-auto">
                {product.images.map((image: string, index: number) => (
                    <button
                        key={index}
                        onClick={() => handleThumbnailClick(index)}
                        className={`border rounded-lg p-1 ${currentImageIndex === index
                            ? "border-blue-500"
                            : "border-gray-300"}`}
                    >
                        <img
                            src={image}
                            alt={`${product.name} thumbnail ${index + 1}`}
                            className="w-16 h-16 object-cover" />
                    </button>
                ))}
            </div>
        </div>

        {/* Product Details */}
        <div className="font-poppins">
            <h1 className="text-3xl font-light text-gray-800 dark:text-gray-200 mb-4">
                {product?.name}
            </h1>
            <div className="mb-6">
                {saleValidRightNow(
                    product?.discountStartDate || new Date(),
                    product?.discountExpiryDate || new Date()
                ) ? (
                    <>  
                    <div className="flex items-center gap-x-4">
                        <p className="text-md font-normal text-[#8d5151] dark:text-teal-400">
                            ${product?.price - (product.price * product?.discountPercentage!) / 100}
                        </p>
                        <p className="text-md font-light text-gray-400 line-through dark:text-gray-300">
                            ${product?.price}
                        </p>
                        <span className="text-sm text-center font-medium text-white bg-[#c07575] dark:bg-[#532d2d] px-4 rounded-sm py-1 ">
                            -{product?.discountPercentage}%
                        </span>
                    </div>
                    <div className="flex items-center gap-x-4 mt-4 justify-center">
                        <DurationCalculator startDate={product?.discountStartDate || new Date()} endDate={product?.discountExpiryDate || new Date()}/>
                    </div>
                    </>
                ) : (
                    <p className="text-2xl font-semibold text-teal-700 dark:text-teal-400">
                        ${product?.price}
                    </p>
                )}
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700 mb-6"></div>

            {!product?.tags?.includes("Free Shipping") && (
                <div className="flex items-center gap-x-2 text-gray-700 dark:text-gray-300 mb-4">
                    <BsTruck className="w-6 h-6" />
                    <span className="font-poppins">Free Shipping</span>
                </div>
            )}


            <div className="mb-6">
                {product?.stock > 0 ? (
                    <div className="flex flex-col sm:flex-row items-center gap-6 mt-8">
                        {/* Quantity Selector */}
                        <div className="flex items-center space-x-4">
                            {/* Decrease Quantity Button */}
                            <button
                                onClick={() => setSelectedQuantity((prev: number) => Math.max(1, prev - 1))}
                                className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 w-9 h-9 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                            >
                                <span className="text-xl font-semibold">−</span>
                            </button>

                            {/* Quantity Display */}
                            <span className="text-gray-700 dark:text-gray-300 text-lg font-medium">
                                {selectedQuantity}
                            </span>

                            {/* Increase Quantity Button */}
                            <button
                                onClick={() => setSelectedQuantity((prev: number) => Math.min(product?.stock || 1, prev + 1))}
                                className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 w-9 h-9 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                            >
                                <span className="text-xl font-semibold">+</span>
                            </button>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            disabled={!user || loading}
                            onClick={handleAddToCart}
                            className="border-2 border-teal-500 text-teal-500 text-md px-6 py-1   focus:outline-none transition-all duration-300 hover:bg-teal-500 hover:text-white dark:border-teal-500 dark:text-gray-300 dark:hover:bg-teal-500 dark:hover:text-white">
                            {loading ? <MiniLoading/> : "Add to Cart"}
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-center items-center gap-6 mt-8">
                        {/* Out of Stock Button */}
                        <button
                            className="bg-gray-300 text-gray-700 text-lg px-6 py-3 focus:outline-none cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                            disabled
                        >
                            Out of Stock
                        </button>
                    </div>
                )}
            </div>

            <div className="mb-6">
                <button
                    className="flex items-center text-gray-700 dark:text-gray-300 focus:outline-none"
                    onClick={toggleDescription}
                >
                    <span className="mr-2">Description</span>
                    {isDescriptionCollapsed ? (
                        <ChevronDownIcon className="w-5 h-5" />
                    ) : (
                        <ChevronUpIcon className="w-5 h-5" />
                    )}
                </button>
                <div
                    className={`mt-2 text-gray-700 dark:text-gray-300 transition-all duration-300 ${isDescriptionCollapsed ? "max-h-0 overflow-hidden" : "max-h-full"}`}
                >
                    {product?.description}
                </div>
            </div>

        </div>
    </div>;
}

export default ProductDetails;