import { FC, ReactNode, useState } from "react";
import { ThemeProvider } from "../context/ThemeProvider";
import AuthDrawer from "./AuthDrawer";
import { AnimatePresence } from "framer-motion";
import MiniHeader from "./MiniHeader";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [isAuthDrawerOpen, setAuthDrawerOpen] = useState(true);

  const toggleAuthDrawer = () => {
    setAuthDrawerOpen((prev) => !prev);
  };

  return (
    <ThemeProvider>
      <div className="w-full min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-screen-2xl mx-auto">
          <MiniHeader />
          <Header drawerToggle={toggleAuthDrawer} />
          {children}
        </div>
        <AuthDrawer isOpen={isAuthDrawerOpen} onClose={toggleAuthDrawer} />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
