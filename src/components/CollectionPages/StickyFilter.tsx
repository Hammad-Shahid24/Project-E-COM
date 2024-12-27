import { FC, } from "react";
import StickySortDropdown from "./StickySortDropdown";
import StickyFilterDropdown from "./StickyFilterDropdown";

interface FilteringAndPagingProps {
  onSortChange: (key: string) => Promise<void>;
  onFilterChange: (tags: string[]) => Promise<void>;
  filters: string[];
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

const StickyFilter: FC<FilteringAndPagingProps> = ({
  onSortChange,
  // onFilterChange,
  filters,
  setFilters
}) => {


  
  

  return (
    <div className="flex justify-between mx-auto max-w-screen-2xl border border-gray-300 dark:bg-gray-800 dark:border-gray-600">
      <StickyFilterDropdown
      filters={filters}
      setFilters={setFilters}
        // onFilterChange={onFilterChange}
      />
    
      <StickySortDropdown
        onSortChange={onSortChange}
      />
    </div>
  );
};

export default StickyFilter;