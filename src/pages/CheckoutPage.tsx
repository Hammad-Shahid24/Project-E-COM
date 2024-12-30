import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { AppDispatch, RootState } from "../app/store";
import { fetchCart } from "../redux/cart/cartSlice";
import CheckoutForm from "../components/CheckoutPage/CheckoutForm";
import CartItem from "../components/Drawers/CartDrawer/cartItem";
import Loading from "../shared/Loading";

// Load your Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cart, loading, error } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchCart(user.id));
    }
  }, [dispatch, user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-gray-100 dark:bg-gray-800">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-gray-100 dark:bg-gray-800">
        <p className="text-red-500 text-lg font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
        Checkout
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cart Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex flex-col">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b pb-3">
            Your Cart
          </h2>
          <div className="flex-1 overflow-y-auto max-h-96 space-y-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-700">
            {cart?.cartItems?.length > 0 ? (
              cart.cartItems.map((item) => (
                <CartItem key={item.product.id} cart={cart} />
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Your cart is empty.</p>
            )}
          </div>
          <div className="mt-4 pt-4 border-t">
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
              Total:{" "}
              <span className="text-teal-600 dark:text-teal-300">
                ${cart?.total.toFixed(2)}
              </span>
            </p>
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b pb-3">
            Payment
          </h2>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
