import { FC } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { IoFunnelOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { Product } from "../../types/Shopping";
import StickySortDropdown from "./StickySortDropdown";

interface FilteringAndPagingProps {
  items: Product[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  fetchMore: (count: number) => Promise<void>;
  sortOptions: { key: string; label: string }[];
  onSortChange: (key: string) => Promise<void>;
}

const StickyFilter: FC<FilteringAndPagingProps> = ({
  items,
  setCurrentPage,
  fetchMore,
  sortOptions,
  onSortChange,
}) => {
  
  const { t } = useTranslation();

 

  

  return (
    <div className="flex justify-between mx-auto max-w-screen-2xl border border-gray-300 dark:bg-gray-800 dark:border-gray-600">
      <button className="flex items-center space-x-2 px-4 py-5 text-gray-800 hover:bg-opacity-85 dark:text-gray-200 dark:hover:bg-opacity-85 transition-colors duration-300 border-r border-gray-300 dark:border-gray-600">
        <IoFunnelOutline className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        <span className="text-[0.8rem] tracking-widest">
          {t("collectionspage.stickyfilter.filters")}
        </span>
      </button>
      {/* <button className="flex items-center space-x-2 px-4 py-2 text-gray-800 hover:bg-opacity-85 dark:text-gray-200 dark:hover:bg-opacity-85 transition-colors duration-300 border-l border-gray-300 dark:border-gray-600">
        <span className="text-[0.8rem] tracking-widest">
          {t("collectionspage.stickyfilter.sortby")}
        </span>
        <ChevronDownIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button> */}
      <StickySortDropdown
        sortOptions={sortOptions}
        onSortChange={onSortChange}
      />
    </div>
  );
};

export default StickyFilter;


 // <div className="flex justify-between mx-auto max-w-screen-2xl border border-gray-300 dark:bg-gray-800 dark:border-gray-600">
    //   <button className="flex items-center space-x-2 px-4 py-5 text-gray-800 hover:bg-opacity-85 dark:text-gray-200 dark:hover:bg-opacity-85 transition-colors duration-300 border-r border-gray-300 dark:border-gray-600">
    //     <IoFunnelOutline className="w-4 h-4 text-gray-600 dark:text-gray-300" />
    //     <span className="text-[0.8rem] tracking-widest">
    //       {t("collectionspage.stickyfilter.filters")}
    //     </span>
    //   </button>
    //   <button className="flex items-center space-x-2 px-4 py-2 text-gray-800 hover:bg-opacity-85 dark:text-gray-200 dark:hover:bg-opacity-85 transition-colors duration-300 border-l border-gray-300 dark:border-gray-600">
    //     <span className="text-[0.8rem] tracking-widest">
    //       {t("collectionspage.stickyfilter.sortby")}
    //     </span>
    //     <ChevronDownIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
    //   </button>
    // </div>
