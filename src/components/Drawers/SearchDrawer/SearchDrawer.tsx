import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchDrawerContent from "./SearchDrawerContent";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchDrawer: FC<SearchDrawerProps> = ({ isOpen, onClose }) => {

  const { products, loading, error } = useSelector((state: RootState) => state.products);
  const { categories } = useSelector((state: RootState) => state.categories);

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
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{
              x: "100%",
              transition: { type: "spring", stiffness: 300, damping: 30 },
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-80 h-full bg-white dark:bg-gray-800 shadow-lg z-50"
          >
            <div className="relative h-full">
              <SearchDrawerContent products={products} loading={loading} error={error} onClose={onClose} categories={categories} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchDrawer;
