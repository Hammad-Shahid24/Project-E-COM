import { FC } from "react";

const TermsOfServicePage: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-teal-100 to-gray-50 dark:from-teal-800 dark:via-gray-900  dark:to-teal-800 flex items-center justify-center px-4 font-poppins">
      <div className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-lg overflow-hidden my-12">
        <div className="bg-teal-500 dark:bg-teal-700 text-white py-8 px-6">
          <h1 className="text-3xl font-bold text-center">Terms of Service</h1>
        </div>
        <div className="px-8 py-10 text-gray-700 dark:text-gray-300 space-y-8">
          <p className="text-lg leading-relaxed">
            Welcome to our e-commerce platform. By accessing or using our website, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree with any part of these terms, you must not use our services.
          </p>
          <div className="space-y-6">
            {[
              {
                title: "1. Use of Our Services",
                content:
                  "You agree to use our services only for lawful purposes and in accordance with these Terms of Service. You must not use our services in any way that could damage, disable, overburden, or impair our website or interfere with any other party's use of our services.",
              },
              {
                title: "2. Account Registration",
                content:
                  "To access certain features of our website, you may be required to register for an account. You agree to provide accurate and complete information when creating your account and to keep this information up to date. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
              },
              {
                title: "3. Product Descriptions",
                content:
                  "We strive to provide accurate and up-to-date information about our products. However, we do not warrant that product descriptions or other content on our website are accurate, complete, reliable, current, or error-free. If a product offered by us is not as described, your sole remedy is to return it in unused condition.",
              },
              {
                title: "4. Pricing and Payment",
                content:
                  "All prices are subject to change without notice. We reserve the right to modify or discontinue products at any time. We accept various forms of payment, and you agree to pay all charges incurred by you or any users of your account and credit card or other payment method at the prices in effect when such charges are incurred.",
              },
              {
                title: "5. Limitation of Liability",
                content:
                  "To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.",
              },
              {
                title: "6. Changes to These Terms",
                content:
                  "We reserve the right to modify these Terms of Service at any time. We will notify you of any changes by posting the new terms on our website. You are advised to review these terms periodically for any changes.",
              },
              {
                title: "7. Contact Us",
                content:
                  "If you have any questions about these Terms of Service, please contact us at support@example.com.",
              },
            ].map(({ title, content }) => (
              <div key={title}>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {title}
                </h2>
                <p className="text-lg leading-relaxed">{content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
