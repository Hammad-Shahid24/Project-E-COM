import { FC } from "react";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const dummyData = [
  {
    image:
      "https://zenithcarts.com/cdn/shop/files/5D_Waterproof_Mascara_80x.jpg?v=1730575277",
    name: "5D Waterproof Mascara - Lengthen & Volumize Black Silk Lashes",
    price: "46.00",
    salePrice: "27.00",
    discount: "41%",
  },
  {
    image:
      "https://zenithcarts.com/cdn/shop/files/Moisturizing_Firming_Facial_Essence_80x.jpg?v=1730576174",
    name: "Bakuchiol Retinol Serum – Moisturizing & Firming Facial Essence",
    price: "19.00",
    salePrice: "",
    discount: "",
  },
  {
    image:
      "https://zenithcarts.com/cdn/shop/files/5D_Waterproof_Mascara_80x.jpg?v=1730575277",
    name: "5D Waterproof Mascara - Lengthen & Volumize Black Silk Lashes",
    price: "46.00",
    salePrice: "27.00",
    discount: "41%",
  },
  {
    image:
      "https://zenithcarts.com/cdn/shop/files/Moisturizing_Firming_Facial_Essence_80x.jpg?v=1730576174",
    name: "Bakuchiol Retinol Serum – Moisturizing & Firming Facial Essence",
    price: "19.00",
    salePrice: "",
    discount: "",
  },
  {
    image:
      "https://zenithcarts.com/cdn/shop/files/5D_Waterproof_Mascara_80x.jpg?v=1730575277",
    name: "5D Waterproof Mascara - Lengthen & Volumize Black Silk Lashes",
    price: "46.00",
    salePrice: "27.00",
    discount: "41%",
  },
  {
    image:
      "https://zenithcarts.com/cdn/shop/files/Moisturizing_Firming_Facial_Essence_80x.jpg?v=1730576174",
    name: "Bakuchiol Retinol Serum – Moisturizing & Firming Facial Essence",
    price: "19.00",
    salePrice: "",
    discount: "",
  },
  {
    image:
      "https://zenithcarts.com/cdn/shop/files/5D_Waterproof_Mascara_80x.jpg?v=1730575277",
    name: "5D Waterproof Mascara - Lengthen & Volumize Black Silk Lashes",
    price: "46.00",
    salePrice: "27.00",
    discount: "41%",
  },
];

const SearchItem: FC = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full bg-transparent ">
      {dummyData.map((item, index) => {
        return (
          <div
            key={index}
            className="flex  justify-between items-center w-full py-4 px-5 border-b md:border-none border-gray-300 dark:border-gray-700"
          >
            <div className="flex justify-between items-start">
              <img
                src={item.image}
                alt="product"
                className="h-20 w-20 cursor-pointer"
              />

              <div className="flex flex-col ml-3">
                <p className="text-sm font-medium font-poppins  text-gray-700 dark:text-gray-200 hover:text-teal-700 dark:hover:text-gray-300 transition-colors duration-300 cursor-pointer leading-relaxed">
                  {item.name}
                </p>
                <div className="flex items-center pt-0.5">
                  {item.salePrice ? (
                    <>
                      <p
                        className="
                      
                      text-sm font-medium font-poppins text-gray-500 dark:text-white "
                      >
                        ${item.salePrice}
                      </p>
                      <p className="text-sm font-poppins text-red-500 font-medium dark:text-gray-300 line-through ml-2">
                        ${item.price}
                      </p>
                    </>
                  ) : (
                    <p
                      className="
                  
                  text-sm font-medium font-poppins text-gray-500 dark:text-white "
                    >
                      ${item.price}
                    </p>
                  )}

                  {item.discount && (
                    <p className="text-xs py-0.5 font-poppins bg-orange-500  text-white  pl-1 pr-5 ml-2">
                      -{item.discount}
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

export default SearchItem;
