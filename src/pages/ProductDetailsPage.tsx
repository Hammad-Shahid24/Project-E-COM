import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { fetchProductById } from "../redux/products/productSlice";
import Lightbox from "react-spring-lightbox";
import Loading from "../shared/Loading";
import { addCartItem, resetError } from "../redux/cart/cartSlice";
import { toast } from "react-toastify";
import ProductDetails from "../components/ProductDetailsPage/ProductDetails"
// import { Product } from "../types/Shopping";



const ProductDetailsPage: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { product, loading, error } = useSelector((state: RootState) => state.products);
  const { cart, loading:cartLoading } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);
  const path = location.pathname;

  // State for managing lightbox and overlay
  const [isLightboxOpen, setLightboxOpen] = useState(false);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  // State to control whether Lightbox is enabled
  const [isLightboxEnabled, setLightboxEnabled] = useState(true);

  // State for managing description collapse
  const [isDescriptionCollapsed, setDescriptionCollapsed] = useState(true);

  // Get the product ID from the URL
  const productId = path.split("/")[3];


  useEffect(() => {
    if (productId && product === null) {
      dispatch(fetchProductById(productId));
    }
  }, [productId, dispatch, location]);

  useEffect(() => {
    if (error && error.length > 0 && loading === false) {
      toast.error(error, { autoClose: 1500 });
    }

    return () => {
      dispatch(resetError());
    }

  }, [error]);

  // Check screen size and disable lightbox for smaller devices
  useEffect(() => {
    const handleResize = () => {
      setLightboxEnabled(window.innerWidth >= 768); // Lightbox enabled only for devices wider than 768px
    };

    handleResize(); // Check on component mount
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMainImageClick = () => {
    if (isLightboxEnabled) {
      setLightboxOpen(true);
      setOverlayVisible(true); // Show overlay
    }
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

  const toggleDescription = () => {
    setDescriptionCollapsed(!isDescriptionCollapsed);
  };

   const handleAddToCart = async () => {
      if (loading) return;
      if (!product) return;

      try {
        await dispatch(
          addCartItem({
            userId: user?.id,
            product: product,
            quantity: 1,
          })
        ).unwrap();
  
        toast.success(
          <div className="flex items-start">
            <img src={product.images[0]} alt="Product" className="w-16 h-16 mr-4 rounded" />
            <div className="flex flex-col">
              <p className="text-sm font-poppins text-gray-800 dark:text-gray-200 truncate pr-2 w-48 md:w-32">
                {product.name}
              </p>
              <p className="text-xs font-poppins text-gray-500 dark:text-gray-300">
                <p className="text-xs font-poppins text-gray-500 dark:text-gray-300">
                  Quantity: {((cart?.cartItems.find((item) => item.product.id === product.id)?.quantity || 0) + 1)}
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

  if (loading) {
    return <Loading />;
  }

 

  return (
    <div className="w-full mx-auto bg-[#fff5ee] dark:bg-gray-900">
      <div className="container mx-auto p-6 relative">
        {/* Overlay for lightbox */}
        {isOverlayVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-80 z-40"></div>
        )}

        {product && (
          ProductDetails({
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
            loading: cartLoading
          })
        )}

        {/* Lightbox for full-screen gallery */}
        {isLightboxEnabled && (
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
              <p className="text-center text-white mt-4">{`${currentImageIndex + 1} / ${galleryImages.length
                }`}</p>
            )}
          />
        )}
      </div>
    </div>
  );

  
};

export default ProductDetailsPage;
