import { FC, useEffect } from "react";
import darkLogo from "../../assets/Psytech.svg";
import { GoPerson } from "react-icons/go";
import { FiShoppingCart } from "react-icons/fi";
import { FiMoon } from "react-icons/fi";
import { IoSunnyOutline } from "react-icons/io5";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import DarkHeaderItem from "./DarkHeaderItem";
import { useTheme } from "../../hooks/useTheme";
import UserPic from "./UserDropdown";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../app/store";
import { fetchAllCategories } from "../../redux/categories/categorySlice";
import { logOut } from "../../redux/auth/authSlice";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Tooltip } from "react-tooltip";

interface HeaderProps {
  AuthDrawerToggle: () => void;
  NavDrawerToggle: () => void;
  SearchDrawerToggle: () => void;
  CartDrawerToggle: () => void;
}

const DarkHeader: FC<HeaderProps> = ({
  AuthDrawerToggle,
  NavDrawerToggle,
  SearchDrawerToggle,
  CartDrawerToggle,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );
  const { categories } = useSelector((state: RootState) => state.categories);


  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchAllCategories());
    }
  }, []);

  const getCategoryId = (categoryName: string) => {
    const category = categories.find((category) => category.name === categoryName);
    return category ? category.id : "";
  };

  return (
    <header className="w-full bg-zenithHeader dark:bg-gray-800">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-center py-4 relative md:border-b border-gray-700">
        <div className="flex items-center gap-2">
    <RiLogoutCircleLine

            data-tooltip-id="my-tooltip" data-tooltip-content="Log Out?"
              onClick={() => {
                dispatch(logOut());
              }}
              className="hidden md:block w-5 h-5 text-white cursor-pointer"
            />
            <h1 className="hidden md:block font-medium text-md text-white">
              {t("header.welcome")}
            </h1>
            <HiBars3CenterLeft
              onClick={NavDrawerToggle}
              className="md:hidden w-8 h-8 text-white cursor-pointer"
            />
             <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7 text-white cursor-pointer md:hidden ml-1"
              onClick={SearchDrawerToggle}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
          <Link to="/">
          <img
            className="object-contain w-32 md:w-40 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            src={darkLogo}
            alt="Site Logo"
          />
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden md:block">
              {theme === "dark" ? (
                <FiMoon
                  onClick={toggleTheme}
                  className="w-[1.55rem] h-[1.55rem] text-white cursor-pointer"
                />
              ) : (
                <IoSunnyOutline
                  onClick={toggleTheme}
                  className="w-6 h-6 text-white cursor-pointer"
                />
              )}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7 text-white cursor-pointer  hidden md:block"
              onClick={SearchDrawerToggle}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            {user ? (
              <UserPic />
            ) : (
              <GoPerson
                onClick={AuthDrawerToggle}
                className=" w-7 h-7  text-white cursor-pointer"
              />
            )}
            <FiShoppingCart
              onClick={CartDrawerToggle}
              className="block w-6 h-6 text-white cursor-pointer"
            />
          </div>
        </div>
        <div className="hidden md:block mx-auto w-fit py-4">
          <DarkHeaderItem
            toPath={`new-arrivals/${getCategoryId("Skin Care")}`}

            label={t("header.newarrivals")}
            badge={t("header.new")}
            badgeColor="bg-red-600"
          />
          <DarkHeaderItem
                      toPath={`best-sellers/${getCategoryId("Skin Care")}`}

            label={t("header.bestsellers")}
            badge={t("header.sale")}
            badgeColor="bg-cyan-500"
          />
          <DarkHeaderItem
           toPath={`skin-care/${getCategoryId("Skin Care")}`
          }
           label={t("header.skincare")} />
          <DarkHeaderItem
          toPath={`face-mask/${getCategoryId("Face Mask")}`
        }
          label={t("header.facemask")} />
          <DarkHeaderItem
          toPath={`texture-makeup/${getCategoryId("Texture & Makeup")}`
        }
          label={t("header.textureandmakeup")} />
          <DarkHeaderItem
          toPath={`contactus`}
           label={t("header.contactus")} />
        </div>
      </div>
      <Tooltip id="my-tooltip" />

    </header>
  );
};

export default DarkHeader;