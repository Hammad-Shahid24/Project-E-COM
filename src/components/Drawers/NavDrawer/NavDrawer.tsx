import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavDrawerContent from "./NavDrawerContent";

interface NavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  toggleAuthDrawer: () => void;
}

const NavDrawer: FC<NavDrawerProps> = ({
  isOpen,
  onClose,
  toggleAuthDrawer,
}) => {
  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{
              x: "-100%",
              transition: { type: "spring", stiffness: 300, damping: 30 },
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 w-[19rem] h-full bg-white dark:bg-gray-800 shadow-lg z-50"
          >
            <div className="relative h-full">
              <NavDrawerContent
                toggleAuthDrawer={toggleAuthDrawer}
                onClose={onClose}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavDrawer;
