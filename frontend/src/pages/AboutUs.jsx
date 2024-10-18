import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-8 pb-20"
    >
      <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>

      <p className="text-lg mb-4 text-justify">
        <strong>Cactus</strong> is an educational project and a virtual clothing
        website created for learning and experimentation. Please note that{" "}
        <strong>Cactus</strong> is not an actual e-commerce store, and
        everything on this website, including the payment process, operates
        entirely in test mode for educational purposes only.
      </p>

      <p className="text-lg mb-6 text-justify">
        Join us on this simulated journey at <strong>Cactus</strong>, and
        explore a diverse collection of clothing, ranging from casual outfits to
        formal attire and athletic wear, all while learning and experimenting
        with technology.
      </p>

      <p className="text-lg font-semibold mb-6 text-justify">
        Thank you for being a part of our educational experience!
      </p>

      <div className="flex flex-col lg:flex-row justify-between mt-8 space-y-8 lg:space-y-0 lg:space-x-8">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4 text-justify">
            Frontend Tech
          </h2>
          <ul className="list-disc list-inside space-y-2 text-lg text-justify">
            <li>React</li>
            <li>Vite</li>
            <li>Tailwind</li>
            <li>Framer-Motion</li>
            <li>Axios</li>
          </ul>
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4 text-justify">
            Backend Tech
          </h2>
          <ul className="list-disc list-inside space-y-2 text-lg text-justify">
            <li>Express</li>
            <li>Node.js</li>
            <li>Redis</li>
            <li>Mongoose</li>
            <li>Sripe</li>
            <li>bcryptjs</li>
          </ul>
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4 text-justify">Hosting</h2>
          <ul className="list-disc list-inside space-y-2 text-lg text-justify">
            <li>Render</li>
          </ul>
        </div>
      </div>

      <p className="text-lg font-semibold text-justify mt-8">
        Join us on this simulated journey at <strong>Cactus</strong>, where we
        explore the fascinating blend of style and technology, all for
        educational purposes only.
      </p>

      <p className="text-lg font-semibold text-justify mt-8 mb-20">
        Thank you for being a part of our educational experience!
      </p>
    </motion.div>
  );
};

export default AboutUs;
