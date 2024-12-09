import { FC, ReactNode, useState, useEffect } from "react";
import { ThemeProvider } from "../context/ThemeProvider";
import AuthDrawer from "./Drawers/AuthDrawer/AuthDrawer";
import NavDrawer from "./Drawers/NavDrawer/NavDrawer";
import SearchDrawer from "./Drawers/SearchDrawer/SearchDrawer";
import CartDrawer from "./Drawers/CartDrawer/CartDrawer";
import MiniHeader from "./Header/MiniHeader";
import Header from "./Header/Header";
import DarkHeader from "./Header/DarkHeader";
import { motion } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [isAuthDrawerOpen, setAuthDrawerOpen] = useState(false);
  const [isNavDrawerOpen, setNavDrawerOpen] = useState(false);
  const [isSearchDrawerOpen, setSearchDrawerOpen] = useState(false);
  const [isCartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [isStickyHeaderVisible, setStickyHeaderVisible] = useState(false);

  const toggleAuthDrawer = () => {
    setAuthDrawerOpen((prev) => !prev);
  };

  const toggleNavDrawer = () => {
    setNavDrawerOpen((prev) => !prev);
  };

  const toggleSearchDrawer = () => {
    setSearchDrawerOpen((prev) => !prev);
  };

  const toggleCartDrawer = () => {
    setCartDrawerOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 400) {
        setStickyHeaderVisible(true);
      } else {
        setStickyHeaderVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="w-full min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-screen-2xl mx-auto">
          <MiniHeader />
          <Header
            NavDrawerToggle={toggleNavDrawer}
            AuthDrawerToggle={toggleAuthDrawer}
            SearchDrawerToggle={toggleSearchDrawer}
            CartDrawerToggle={toggleCartDrawer}
          />
          {children}
        </div>
        {isStickyHeaderVisible && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-50"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            transition={{ type: "tween", duration: 0.4 }}
          >
            <DarkHeader
              NavDrawerToggle={toggleNavDrawer}
              AuthDrawerToggle={toggleAuthDrawer}
              SearchDrawerToggle={toggleSearchDrawer}
              CartDrawerToggle={toggleCartDrawer}
            />
          </motion.div>
        )}
        <AuthDrawer isOpen={isAuthDrawerOpen} onClose={toggleAuthDrawer} />
        <NavDrawer
          toggleAuthDrawer={toggleAuthDrawer}
          toggleSearchDrawer={toggleSearchDrawer}
          isOpen={isNavDrawerOpen}
          onClose={toggleNavDrawer}
        />
        <SearchDrawer
          isOpen={isSearchDrawerOpen}
          onClose={toggleSearchDrawer}
        />
        <CartDrawer isOpen={isCartDrawerOpen} onClose={toggleCartDrawer} />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
