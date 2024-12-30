import { FC, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavDrawerContent from "./NavDrawerContent";
// import { getCategoryId } from "../../../utils/getCategoryIdByName";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { fetchAllCategories } from "../../../redux/categories/categorySlice";
import { logOut } from "../../../redux/auth/authSlice";


interface NavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  toggleAuthDrawer: () => void;
  toggleSearchDrawer: () => void;
}

const NavDrawer: FC<NavDrawerProps> = ({
  isOpen,
  onClose,
  toggleAuthDrawer,
  toggleSearchDrawer,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.categories);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchAllCategories());
    }
  })

  const handleLogOut = async (): Promise<void> => {
    await dispatch(logOut()).then((result) => {
      if (logOut.fulfilled.match(result)) {
        window.location.reload();
      } else if (logOut.rejected.match(result)) {
        console.error("Error logging out: ", result.payload);
      }
    });
    onClose();
  };

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
                toggleSearchDrawer={toggleSearchDrawer}
                onClose={onClose}
                categories={categories}
                user={user}
                handleLogOut={handleLogOut}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavDrawer;
