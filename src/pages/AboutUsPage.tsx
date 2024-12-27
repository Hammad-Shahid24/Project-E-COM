import { FC } from "react";
import {Link} from "react-router-dom"

const AboutUsPage: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-teal-100 to-gray-50 dark:from-teal-900 dark:via-gray-900 dark:to-teal-900 flex items-center justify-center px-4 font-poppins">
      <div className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-xl overflow-hidden my-12">
        <div className="bg-teal-500 text-white py-6 px-8">
          <h1 className="text-3xl font-bold text-center">About Us</h1>
        </div>
        <div className="px-8 py-10">
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
            Welcome to our e-commerce platform! Our mission is to provide a seamless online shopping experience by offering a curated selection of high-quality products at competitive prices, combined with outstanding customer service.
          </p>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
            Our team works tirelessly to bring you a diverse range of products, whether you’re searching for the latest fashion, cutting-edge electronics, or everyday essentials. We strive to meet your unique needs and preferences.
          </p>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
            Leveraging the power of technology, we’ve designed a user-friendly website and mobile app that make browsing, searching, and purchasing effortless—all from the comfort of your home.
          </p>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
            Thank you for choosing our platform. We are continuously evolving and innovating to exceed your expectations. Your feedback and questions are always welcome.
          </p>
          <div className="flex justify-center mt-10">
            <Link
              to="/contactus"
              className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-8 rounded-lg shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
