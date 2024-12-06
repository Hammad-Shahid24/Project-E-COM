import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { validateEmail, validatePassword } from "../../../utils/validations";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/20/solid";
// import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface LoginFormProps {
  gotoRegister: () => void;
  gotoRecoverPassword: () => void;
  onClose: () => void;
}

const LoginForm: FC<LoginFormProps> = ({
  gotoRegister,
  gotoRecoverPassword,
  onClose,
}) => {
  // const dispatch: AppDispatch = useDispatch();
  // const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = () => {
    console.log("login");
    if (!validateEmail(email)) {
      toast.error("Invalid email address", { autoClose: 500 });
      return;
    }

    if (!validatePassword(password)) {
      toast.error(
        "Password must contain at least one number, one uppercase and lowercase letter, and at least 8 or more characters",
        { autoClose: 500 }
      );
      return;
    }

    const user = {
      email,
      password,
    };

    // try {
    //   dispatch(login(user)).then((result) => {
    //     console.log(result);
    //     if (login.fulfilled.match(result)) {
    //       navigate("/map");
    //     } else if (login.rejected.match(result)) {
    //       toast.error(result.payload as string, { autoClose: 500 });
    //     }
    //   });
    // } catch (error) {
    //   console.log(error);
    //   toast.error((error as Error).message, { autoClose: 500 });
    // }
  };

  return (
    <div className=" flex flex-col gap-7 items-center justify-center">
      {/* the below div contains the login text and the cross button */}
      <div className="flex justify-between items-center w-full py-4 px-5 border-b border-gray-300 dark:border-gray-700">
        <h1 className="text-lg font-poppins text-teal-950 dark:text-teal-200">
          LOGIN
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
          Email <span className="text-red-400 text-lg">*</span>
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
          onClick={handleLogin}
          className="bg-slate-700 rounded-3xl text-white font-semibold hover:bg-opacity-75 transition-colors duration-300 p-2 w-full mb-2 dark:bg-teal-600 dark:hover:bg-teal-700"
        >
          SIGN IN
        </button>
        <p className="text-teal-900 text-sm pt-3 dark:text-teal-200">
          New customer?{" "}
          <span
            onClick={gotoRegister}
            className="text-gray-900 cursor-pointer hover:text-teal-700 dark:text-gray-200 dark:hover:text-teal-400 transition-colors duration-300"
          >
            Create your account
          </span>
        </p>
        <p className="text-teal-900 text-sm mt-3 dark:text-teal-200">
          Lost password?{" "}
          <span
            onClick={gotoRecoverPassword}
            className="text-gray-900 cursor-pointer hover:text-teal-600 dark:text-gray-200 dark:hover:text-teal-400 transition-colors duration-300"
          >
            Recover password
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
