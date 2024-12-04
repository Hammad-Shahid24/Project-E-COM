import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import RecoverPasswordForm from "./RecoverPasswordForm";

interface AuthDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthDrawer: FC<AuthDrawerProps> = ({ isOpen, onClose }) => {
  const [currentForm, setCurrentForm] = useState<
    "login" | "register" | "recover"
  >("login");

  const renderForm = (form: "login" | "register" | "recover") => {
    switch (form) {
      case "login":
        return (
          <LoginForm
            gotoRegister={() => setCurrentForm("register")}
            gotoRecoverPassword={() => setCurrentForm("recover")}
            onClose={onClose}
          />
        );
      case "register":
        return (
          <RegisterForm
            onClose={onClose}
            gotoLogin={() => setCurrentForm("login")}
          />
        );
      case "recover":
        return (
          <RecoverPasswordForm
            onClose={onClose}
            gotoLogin={() => setCurrentForm("login")}
          />
        );
      default:
        return null;
    }
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
              <AnimatePresence mode="sync">
                <motion.div
                  key={currentForm} // Ensure each form gets its unique key
                  initial={{ x: "100%" }} // Start off-screen to the right
                  animate={{ x: 0 }} // Slide into view
                  exit={{
                    x: "100%",
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    },
                  }} // Slide out to the left
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute top-0 left-0 w-full h-full"
                >
                  {renderForm(currentForm)}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AuthDrawer;
