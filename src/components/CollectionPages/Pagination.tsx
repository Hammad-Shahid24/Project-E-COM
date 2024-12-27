import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface PaginationProps {
  items: any[];
  totalItems: number;
  pageSize: number;
  setCurrentPageItems: (items: any[]) => void;
  fetchMore: () => Promise<void>;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  items,
  totalItems,
  pageSize,
  setCurrentPageItems,
  fetchMore,
  currentPage,
  setCurrentPage,
}) => {
  const { t } = useTranslation();

  const totalPages = Math.ceil(totalItems / pageSize);

  useEffect(() => {
    setCurrentPageItems(
      items.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    );
  }, [currentPage, items, pageSize, setCurrentPageItems]);

  const handleNext = async () => {

    if (currentPage < totalPages) {
      if (
        items.length < (currentPage + 1) * pageSize &&
        items.length < totalItems
      ) {
        await fetchMore();
      }
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  

  return (
    <div className="flex justify-center items-center space-x-2 mt-16 font-poppins">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-3 py-1 text-sm dark:bg-gray-700 text-gray-500 hover:text-gray-400 transition-all duration-300 dark:text-gray-200 rounded-md ${
          currentPage === 1 ? "cursor-default opacity-50" : ""
        }`}
      >
        {t("collectionspage.pagination.previous")}
      </button>

      {/* Page Numbers */}
  <span className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200">
    Page {currentPage} of {totalPages}
  </span>
      {/* <div className={`px-1.5 py-0.5 border ${
              currentPage === index + 1
                ? "border-gray-900  text-gray-700 cursor-default"
                : "border-transparent dark:border-gray-700  text-gray-700 dark:text-gray-200 hover:text-gray-400 duration-300 transition-all"
            }`}
            >
            Page {currentPage} of {totalPages}
      </div> */}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 text-sm dark:bg-gray-700 text-gray-500 hover:text-gray-400 transition-all duration-300 dark:text-gray-200 rounded-md ${
          currentPage === totalPages ? "cursor-default opacity-50" : ""
        }`}
      >
        {t("collectionspage.pagination.next")}
      </button>
    </div>
  );
};

export default Pagination;
