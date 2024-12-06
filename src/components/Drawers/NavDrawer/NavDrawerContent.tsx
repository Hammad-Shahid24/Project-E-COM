import { FC } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { GoPerson } from "react-icons/go";
import NavItem from "./NavItem";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useTheme } from "../../../hooks/useTheme";
import { FiMoon } from "react-icons/fi";
import { IoSunnyOutline } from "react-icons/io5";

interface NavDrawerContentProps {
  onClose: () => void;
  toggleAuthDrawer: () => void;
}

const NavDrawerContent: FC<NavDrawerContentProps> = ({
  onClose,
  toggleAuthDrawer,
}) => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col  items-center justify-center">
      {/* Menu Text and Close Button */}
      <div className="flex justify-center bg-[#e9e9e9] dark:bg-gray-800 items-center w-full py-5 px-5 border-b-2 border-teal-700 dark:border-gray-700 relative">
        <h1 className="text-xs  font-medium font-poppins text-black dark:text-teal-200">
          {t("drawers.navdrawer.menu")}
        </h1>
        <motion.svg
          initial={{ opacity: 0 }} // Initial state: completely transparent
          animate={{ opacity: 1 }} // Animate to fully visible
          exit={{ opacity: 0 }} // Transition back to transparent when closing
          transition={{ duration: 0.4 }} // Smooth transition duration
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="h-10 w-10 cursor-pointer text-white dark:text-teal-300 bg-black dark:bg-gray-950 absolute -right-10 top-0"
          onClick={onClose}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </motion.svg>
      </div>

      <div className="flex flex-col w-full">
        <NavItem
          label={t("drawers.navdrawer.collections")}
          expandable
          subNavItems={[
            { label: t("drawers.navdrawer.bestsellers") },
            { label: t("drawers.navdrawer.newarrivals") },
            { label: t("drawers.navdrawer.beauty") },
            { label: t("drawers.navdrawer.haircare") },
          ]}
        />
        <NavItem
          label={t("drawers.navdrawer.skincare")}
          saleBadge={t("drawers.navdrawer.sale")}
        />
        <NavItem
          label={t("drawers.navdrawer.quicklinks")}
          expandable
          subNavItems={[
            { label: t("drawers.navdrawer.contactus") },
            { label: t("drawers.navdrawer.aboutus") },
            { label: t("drawers.navdrawer.faqs") },
          ]}
        />
        <NavItem
          icon={
            <HiMagnifyingGlass className="w-5 h-5 text-gray-900 dark:text-white" />
          }
          label={t("drawers.navdrawer.search")}
        />
        <NavItem
          icon={<GoPerson className="w-5 h-5 text-gray-900 dark:text-white" />}
          label={`${t("drawers.navdrawer.login")} / ${t(
            "drawers.navdrawer.register"
          )}`}
          onClick={() => {
            onClose();
            toggleAuthDrawer();
          }}
        />
        <NavItem
          icon={
            theme === "dark" ? (
              <IoSunnyOutline
                onClick={toggleTheme}
                className="w-5 h-5 text-gray-900 dark:text-white cursor-pointer"
              />
            ) : (
              <FiMoon
                onClick={toggleTheme}
                className="w-5 h-5 text-gray-900 dark:text-white cursor-pointer"
              />
            )
          }
          label={theme === "dark" ? t("theme.light") : t("theme.dark")}
          onClick={toggleTheme}
        />
      </div>
    </div>
  );
};

export default NavDrawerContent;
