import { FC, useState,  } from "react";
// import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { validateEmail,  } from "../../../utils/validations";
// import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/20/solid";
// import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { recoverPassword } from "../../../redux/auth/authSlice";
import Loading from "../../../shared/MiniLoading";

interface RecoverPasswordFormProps {
  gotoLogin: () => void;
  onClose: () => void;
}

const RecoverPasswordForm: FC<RecoverPasswordFormProps> = ({
  gotoLogin,
  onClose,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { loading } = useSelector(
    (state: RootState) => state.auth
  );
  // const navigate = useNavigate();

  const [email, setEmail] = useState("");
  // const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = () => {
    if (!validateEmail(email)) {
      toast.error("Invalid email address", { autoClose: 500 });
      return;
    }

    dispatch(recoverPassword(email)).then((result) => {
      if (recoverPassword.fulfilled.match(result)) {
        toast.success("Password reset email sent successfully", {
          autoClose: 5000,
        });
      } else if (recoverPassword.rejected.match(result)) {
        toast.error(result.payload as string, { autoClose: 5000 });
      }
    });
  };

  return (
    <div className=" flex flex-col gap-7 items-center justify-center">
      {/* the below div contains the login text and the cross button */}
      <div className="flex justify-between items-center w-full py-4 px-5 border-b border-gray-300 dark:border-gray-700">
        <h1 className="text-base font-poppins text-teal-950 dark:text-teal-200">
          RECOVER PASSWORD
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

      {/* the below div contains the login form */}
      <div className="w-full flex flex-col px-5 py-1 dark:bg-gray-800">
        <label className="block text-base font-normal text-teal-900 dark:text-gray-300 pb-1.5">
          Email address
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

        <button
          onClick={handleSubmit}
          className="bg-slateteal mt-4 rounded-3xl text-white font-semibold hover:bg-opacity-75 transition-colors duration-300 p-2 w-full mb-2 dark:bg-teal-600 dark:hover:bg-teal-700"
        >
          {loading ? (
            <Loading />
          ) : (
            "RESET PASSWORD"
          )}{" "}
        </button>

        <p className="text-teal-900 text-sm mt-3 dark:text-teal-200">
          Remembered your password?{" "}
          <span
            onClick={gotoLogin}
            className="text-gray-900 cursor-pointer hover:text-teal-600 dark:text-gray-200 dark:hover:text-teal-400 transition-colors duration-300"
          >
            Back to login
          </span>
        </p>
      </div>
    </div>
  );
};

export default RecoverPasswordForm;
