import { FC } from "react";
import { useTranslation } from "react-i18next";

const Discount: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full dark:border-b dark:border-white bg-[#fff5ee] dark:bg-gray-900 font-poppins py-8 my-0.5">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col gap-8 items-center md:flex-row md:justify-between">
        {/* Text Section */}
        <div className="flex flex-col gap-4 text-center md:text-left">
          <h1 className="text-2xl font-semibold text-teal-900 dark:text-white">
            {t("homepage.discount.heading")}
          </h1>
          <p className="text-sm text-teal-900 dark:text-gray-300">
            {t("homepage.discount.detail")}
          </p>
        </div>

        {/* Input and Button Section */}
        <div className="flex items-center w-full max-w-md rounded-full border border-teal-700 dark:border-gray-700 bg-white dark:bg-gray-800">
          <input
            type="email"
            placeholder={t("homepage.discount.email")}
            className="w-full pl-4 py-4 rounded-l-full bg-transparent focus:outline-none text-md font-poppins text-teal-950 dark:text-white placeholder:text-teal-950 dark:placeholder:text-gray-400 placeholder:font-light"
          />
          <button className="py-3 mr-1 px-6 text-center rounded-full bg-teal-700 text-md text-white hover:bg-teal-600 dark:hover:bg-teal-500 transition-colors duration-300 whitespace-nowrap">
            {t("homepage.discount.subscribe")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Discount;
