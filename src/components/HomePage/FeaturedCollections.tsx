import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Category } from "../../types/Shopping";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface FeaturedCollectionsProps {
  categories: Category[];
  // categoryLoading: boolean;
  // categoryError: string | null;
}

const FeaturedCollections: FC<FeaturedCollectionsProps> = ({
  categories,
  // categoryLoading,
  // categoryError,
}) => {
  const { t } = useTranslation();

  return (
    <div className="w-full py-12 font-poppins bg-[#fff5ee] dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-center text-teal-900 dark:text-white mb-4">
            {t("homepage.featured.heading")}
            <div className="w-10 h-0.5 bg-teal-600 dark:bg-teal-400 mx-auto mt-2"></div>
          </h2>
        </div>

        <div className="flex max-w-4xl md:max-h-[29rem] gap-4 mx-auto flex-col md:flex-row dark:bg-gray-900 overflow-hidden ">
          <div className="w-full md:w-1/2 group overflow-hidden relative ">
            <img
              src={categories[0]?.image}
              alt="Featured Collection 1"
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110 cursor-pointer"
            />
            <button className="bg-white text-gray-900 text-sm font-medium py-1 px-3 absolute bottom-5 left-1/2 transform -translate-x-1/2 transition-all duration-300 ease-in-out hover:bg-teal-700 hover:text-white active:opacity-75">
              {categories[0]?.name}
            </button>
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center gap-4 ">
            {categories.slice(1, 3).map((category) => (
              <div key={category.id} className="w-full group overflow-hidden relative">
                <img
                  src={category.image}
                  alt="Featured Collection 2"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110 cursor-pointer"
                />
                <button className="bg-white text-gray-900 text-sm font-medium py-1 px-3 absolute bottom-5 left-1/2 transform -translate-x-1/2 transition-all duration-300 ease-in-out hover:bg-teal-700 hover:text-white active:opacity-75">
                  {category.name}
                </button>
              </div>
            ))}
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCollections;
