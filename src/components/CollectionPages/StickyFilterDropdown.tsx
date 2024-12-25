import React, { useState, useEffect, useRef } from "react";

interface StickyFilterDropdownProps {
  options: { key: string; label: string }[];
  onFilterChange: (key: string) => void;
}

const StickyFilterDropdown: React.FC<StickyFilterDropdownProps> = ({
  options,
  onFilterChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0].label);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleOptionClick = (option: { key: string; label: string }) => {
    setSelectedOption(option.label);
    onFilterChange(option.key);
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left z-50" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
        id="dropdown-menu-trigger"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="mr-2">{selectedOption}</span>
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="dropdown-menu-trigger"
        >
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.key}
                onClick={() => handleOptionClick(option)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
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

export default StickyFilterDropdown;