// src/components/ProductCard.jsx
import { ShoppingCart, Heart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useWishlistStore } from "../stores/useWishlistStore";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlistStore();
  const navigate = useNavigate();

  const handleAddToCart = (event) => {
    event.stopPropagation();
    if (!user) {
      navigate("/signup");
    } else {
      addToCart(product);
    }
  };

  const isInWishlist = wishlist.some((item) => item._id === product._id);

  const handleWishlistClick = (event) => {
    event.stopPropagation();
    if (!user) {
      navigate("/signup");
    } else if (isInWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <motion.div
      className="flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div
        onClick={() => navigate(`/product/${product._id}`)}
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl cursor-pointer"
      >
        <img className="object-cover w-full" src={product.image} alt="product" />
        <div className="absolute inset-0 bg-black bg-opacity-20" />
      </div>

      <div className="mt-4 px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900">
          {product.name}
        </h5>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-emerald-400">
              ₹{product.price}
            </span>
          </p>
        </div>

        <div className="flex justify-between">
          <motion.button
            className="flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
            onClick={handleAddToCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart size={22} className="mr-2" />
            Add to cart
          </motion.button>

          <motion.button
            className="flex items-center justify-center text-red-500 hover:text-red-600"
            onClick={handleWishlistClick}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart size={24} fill={isInWishlist ? "currentColor" : "none"} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
