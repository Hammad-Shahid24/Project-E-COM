import { FC, ReactNode, useState } from "react";
import { ThemeProvider } from "../context/ThemeProvider";
import AuthDrawer from "./Drawers/AuthDrawer/AuthDrawer";
import NavDrawer from "./Drawers/NavDrawer/NavDrawer";
import SearchDrawer from "./Drawers/SearchDrawer/SearchDrawer";
import CartDrawer from "./Drawers/CartDrawer/CartDrawer";
import MiniHeader from "./Header/MiniHeader";
import Header from "./Header/Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [isAuthDrawerOpen, setAuthDrawerOpen] = useState(false);
  const [isNavDrawerOpen, setNavDrawerOpen] = useState(false);
  const [isSearchDrawerOpen, setSearchDrawerOpen] = useState(false);
  const [isCartDrawerOpen, setCartDrawerOpen] = useState(true);

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
