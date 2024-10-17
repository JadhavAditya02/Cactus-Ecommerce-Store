import { useLocation, Link } from 'react-router-dom';
import { useProductStore } from '../stores/useProductStore';
import ProductCard from './ProductCard'; // Import the ProductCard component

const SearchResults = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get('query');
  const { products } = useProductStore(); // Fetch products from your store
  

  // Helper function to normalize product names and query for searching
  const normalizeString = (str) => str.toLowerCase().replace(/[-\s]/g, '');

  // Normalize the search query
  const normalizedQuery = normalizeString(query);

  // Filter products based on the normalized query
  const filteredProducts = products.filter(product =>
    normalizeString(product.name).includes(normalizedQuery)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-emerald-600 font-bold mb-4">Search Results for "{query}"</h2>
      
      {/* Categories Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Categories</h3>
        <nav className="flex flex-wrap gap-4">
          <Link to="/category/tops" className="text-emerald-600 hover:underline">Tops</Link>
          <Link to="/category/bottoms" className="text-emerald-600 hover:underline">Bottoms</Link>
          <Link to="/category/caps" className="text-emerald-600 hover:underline">Hats & Caps</Link>
          <Link to="/category/skateboards" className="text-emerald-600 hover:underline">Skateboards</Link>
          <Link to="/category/eyewears" className="text-emerald-600 hover:underline">Eyewear</Link>
          <Link to="/category/accessories" className="text-emerald-600 hover:underline">Accessories</Link>
        </nav>
      </div>

      {/* Products Section */}
      <div className="bg-emerald p-6 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
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
