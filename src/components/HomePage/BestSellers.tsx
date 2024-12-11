import { FC } from "react";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { dummyProducts } from "../../data/dummy";
import a1 from "../../assets/BSellers/1a.jpg";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import "../../styles/carousel.css";

// Custom arrow components
const CustomPrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="custom-arrow bg-transparent bg-white hover:bg-teal-900 md:mx-8 cursor-pointer rounded-full p-2 shadow-md flex items-center justify-center  absolute  top-1/2 transform -translate-y-1/2 z-20 left-0 group transition-all duration-300"
      onClick={onClick}
    >
      <ChevronLeftIcon className="h-7 w-7 text-black group-hover:text-white - transition-all duration-300 :text-white" />
    </div>
  );
};

const CustomNextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="custom-arrow bg-transparent bg-white hover:bg-teal-900 md:mx-8 cursor-pointer rounded-full p-2 shadow-md flex items-center justify-center  absolute  top-1/2 transform -translate-y-1/2 z-20 right-0 group transition-all duration-300"
      onClick={onClick}
    >
      <ChevronRightIcon className="h-7 w-7  hover:text-white" />
    </div>
  );
};

const BestSellers: FC = () => {
  const { t } = useTranslation();

  // Carousel settings
  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024, // Tablets
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768, // Mobile
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480, // Small mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full py-12 font-poppins  dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-xl font-semibold text-center text-teal-900 dark:text-white mb-6">
          {t("homepage.bestsellers.heading")}
        </h2>
        <Slider {...settings}>
          {dummyProducts.map((product, index) => (
            <ProductCard key={index} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

const ProductCard = () => {
  const product = dummyProducts[0];
  return (
    <div className="w-fit mx-auto  shadow-md overflow-hidden relative">
      <img
        src={a1}
        alt="Product"
        className="w-64 h-64 object-cover cursor-pointer"
      />
      <div className="pt-1 ">
        <p className="text-sm max-w-64 font-medium font-poppins text-gray-700 dark:text-gray-200 hover:text-teal-700 dark:hover:text-gray-300 transition-colors duration-300 cursor-pointer leading-relaxed">
          {product.name}
        </p>

        <div className="flex items-center pt-0.5 cursor-pointer">
          {product.salePrice ? (
            <>
              <p className="text-sm font-medium font-poppins text-gray-500 dark:text-white">
                ${product.salePrice}
              </p>
              <p className="text-sm font-poppins text-red-500 font-medium dark:text-gray-300 line-through ml-2">
                ${product.price}
              </p>
            </>
          ) : (
            <p className="text-sm font-medium font-poppins text-gray-500 dark:text-white">
              ${product.price}
            </p>
          )}

          {product.discount && (
            <p className="text-xs py-0.5 font-poppins bg-orange-500 text-white pl-1 pr-5 ml-2 absolute top-3 right-3">
              -{product.discount}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestSellers;