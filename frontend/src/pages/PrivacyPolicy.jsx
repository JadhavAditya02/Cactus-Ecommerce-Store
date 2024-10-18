import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-8"
    >
      <h1 className="text-4xl font-bold text-center mb-6">Privacy Policy</h1>

      <p className="text-lg mb-4">
        At <strong>Cactus</strong>, we prioritize your privacy and security during your visit to our educational website. Please be aware that <strong>Cactus</strong> is not an actual e-commerce store, and everything on this website, including the payment process, is purely in test mode for educational purposes only.
      </p>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Test Mode</h2>
        <p className="text-lg mb-6">
          <strong>Cactus</strong> is an educational project and a virtual clothing website created for learning and experimentation. Please be aware that everything on this website, including the payment process, is purely in test mode and does not involve real transactions or deliveries. We do not collect any personal or payment information, and any data you enter during your visit is for demonstration and testing purposes only.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
        <p className="text-lg mb-6">
          <strong>Cactus</strong> may use cookies to enhance your browsing experience and for analytics purposes. These cookies are not used to identify you personally and are only used to improve the functionality of the website.
        </p>
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
        <p className="text-lg mb-6">
          <strong>Cactus</strong> is not intended for children under the age of 13. We do not knowingly collect personal information from children. If you believe that we may have inadvertently collected information from a child, please contact us, and we will promptly remove the data.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Changes to Policy</h2>
        <p className="text-lg mb-6">
          <strong>Cactus</strong>'s privacy policy is subject to change without prior notice. Any updates will be reflected on this page.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-lg mb-6">
          If you have any questions or concerns about our privacy policy or the educational nature of <strong>Cactus</strong>, please feel free to contact us. Thank you for being a part of our educational experience!
        </p>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;
