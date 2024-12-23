import { FC } from "react";
import Carousel from "../components/HomePage/Carousel";
import FeaturedCollections from "../components/HomePage/FeaturedCollections";
import Services from "../components/HomePage/Services";
import Discount from "../components/HomePage/Discount";
import BestSellers from "../components/HomePage/BestSellers";
import Marquee from "react-fast-marquee";
import AnimatedSection from "../components/AnimatedSection";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import {
  fetchAllCategories,
  clearError as clearCategoryError,
} from "../redux/categories/categorySlice";
import {
  fetchFilteredProducts,
  resetProducts,
  clearError as clearProductError,
} from "../redux/products/productSlice";
import { toast } from "react-toastify";
import LoadingAnimation from "../assets/loading.json";
import Lottie from "lottie-react";

const Home: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const {
    categories,
    loading: categoryLoading,
    error: categoryError,
  } = useSelector((state: RootState) => state.categories);

  const {
    products,
    loading: productLoading,
    error: productError,
  } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!categories.length) {
      dispatch(fetchAllCategories());
    }
    dispatch(
      fetchFilteredProducts({
        filters: {
          tags: ["Best Sellers"],
        },
        pageSize: 8,
      })
    );

    return () => {
      dispatch(resetProducts());
    };
  }, []);

  useEffect(() => {
    if (categoryError && categoryError.length > 0) {
      toast.error(categoryError);
    }
    if (productError && productError.length > 0) {
      toast.error(productError);
    }

    return () => {
      dispatch(clearCategoryError());
      dispatch(clearProductError());
    };
  }, [productError, categoryError]);

  if (categoryLoading || productLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Lottie animationData={LoadingAnimation} loop={true} />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto">
      <Carousel />
      <AnimatedSection delay={0.4}>
        <FeaturedCollections
          categories={categories}
          // categoryError={categoryError}
          // categoryLoading={categoryLoading}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <BestSellers
          products={products}
          // productLoading={productLoading}
          // productError={productError}
        />
      </AnimatedSection>
      <Marquee
        gradient={false}
        speed={50}
        autoFill={true}
        pauseOnHover={true}
        pauseOnClick={false}
        className="bg-zenithHeader text-white py-2 font-poppins"
      >
        <span className="mx-16">{t("homepage.marquee.1")}</span>
        <span className="mx-16">{t("homepage.marquee.2")}</span>
        <span className="mx-16">{t("homepage.marquee.3")}</span>
        <span className="mx-16">{t("homepage.marquee.4")}</span>
        <span className="mx-16">{t("homepage.marquee.5")}</span>
      </Marquee>
      <AnimatedSection delay={0.4}>
        <Services />
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <Discount />
      </AnimatedSection>
    </div>
  );
};

export default Home;
