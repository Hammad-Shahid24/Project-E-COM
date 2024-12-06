import { FC } from "react";
import logo from "../../assets/logo.png";
import darkLogo from "../../assets/Psytech.svg";
import { GoPerson } from "react-icons/go";
import { FiShoppingCart } from "react-icons/fi";
import { FiMoon } from "react-icons/fi";
import { IoSunnyOutline } from "react-icons/io5";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { useTranslation } from "react-i18next";

import { useTheme } from "../../hooks/useTheme";

interface HeaderProps {
  AuthDrawerToggle: () => void;
  NavDrawerToggle: () => void;
}

const Header: FC<HeaderProps> = ({ AuthDrawerToggle, NavDrawerToggle }) => {
  const { t } = useTranslation();

  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full bg-white dark:bg-gray-800 ">
      <div className="max-w-screen-xl mx-auto px-4 ">
        <div className="flex justify-between items-center py-4 relative md:border-b border-gray-300">
          <div>
            <h1 className="hidden md:block font-medium text-sm text-black dark:text-white">
              {t("header.welcome")}
            </h1>
            <HiBars3CenterLeft
              onClick={NavDrawerToggle}
              className="md:hidden w-8 h-8 text-gray-900 dark:text-white cursor-pointer"
            />
          </div>
          <img
            className="object-contain w-32 md:w-40 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            src={theme === "dark" ? darkLogo : logo}
            alt="Site Logo"
          />

          <div className="flex items-center gap-2">
            <span className="block md:block">
              {theme === "dark" ? (
                <IoSunnyOutline
                  onClick={toggleTheme}
                  className="w-6 h-6 text-gray-900 dark:text-white cursor-pointer"
                />
              ) : (
                <FiMoon
                  onClick={toggleTheme}
                  className="w-6 h-6 text-gray-900 dark:text-white cursor-pointer"
                />
              )}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7 text-gray-900 dark:text-teal-500 cursor-pointer hidden"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <GoPerson
              onClick={AuthDrawerToggle}
              className=" w-7 h-7  text-gray-900 dark:text-white cursor-pointer"
            />
            <FiShoppingCart className="hidden md:block w-6 h-6  text-gray-800 dark:text-white cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
