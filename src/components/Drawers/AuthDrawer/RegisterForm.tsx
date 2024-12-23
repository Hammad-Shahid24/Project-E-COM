import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, signUp } from "../../../redux/auth/authSlice"; // Import signUp from the Redux slice
import { validateEmail, validatePassword } from "../../../utils/validations";
import { toast } from "react-toastify";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import { AppDispatch, RootState } from "../../../app/store";
import Loading from "../../../shared/Loading";

interface RegisterFormProps {
  gotoLogin: () => void;
  onClose: () => void;
}

const RegisterForm: FC<RegisterFormProps> = ({ gotoLogin, onClose }) => {
  const dispatch: AppDispatch = useDispatch(); // Use the Redux dispatch function
  const { loading, error: authError } = useSelector(
    (state: RootState) => state.auth
  ); // Get the loading state from the Redux store

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    if (authError && authError !== "") {
      toast.error(authError);
    }

    return () => {
      dispatch(clearError()); // Clear the error message when the component is unmounted
    };
  }, [authError]);

  const handleRegister = async () => {
    if (!validateEmail(email)) {
      toast.error("Invalid email address");
      return;
    }

    if (!validatePassword(password)) {
      toast.error(
        "Password must contain at least one number, one uppercase and lowercase letter, and at least 8 or more characters"
      );
      return;
    }

    const additionalData = { firstName, lastName };

    // Dispatch the signUp action from Redux
    await dispatch(signUp({ email, password, additionalData })).then(
      (result) => {
        if (signUp.fulfilled.match(result)) {
          // Handle success
          toast.success("Registration successful!");
          onClose(); // Close the drawer
        }
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex justify-between items-center w-full py-4 px-5 border-b border-gray-300 dark:border-gray-700">
        <h1 className="text-lg font-poppins text-teal-950 dark:text-teal-200">
          REGISTER
        </h1>
        <motion.svg
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.4 }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="h-7 w-7 cursor-pointer text-gray-600 dark:text-teal-300"
          onClick={onClose}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </motion.svg>
      </div>

      <div className="w-full flex flex-col px-5 py-1 dark:bg-gray-800 pb-1.5 pt-4">
        <label className="block text-base font-normal text-teal-900 dark:text-gray-300 pb-1.5">
          First Name
        </label>
        <motion.input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="mt-1 border border-gray-300 text-gray-500 dark:border-gray-700 dark:text-gray-100 rounded-sm p-2 w-full outline-none bg-white dark:bg-gray-700"
          whileFocus={{
            borderColor: "#374191",
          }}
          transition={{ duration: 0.3 }}
        />

        <label className="block text-base font-normal text-teal-900 dark:text-gray-300 pb-1.5 pt-4">
          Last Name
        </label>
        <motion.input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="mt-1 border border-gray-300 text-gray-500 dark:border-gray-700 dark:text-gray-100 rounded-sm p-2 w-full outline-none bg-white dark:bg-gray-700"
          whileFocus={{
            borderColor: "#374191",
          }}
          transition={{ duration: 0.3 }}
        />

        <label className="block text-base font-normal text-teal-900 dark:text-gray-300 pb-1.5 pt-4">
          Email
        </label>
        <motion.input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 border border-gray-300 text-gray-500 dark:border-gray-700 dark:text-gray-100 rounded-sm p-2 w-full outline-none bg-white dark:bg-gray-700"
          whileFocus={{
            borderColor: "#374191",
          }}
          transition={{ duration: 0.3 }}
        />

        <label className="block text-base font-normal text-teal-900 dark:text-gray-300 pb-1.5 pt-4">
          Password <span className="text-red-400 text-lg">*</span>
        </label>
        <div className="relative mb-4">
          <motion.input
            id="password"
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 border border-gray-300 text-gray-500 dark:border-gray-700 dark:text-gray-100 rounded-sm p-2 w-full outline-none bg-white dark:bg-gray-700"
            whileFocus={{
              borderColor: "#374191",
            }}
            transition={{ duration: 0.3 }}
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute right-3 top-4 text-teal-600 dark:text-teal-300"
          >
            {passwordVisible ? (
              <EyeIcon className="h-5 w-5" />
            ) : (
              <EyeSlashIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        <button
          onClick={handleRegister}
          className="bg-slate-700 rounded-3xl text-white font-semibold hover:bg-opacity-75 transition-colors duration-300 p-2 w-full mb-2 dark:bg-teal-600 dark:hover:bg-teal-700"
          disabled={loading} // Disable the button when loading
        >
          {loading ? <Loading className="text-white mx-auto" /> : "SIGN UP"}{" "}
        </button>

        <p className="text-teal-900 text-sm pt-3 dark:text-teal-200">
          Already have an account?{" "}
          <span
            onClick={gotoLogin}
            className="text-gray-900 cursor-pointer hover:text-teal-700 dark:text-gray-200 dark:hover:text-teal-400 transition-colors duration-300"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
