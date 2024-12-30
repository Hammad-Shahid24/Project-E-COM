import { FC } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
// import { HiMagnifyingGlass } from "react-icons/hi2";
import SearchItem from "./SearchItem";
import { CustomScroll } from "react-custom-scroll";
import { Category, Product } from "../../../types/Shopping";
// import "../../../styles/custom-scroll.css";

interface SearchDrawerContentProps {
  onClose: () => void;
  products: Product[];
  loading: boolean;
  error: string | null;
  categories: Category[];
}

const SearchDrawerContent: FC<SearchDrawerContentProps> = ({ onClose,
  products,
  loading,
  error,
  categories
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-full items-center justify-center">
      {/* the below div contains the login text and the cross button */}
      <div className="flex justify-between items-center w-full py-4 px-5 border-b border-gray-300 dark:border-gray-700">
        <h1 className="text-lg font-poppins text-teal-950 dark:text-teal-200">
          {t("drawers.searchdrawer.search")}
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

      {/* the below div contains the search bar */}
      {/* <div className="flex justify-center items-center w-full py-4 px-5 border-b border-gray-300 dark:border-gray-700">
        <div className="flex justify-between items-center px-5 rounded-full border border-gray-300 dark:border-gray-700 w-full mx-auto bg-white dark:bg-gray-800">
          <input
            type="text"
            placeholder={t("drawers.searchdrawer.searchplaceholder")}
            className="w-full bg-transparent focus:outline-none py-2 text-sm font-poppins  pr-2 text-gray-900 dark:text-white"
          />
          <HiMagnifyingGlass className="h-6 w-6 text-gray-600 dark:text-teal-300" />
        </div>
      </div> */}

      {/* the below div contains the inspiration text */}
      <div className=" w-full py-2 font-poppins text-sm font-medium text-gray-950 dark:text-gray-200 shadow-md px-5 border-b border-gray-300 dark:border-gray-700">
        <p>{t("drawers.searchdrawer.inspiration")}</p>
      </div>

      {/* the below div contains the featured items and the view all button */}
      <div
        className="grow w-full overflow-y-auto bg-[#fafafa
    ]"
      >
        <CustomScroll heightRelativeToParent="calc(100%)">
          <SearchItem onClose={onClose} products={products} loading={loading} error={error} categories={categories} />
          {/* <div className="w-full bg-red-200 ">asdfsa</div> */}
        </CustomScroll>
      </div>
    </div>
  );
};

export default SearchDrawerContent;
