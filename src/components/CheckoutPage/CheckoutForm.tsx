import { FC, useState, useEffect } from "react";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import Loading from "../../shared/Loading";
import { toast } from "react-toastify";
import { createOrderThunk } from "../../redux/orders/orderSlice";
import { resetCart } from "../../redux/cart/cartSlice";
import { Order } from "../../types/Shopping";

const CheckoutForm: FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch<AppDispatch>();

  const { cart } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/create-payment-intent`,
        {
          amount: (cart?.total ?? 0) * 100, // Convert to smallest currency unit
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      const { client_secret } = response.data;

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        client_secret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: user?.name,
            },
          },
        }
      );

      setLoading(false);

      if (error) {
        console.error("Error confirming card payment:", error);
        toast.error("Payment failed. Please try again.");
        setError(error.message || "Payment failed. Please try again.");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        console.log("Payment was successful!");
        setSuccess(true);
        toast.success("Payment successful!");
        const order: Order = {
          userId: user?.id || "",
          orderItems: cart?.cartItems || [],
          total: cart?.total || 0,
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date()
        };
        dispatch(createOrderThunk(order)).then((resultAction) => {
          if (createOrderThunk.fulfilled.match(resultAction)) {
            dispatch(resetCart());
          }
        });
      }
    } catch (error) {
      console.error("Error creating payment intent:", error);
      toast.error("Error creating payment intent. Please try again.");
      setError("Error creating payment intent. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-4 border border-gray-300 rounded-md dark:border-gray-700" />
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Payment successful!</p>}
      <button
        type="submit"
        className="bg-teal-700 hover:bg-teal-600 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200"
        disabled={!stripe || loading}
      >
        {loading ? <Loading /> : "Pay Now"}
      </button>
    </form>
  );
};

export default CheckoutForm;