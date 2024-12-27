import { FC, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CartDrawerContent from "./CartDrawerContent";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../app/store";
import { fetchCart } from "../../../redux/cart/cartSlice";

interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: FC<SearchDrawerProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const {cart, error} = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (user) {
      if (cart === null) {
        dispatch(fetchCart(user.id)).then((result) => {
          if (fetchCart.fulfilled.match(result)) {
          } else if (fetchCart.rejected.match(result)) {
            console.log("Error fetching cart: ", result.payload);
          }
        });
      }
    }
  }, [user]);

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
              <CartDrawerContent cart={cart!} loading error={error} onClose={onClose} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartDrawer;
