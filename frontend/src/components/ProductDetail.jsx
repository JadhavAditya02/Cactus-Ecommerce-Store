import { useParams } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";
import { useCartStore } from "../stores/useCartStore";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"; 

const ProductDetail = () => {
    const { productId } = useParams();
    const { products, fetchAllProducts } = useProductStore();
    const { addToCart } = useCartStore();
    const [loading, setLoading] = useState(true);
    const product = products.find((product) => product._id === productId);

    useEffect(() => {
        const loadProducts = async () => {
            await fetchAllProducts(); 
            setLoading(false); 
        };

        loadProducts();
    }, [fetchAllProducts]);

    const handleAddToCart = () => {
        if (!product) {
            toast.error("Product not found.", { id: "notFound" });
            return;
        }
        addToCart(product);
        toast.success("Product added to cart!", { id: "addToCart" });
    };

    if (loading) {
        return <h2 className="text-center text-xl">Loading...</h2>;
    }

    if (!product) {
        return <h2 className="text-center text-xl">Product not found</h2>;
    }

    return (
        <div className="max-w-screen-xl mx-auto px-4 py-8 sm:py-16">
            <div className="flex flex-col md:flex-row items-start space-y-8 md:space-y-0 md:space-x-8">
                {/* Product Image */}
                <motion.div 
                    className="md:w-1/3 w-full"
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }} 
                >
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-auto rounded-lg shadow-lg max-h-[30rem] object-contain"
                    />
                </motion.div>

                <motion.div 
                    className="md:w-2/3 w-full md:pl-8"
                    initial={{ y: 20 }} 
                    animate={{ y: 0 }} 
                    transition={{ duration: 0.5 }} 
                >
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">{product.name}</h1>
                    <p className="text-base sm:text-lg text-gray-800 mb-4">{product.description}</p>
                    <p className="text-xl sm:text-2xl font-bold text-emerald-400">₹{product.price.toFixed(2)}</p>
                    <motion.button
                        className="mt-6 w-full sm:w-1/2 md:w-1/4 flex items-center justify-center bg-emerald-600 text-white px-4 py-3 rounded-lg hover:bg-emerald-700 transition duration-300"
                        onClick={handleAddToCart}
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }} 
                    >
                        <ShoppingCart size={22} className="mr-2" />
                        Add to Cart
                    </motion.button>
                </motion.div>
            </div>

            <div className="mt-20" /> 
        </div>
    );
};

export default ProductDetail;
