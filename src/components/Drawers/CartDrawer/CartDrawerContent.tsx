import { FC } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { TbShoppingBagX } from "react-icons/tb";
// import SearchItem from "./SearchItem";
import { CustomScroll } from "react-custom-scroll";
// import "../../../styles/custom-scroll.css";

interface CartDrawerContentProps {
  onClose: () => void;
}

const CartDrawerContent: FC<CartDrawerContentProps> = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-full items-center">
      {/* the below div contains the login text and the cross button */}
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

      {/* the below div contains the inspiration text */}
      <div className="w-8/12 py-12 px-4 space-y-4 mx-auto ">
        <TbShoppingBagX className="w-12 h-12 text-cyan-800 dark:text-gray-400 mx-auto" />
        <h1 className="text-sm font-poppins  text-center text-cyan-800 dark:text-teal-200">
          {t("drawers.cartdrawer.emptycart")}
        </h1>
        <button
          onClick={() => console.log("Sign in")}
          className="bg-cyan-800 rounded-3xl text-white font-semibold hover:bg-opacity-75 text-sm transition-colors duration-300 py-2 px-2 w-full mb-2 dark:bg-teal-600 dark:hover:bg-teal-700"
        >
          {t("drawers.cartdrawer.return")}
        </button>
      </div>
    </div>
  );
};

export default CartDrawerContent;
