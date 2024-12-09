import { FC } from "react";

interface HeaderItemProps {
  label: string;
  badge?: string;
  badgeColor?: string;
}

const DarkHeaderItem: FC<HeaderItemProps> = ({
  label,
  badge = null,
  badgeColor = null,
}) => {
  return (
    <a className="text-sm font-poppins text-white dark:text-gray-800 hover:text-teal-400 dark:hover:text-teal-600 transition-colors duration-300 px-3 cursor-pointer">
      {label}
      {badge && (
        <span
          className={`inline-block rounded-full ${badgeColor} px-1.5 text-[0.6rem] text-white transform -translate-y-3`}
        >
          {badge}
        </span>
      )}
    </a>
  );
};

export default DarkHeaderItem;
