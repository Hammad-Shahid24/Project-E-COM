import React, { useState, useEffect, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useTranslation } from "react-i18next";

interface SortOption {
  key: string;
  label: string;
}

interface StickySortDropdownProps {
  sortOptions: SortOption[];
  onSortChange: (key: string) => void;
}

const StickySortDropdown: React.FC<StickySortDropdownProps> = ({
  sortOptions,
  onSortChange,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(sortOptions[0].label);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option: SortOption) => {
    setSelectedOption(option.label);
    onSortChange(option.key);
    setIsOpen(false);
  };

  return (
    <div className="relative flex items-center border-l border-gray-300 dark:border-gray-600" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={t("collectionspage.stickyfilter.sortby")}
      >
        <span className="text-xs tracking-wide">
          
          {t("collectionspage.stickyfilter.sortby")}: {selectedOption}
        </span>
        <ChevronDownIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-40 z-50 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 dark:ring-gray-700"
          role="menu"
        >
          <div className="py-1">
            {sortOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => handleOptionClick(option)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                role="menuitem"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StickySortDropdown;
