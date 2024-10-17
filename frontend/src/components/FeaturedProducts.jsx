import { useEffect, useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { useNavigate } from "react-router-dom"; // Import Link and useNavigate from react-router-dom
import { useUserStore } from "../stores/useUserStore"; // Make sure to import the user store

const FeaturedProducts = ({ featuredProducts }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(4);
	const { addToCart } = useCartStore();
	const { user } = useUserStore(); // Get the user state from the user store
	const navigate = useNavigate(); // Initialize useNavigate for redirection

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 640) setItemsPerPage(1);
			else if (window.innerWidth < 1024) setItemsPerPage(2);
			else if (window.innerWidth < 1280) setItemsPerPage(3);
			else setItemsPerPage(4);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
	};

	const isStartDisabled = currentIndex === 0;
	const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;

	// Handle Add to Cart with redirection logic
	const handleAddToCart = (product, event) => {
		event.stopPropagation(); // Prevent the click from bubbling up
		if (!user) {
			console.log("User not logged in, redirecting to signup...");
			setTimeout(() => {
				navigate("/signup"); // Redirect to signup page after a slight delay
			}, 100); // Add a slight delay before navigation
		} else {
			// Add to cart
			addToCart(product);
		}
	};

	// Handle image click with redirection logic
	const handleImageClick = (product) => {
		if (!user) {
			console.log("User not logged in, redirecting to signup...");
			setTimeout(() => {
				navigate("/signup"); // Redirect to signup page after a slight delay
			}, 100); // Add a slight delay before navigation
		} else {
			// Navigate to the product detail page if the user is logged in
			navigate(`/product/${product._id}`);
		}
	};

	return (
		<div className='py-12'>
			<div className='container mx-auto px-4'>
				<h2 className="text-3xl font-bold text-emerald-400 mb-[3rem] -mt-[2.5rem] text-center">FEATURED</h2>

				<div className='relative'>
					<div className='overflow-hidden'>
						<div
							className='flex transition-transform duration-300 ease-in-out'
							style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
						>
							{featuredProducts?.map((product) => (
								<div key={product._id} className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-2'>
									<div className='bg-white bg-opacity-10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden h-full transition-all duration-300 hover:shadow-xl border border-emerald-500/30'>
										{/* Wrap image with onClick handler */}
										<div className='overflow-hidden' onClick={() => handleImageClick(product)}>
											<img
												src={product.image}
												alt={product.name}
												className='w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer'
											/>
										</div>
										<div className='p-4'>
											<h3 className='text-lg font-semibold mb-2 text-white'>{product.name}</h3>
											<p className='text-emerald-300 font-medium mb-4'>
												₹{product.price.toFixed(2)}
											</p>
											<button
												onClick={(event) => handleAddToCart(product, event)} // Pass event to handleAddToCart
												className='w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 
												flex items-center justify-center'
											>
												<ShoppingCart className='w-5 h-5 mr-2' />
												Add to Cart
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					<button
						onClick={prevSlide}
						disabled={isStartDisabled}
						className={`absolute top-1/2 -left-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${
							isStartDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-500"
						}`}
					>
						<ChevronLeft className='w-6 h-6' />
					</button>

					<button
						onClick={nextSlide}
						disabled={isEndDisabled}
						className={`absolute top-1/2 -right-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${
							isEndDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-500"
						}`}
					>
						<ChevronRight className='w-6 h-6' />
					</button>
				</div>
			</div>
		</div>
	);
};

export default FeaturedProducts;
