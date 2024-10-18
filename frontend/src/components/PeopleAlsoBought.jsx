import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import { motion } from "framer-motion"; // Added Framer Motion for animations

const PeopleAlsoBought = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const { data } = await axios.get("/products/recommendations");
        setRecommendations(data);
      } catch (error) {
        toast.error(
          error.response?.data.message || "An error occurred while fetching recommendations"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  // Handle screen resize to adjust items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else if (window.innerWidth < 1280) setItemsPerPage(3);
      else setItemsPerPage(4);
    };

    handleResize(); // Initial call to set items per page
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-emerald-400 mb-8">
          People Also Bought
        </h2>

        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }} // Added animation for opacity
            >
              {recommendations.map((product) => (
                <motion.div
                  key={product._id}
                  className="w-full sm:w-1/2 lg:w-1/3 xl:w-[33.5%] flex-shrink-0 px-2"
                  whileHover={{ scale: 1.05 }} // Added hover effect for cards
                  whileTap={{ scale: 0.95 }} // Added tap effect for cards
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeopleAlsoBought;
