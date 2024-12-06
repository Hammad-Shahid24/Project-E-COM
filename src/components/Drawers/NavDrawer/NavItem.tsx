import { FC, ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { PlusIcon, MinusIcon } from "@heroicons/react/20/solid";

interface SubNavItem {
  label: string; // The label for the sub-navigation item
  onClick?: () => void; // Optional click handler for the sub-navigation item
}

interface NavItemProps {
  icon?: ReactNode; // Accepts any icon component
  label: string; // The label for the navigation item
  saleBadge?: string; // Optional sale badge text
  expandable?: boolean; // Indicates if the item is expandable
  subNavItems?: SubNavItem[]; // Optional sub-navigation items with click handlers
  onClick?: () => void; // Optional click handler for the main navigation item
}

const NavItem: FC<NavItemProps> = ({
  icon,
  label,
  saleBadge,
  expandable,
  subNavItems,
  onClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMainClick = () => {
    if (onClick) onClick(); // Call the provided onClick handler
    if (expandable) setIsExpanded(!isExpanded); // Toggle expansion
  };

  return (
    <div className="flex flex-col w-full">
      {/* Main Nav Item */}
      <div
        className={`flex justify-between items-center pb-3 pt-4 border-b border-gray-300 w-full px-5 cursor-pointer transition-all ${
          isExpanded
            ? "bg-gray-200 dark:bg-gray-700 text-black dark:text-teal-300"
            : "hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
        onClick={handleMainClick}
      >
        <div className="flex items-center">
          {/* Icon */}
          {icon && <span className="pr-2 pb-1">{icon}</span>}

          {/* Label */}
          <h1
            className={`text-sm font-light font-poppins ${
              isExpanded
                ? "font-medium text-black dark:text-teal-300"
                : "text-black dark:text-white"
            }`}
          >
            {label}
          </h1>

          {/* Sale Badge */}
          {saleBadge && (
            <span className="bg-cyan-500 rounded-full font-poppins text-[0.65rem] px-2 mb-0.5 mt-0.5 md:pt-0.5 text-white ml-2">
              {saleBadge}
            </span>
          )}
        </div>

        {/* Expandable Icon */}
        {expandable && (
          <motion.div
            className="pl-2"
            animate={{ rotate: isExpanded ? 180 : 0 }} // Spins in place
            transition={{ duration: 0.3 }}
          >
            {isExpanded ? (
              <MinusIcon className="w-5 h-5 text-gray-500 dark:text-white" />
            ) : (
              <PlusIcon className="w-5 h-5 text-gray-500 dark:text-white" />
            )}
          </motion.div>
        )}
      </div>

      {/* Sub-Navigation Items */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={
          isExpanded
            ? { height: "auto", opacity: 1 }
            : { height: 0, opacity: 0 }
        }
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        {subNavItems?.map((subNav, index) => (
          <div
            key={index}
            className="flex items-center py-3 border-b w-full border-gray-200 dark:border-gray-600 pl-12 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={subNav.onClick}
          >
            <h1 className="text-sm font-light font-poppins text-gray-500 dark:text-white">
              {subNav.label}
            </h1>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default NavItem;
