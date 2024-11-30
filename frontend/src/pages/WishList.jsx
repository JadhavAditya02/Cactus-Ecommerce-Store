
import { useWishlistStore } from "../stores/useWishlistStore";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";

const WishList = () => {
  const { wishlist } = useWishlistStore();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.h1
          className="text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Wishlist
        </motion.h1>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-300">
            Your wishlist is empty.
          </div>
        )}
      </div>
    </div>
  );
};

export default WishList;
