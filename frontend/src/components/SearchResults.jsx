import { useLocation, Link } from 'react-router-dom';
import { useProductStore } from '../stores/useProductStore';
import ProductCard from './ProductCard'; 
import { motion } from 'framer-motion';

const SearchResults = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get('query');
  const { products } = useProductStore(); 

  const normalizeString = (str) => str.toLowerCase().replace(/[-\s]/g, '');

  const normalizedQuery = normalizeString(query);

  const filteredProducts = products.filter((product) =>
    normalizeString(product.name).includes(normalizedQuery)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-emerald-600 font-bold mb-4">
        Search Results for "{query}"
      </h2>

      {/* Categories Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Categories</h3>
        <nav className="flex flex-wrap gap-4">
          {['tops', 'bottoms', 'caps', 'skateboards', 'eyewears', 'accessories'].map((category) => (
            <Link key={category} to={`/category/${category}`} className="text-emerald-600 hover:underline">
              {category.charAt(0).toUpperCase() + category.slice(1).replace('s', '')} 
            </Link>
          ))}
        </nav>
      </div>

      <div className="bg-emerald p-6 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))
          ) : (
            <p>No products found for your search.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
