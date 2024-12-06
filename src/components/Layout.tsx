import { FC, ReactNode, useState } from "react";
import { ThemeProvider } from "../context/ThemeProvider";
import AuthDrawer from "./Drawers/AuthDrawer/AuthDrawer";
import NavDrawer from "./Drawers/NavDrawer/NavDrawer";
import { AnimatePresence } from "framer-motion";
import MiniHeader from "./Header/MiniHeader";
import Header from "./Header/Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [isAuthDrawerOpen, setAuthDrawerOpen] = useState(false);
  const [isNavDrawerOpen, setNavDrawerOpen] = useState(true);

  const toggleAuthDrawer = () => {
    setAuthDrawerOpen((prev) => !prev);
  };

  const toggleNavDrawer = () => {
    setNavDrawerOpen((prev) => !prev);
  };

  return (
    <ThemeProvider>
      <div className="w-full min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-screen-2xl mx-auto">
          <MiniHeader />
          <Header
            NavDrawerToggle={toggleNavDrawer}
            AuthDrawerToggle={toggleAuthDrawer}
          />
          {children}
        </div>
        <AuthDrawer isOpen={isAuthDrawerOpen} onClose={toggleAuthDrawer} />
        <NavDrawer isOpen={isNavDrawerOpen} onClose={toggleNavDrawer} />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
