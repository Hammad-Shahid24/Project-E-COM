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
    <a className="text-sm font-poppins text-white hover:text-teal-400  transition-colors duration-300 px-3 cursor-pointer">
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
