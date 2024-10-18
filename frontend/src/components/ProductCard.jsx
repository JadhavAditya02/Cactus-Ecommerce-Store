import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion"; // Importing motion for animations

const ProductCard = ({ product }) => {
	const { user } = useUserStore();
	const { addToCart } = useCartStore();
	const navigate = useNavigate();

	// Handle adding to cart and redirecting logic
	const handleAddToCart = (event) => {
		event.stopPropagation(); // Prevent the click from bubbling up
		if (!user) {
			navigate("/signup"); // Redirect to /signup if not logged in
		} else {
			console.log('Adding to cart:', product._id); // Log adding to cart
			addToCart(product);
		}
	};

	// Handle image click with redirection logic
	const handleImageClick = () => {
		if (!user) {
			navigate("/signup"); // Redirect to /signup if not logged in
		} else {
			navigate(`/product/${product._id}`); // Navigate to product detail page
		}
	};

	return (
		<motion.div 
			className='flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg'
			whileHover={{ scale: 1.02 }} // Animation for hover effect
			transition={{ duration: 0.3 }} // Transition for the hover effect
		>
			{/* Image with add to cart functionality */}
			<div 
				onClick={handleImageClick} 
				className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl cursor-pointer'
			>
				<img 
					className='object-cover w-full' 
					src={product.image} 
					alt='product' 
				/>
				<div className='absolute inset-0 bg-black bg-opacity-20' />
			</div>

			<div className='mt-4 px-5 pb-5'>
				<h5 className='text-xl font-semibold tracking-tight text-gray-900'>{product.name}</h5>
				<div className='mt-2 mb-5 flex items-center justify-between'>
					<p>
						<span className='text-3xl font-bold text-emerald-400'>₹{product.price}</span>
					</p>
				</div>
				<motion.button
					className='flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300'
					onClick={handleAddToCart} // Call handleAddToCart on button click
					whileHover={{ scale: 1.05 }} // Scale up on hover
					whileTap={{ scale: 0.95 }} // Scale down on tap
				>
					<ShoppingCart size={22} className='mr-2' />
					Add to cart
				</motion.button>
			</div>
		</motion.div>
	);
};

export default ProductCard;
