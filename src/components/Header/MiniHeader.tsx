import { FC } from "react";
import { FiPhone } from "react-icons/fi";
import { BsEnvelope } from "react-icons/bs";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslation } from "react-i18next";

const MiniHeader: FC = () => {
  const { t } = useTranslation();

  return (
    <header className="w-full bg-[#f6f6f8] dark:bg-gray-800  dark:border-gray-700">
      <div className="max-w-screen-xl mx-auto px-4 py-2 hidden lg:flex justify-between items-center relative text-xs text-gray-500 dark:text-white font-poppins">
        <div className="flex items-center space-x-4 ">
          <div className="flex items-center space-x-2 text-black dark:text-white">
            <FiPhone className="text-gray-500 dark:text-white" />
            <span className="text-gray-500 dark:text-white">+447877381196</span>
          </div>
          <div className="flex items-center space-x-2 text-black dark:text-white">
            <BsEnvelope className="text-gray-500 dark:text-white" />
            <span className="hover:text-teal-800 transition-colors duration-300 cursor-pointer text-gray-500 dark:text-white dark:hover:text-teal-400">
              info@zenithcarts.com
            </span>
          </div>
        </div>
        <div className="flex items-center text-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span>{t("header.miniheader.grabDiscount")}</span>
          <span className="text-red-500 dark:text-teal-400 font-medium  px-1">
            PsytechBF40
          </span>
          <span className="font-bold text-gray-800 dark:text-white dark:hover:text-teal-400 hover:text-teal-700 transition-colors duration-300 cursor-pointer ">
            {t("header.miniheader.shopNow")}
          </span>
        </div>
        <LanguageSwitcher />{" "}
      </div>
      <div className="max-w-screen-xl mx-auto gap-1.5 py-2 flex flex-col lg:hidden justify-center items-center  text-xs text-gray-500 dark:text-white font-poppins">
        <div className="flex items-center text-center ">
          <span>{t("header.miniheader.grabDiscount")}</span>
          <span className="text-red-500 dark:text-teal-400 font-medium  px-1">
            PsytechBF40
          </span>
          <span className="font-bold text-gray-800 dark:text-white dark:hover:text-teal-400 hover:text-teal-700 transition-colors duration-300 cursor-pointer ">
            {t("header.miniheader.shopNow")}
          </span>
        </div>
        <LanguageSwitcher />{" "}
      </div>
    </header>
  );
};

export default MiniHeader;
