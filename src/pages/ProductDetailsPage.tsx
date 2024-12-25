import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { fetchProductById } from "../redux/products/productSlice";
import Lightbox from "react-spring-lightbox";

const ProductDetailsPage: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { product, loading, error } = useSelector((state: RootState) => state.products);
  const path = location.pathname;

  // Local state for managing lightbox and overlay
  const [isLightboxOpen, setLightboxOpen] = useState(false);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get the product ID from the URL
  const productId = path.split("/")[3];

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [productId, dispatch]);

  const handleMainImageClick = () => {
    setLightboxOpen(true);
    setOverlayVisible(true); // Show overlay
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setOverlayVisible(false); // Hide overlay
  };

  const galleryImages =
    product?.images?.map((image: string) => ({
      src: image,
      alt: `${product.name} - image ${product?.images.indexOf(image) + 1}`,
    })) || [];

  const handlePrev = () =>
    setCurrentImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));

  const handleNext = () =>
    setCurrentImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));

  return (
    <div className="container mx-auto p-6 relative">
      {/* Overlay for lightbox */}
      {isOverlayVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-40"></div>
      )}

      {loading && <p>Loading...</p>}
      {error && (
        <div className="text-red-500 text-center mt-4">
          <p>Error loading product details. Please try again later.</p>
        </div>
      )}
      {product && !loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center relative z-50">
          {/* Product Image */}
          <div className="flex flex-col items-center">
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="w-full max-w-md rounded-lg shadow-md cursor-pointer"
              onClick={handleMainImageClick}
            />
            <div className="flex space-x-4 mt-4 overflow-auto">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`border rounded-lg p-1 ${
                    currentImageIndex === index
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-16 h-16 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              {product.name}
            </h1>
            <p className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-6">
              ${product.price}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {product.description}
            </p>
            {/* Buy Button */}
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200"
              onClick={() => alert("Add to cart functionality")}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}

      {/* Lightbox for full-screen gallery */}
      <Lightbox
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        images={galleryImages}
        currentIndex={currentImageIndex}
        onPrev={handlePrev}
        onNext={handleNext}
        renderHeader={() => (
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 px-3 py-1 rounded"
          >
            Close
          </button>
        )}
        renderFooter={() => (
          <p className="text-center text-white mt-4">{`${currentImageIndex + 1} / ${
            galleryImages.length
          }`}</p>
        )}
      />
    </div>
  );
};

export default ProductDetailsPage;
