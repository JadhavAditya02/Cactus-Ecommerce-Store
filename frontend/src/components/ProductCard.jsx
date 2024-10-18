import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion"; 

const ProductCard = ({ product }) => {
	const { user } = useUserStore();
	const { addToCart } = useCartStore();
	const navigate = useNavigate();

	const handleAddToCart = (event) => {
		event.stopPropagation(); 
		if (!user) {
			navigate("/signup"); 
		} else {
			console.log('Adding to cart:', product._id); 
			addToCart(product);
		}
	};

	const handleImageClick = () => {
		if (!user) {
			navigate("/signup"); 
		} else {
			navigate(`/product/${product._id}`); 
		}
	};

	return (
		<motion.div 
			className='flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg'
			whileHover={{ scale: 1.02 }} 
			transition={{ duration: 0.3 }} 
		>
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
					onClick={handleAddToCart} 
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<ShoppingCart size={22} className='mr-2' />
					Add to cart
				</motion.button>
			</div>
		</motion.div>
	);
};

export default ProductCard;
