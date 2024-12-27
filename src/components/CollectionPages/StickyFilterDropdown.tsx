import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IoFunnelOutline } from "react-icons/io5";

const filterOptions = [
  { key: "Serums", label: "Serums" },
  { key: "Foundations", label: "Foundations" },
  { key: "Cleansers", label: "Cleansers" },
  { key: "Moisturizers", label: "Moisturizers" },
  { key: "Face Care", label: "Face Care" },
]

interface StickyFilterDropdownProps {
  // onFilterChange: (keys: string[]) => void;
  filters: string[];
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

const StickyFilterDropdownProps: React.FC<StickyFilterDropdownProps> = ({
  // onFilterChange,
  filters,
  setFilters
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleCheckboxChange = (key: string) => {
    setFilters((prevSelected: string[]) =>
      prevSelected.includes(key)
        ? prevSelected.filter((option) => option !== key)
        : [...prevSelected, key]
    );
  };

  

  return (
    <div
      className="relative flex items-center border-l border-gray-300 dark:border-gray-600"
      ref={dropdownRef}
    >
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={t("collectionspage.stickyfilter.sortby")}
      >
        <IoFunnelOutline className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        <span className="text-xs tracking-wide">
          {t("collectionspage.stickyfilter.filters")}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute left-0 -top-5 mt-2 z-50 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 dark:ring-gray-700"
          role="menu"
        >
          <div className="py-2">
            {filterOptions.map((option) => (
              <label
                key={option.key}
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="form-checkbox mr-2 text-indigo-600"
                  checked={filters.includes(option.key)}
                  onChange={() => handleCheckboxChange(option.key)}
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StickyFilterDropdownProps;
