import { FC, ReactNode } from "react";
import { ThemeProvider } from "../context/ThemeProvider";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <div className="w-full min-h-screen bg-white dark:bg-black">
        <div className="max-w-screen-2xl  mx-auto">{children}</div>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
