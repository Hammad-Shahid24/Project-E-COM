import { FC } from "react";
import { motion } from "framer-motion";

const MiniLoading: FC = () => {
  return (
    <motion.div
      className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin mx-auto"
      style={{ borderTopColor: "#9ca3af" }}
    ></motion.div>
  );
};

export default MiniLoading;