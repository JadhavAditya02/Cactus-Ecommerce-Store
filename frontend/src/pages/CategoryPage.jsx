import { useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
  const { fetchProductsByCategory, products } = useProductStore();
  const { category } = useParams();

  const [visibleCount, setVisibleCount] = useState(8);
  const [sortOption, setSortOption] = useState("recommended");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);

  useEffect(() => {
    fetchProductsByCategory(category);
  }, [fetchProductsByCategory, category]);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Function to sort and filter products
  const getFilteredAndSortedProducts = () => {
    const filteredProducts = products
      .filter((product) => product.price >= minPrice && product.price <= maxPrice)
      .sort((a, b) => {
        if (sortOption === "priceAsc") return a.price - b.price;
        if (sortOption === "priceDesc") return b.price - a.price;
        if (sortOption === "popularity") return b.popularity - a.popularity;
        return 0; // Default case (recommended)
      });
    
    return filteredProducts;
  };

  const filteredAndSortedProducts = getFilteredAndSortedProducts();

  return (
    <div className="min-h-screen">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.h1
          className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-400 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </motion.h1>

        {/* Sort and Filter Options */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          {/* Price Range Filter */}
          <div className="flex items-center">
            <label className="mr-2 text-gray-300">Price Range:</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(Math.max(0, Number(e.target.value)))}
              className="bg-gray-700 text-white p-2 rounded mr-2 w-20 sm:w-28"
              placeholder="Min"
            />
            <span className="text-gray-300">to</span>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Math.max(minPrice, Number(e.target.value)))}
              className="bg-gray-700 text-white p-2 rounded ml-2 w-20 sm:w-28"
              placeholder="Max"
            />
          </div>

          {/* Sort Options */}
          <div className="flex items-center">
            <label className="mr-2 text-gray-300">Sort by:</label>
            <select
              onChange={handleSortChange}
              value={sortOption}
              className="bg-gray-700 text-white p-2 rounded w-48 sm:w-auto"
            >
              <option value="recommended">Recommended</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {filteredAndSortedProducts.length === 0 && (
            <h2 className="text-3xl font-semibold text-gray-300 text-center col-span-full">
              No products found
            </h2>
          )}

          {filteredAndSortedProducts.slice(0, visibleCount).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </motion.div>

        {/* Load More Button */}
        {filteredAndSortedProducts.length > visibleCount && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              className="bg-emerald-500 text-white py-2 px-4 rounded hover:bg-emerald-600 transition duration-300"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
