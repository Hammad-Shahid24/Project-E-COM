import { FC, useState } from "react";
import ProfileView from "./ProfileView";
import EditProfile from "./EditProfile";
import Orders from "./Orders";
import Cart from "./Cart";
import { motion, AnimatePresence } from "framer-motion";

const tabData = [
  { id: "profile", label: "Profile" },
  { id: "edit-profile", label: "Edit Profile" },
  { id: "orders", label: "Orders" },
  { id: "cart", label: "Cart" },
];

const TabsLayout: FC = () => {
  const [activeTab, setActiveTab] = useState<string>("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileView />;
      case "edit-profile":
        return <EditProfile />;
      case "orders":
        return <Orders />;
      case "cart":
        return <Cart />;
      default:
        return <ProfileView />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-teal-100 to-gray-100 dark:from-teal-900 dark:via-gray-800 dark:to-teal-900 px-6 py-12">
      <div className="w-full max-w-5xl mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-lg overflow-hidden font-poppins">
        {/* Tab Headers */}
        <div className="flex justify-around border-b border-gray-200 dark:border-gray-800 bg-teal-700 text-white">
          {tabData.map((tab) => (
            <button
              key={tab.id}
              className={`relative px-6 py-3 text-md font-medium ${
                activeTab === tab.id ? "bg-teal-800" : "hover:bg-teal-600"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-teal-600 rounded-md"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="p-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TabsLayout;
