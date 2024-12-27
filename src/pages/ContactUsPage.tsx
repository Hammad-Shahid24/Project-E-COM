import { FC, useState } from "react";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../app/store";
// import { sendContactMessage } from "../redux/contact/contactSlice";
import Loading from "../shared/Loading";

const ContactUsPage: FC = () => {
  // const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // await dispatch(sendContactMessage({ name, email, message })).unwrap();
      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setError("An error occurred while sending your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-teal-100 to-gray-100 dark:from-teal-900 dark:via-gray-800 dark:to-teal-900 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto p-8 bg-white dark:bg-gray-900 rounded-lg my-12">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center mb-6">
          Get in Touch
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Your Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Write your message here..."
              rows={5}
              required
            />
          </div>
          {error && (
            <p className="text-sm text-red-600 text-center mt-2">{error}</p>
          )}
          {success && (
            <p className="text-sm text-green-600 text-center mt-2">
              Your message has been sent successfully!
            </p>
          )}
          <div>
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-teal-400"
              disabled={loading}
            >
              {loading ? <Loading /> : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUsPage;
