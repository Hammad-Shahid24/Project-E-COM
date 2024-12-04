import { FC, ReactNode, useState } from "react";
import { ThemeProvider } from "../context/ThemeProvider";
import AuthDrawer from "./AuthDrawer";
import { AnimatePresence } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [isAuthDrawerOpen, setAuthDrawerOpen] = useState(false);

  const toggleAuthDrawer = () => {
    setAuthDrawerOpen((prev) => !prev);
  };

  return (
    <ThemeProvider>
      <div className="w-full min-h-screen bg-white dark:bg-black">
        <div className="max-w-screen-2xl mx-auto">
          <button
            className="p-2 bg-blue-500 text-white rounded"
            onClick={toggleAuthDrawer}
          >
            Toggle Auth Drawer
          </button>
          {children}
        </div>
        <AuthDrawer isOpen={isAuthDrawerOpen} onClose={toggleAuthDrawer} />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
