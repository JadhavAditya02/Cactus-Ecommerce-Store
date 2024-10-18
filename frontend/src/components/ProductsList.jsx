import { motion } from "framer-motion"; // Ensure motion is imported
import { Trash, Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const ProductsList = () => {
	const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

	console.log("products", products);

	return (
		<motion.div
			className="bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-700">
					<thead className="bg-gray-700">
						<tr>
							{["Product", "Price", "Category", "Featured", "Actions"].map((header) => (
								<th
									key={header}
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
								>
									{header}
								</th>
							))}
						</tr>
					</thead>

					<tbody className="bg-gray-800 divide-y divide-gray-700">
						{products?.map((product) => (
							<motion.tr
								key={product._id}
								className="hover:bg-gray-700"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="flex items-center">
										<img
											className="h-10 w-10 rounded-full object-cover"
											src={product.image}
											alt={product.name}
										/>
										<div className="ml-4">
											<div className="text-sm font-medium text-white">{product.name}</div>
										</div>
									</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm text-gray-300">₹{product.price.toFixed(2)}</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm text-gray-300">{product.category}</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="flex justify-center">
										<button
											onClick={() => toggleFeaturedProduct(product._id)}
											className={`p-1 rounded-full flex items-center justify-center ${
												product.isFeatured ? "bg-yellow-400 text-gray-900" : "bg-gray-600 text-gray-300"
											} hover:bg-yellow-500 transition-colors duration-200`}
										>
											<Star className="h-5 w-5" />
										</button>
									</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="flex justify-center">
										<button
											onClick={() => deleteProduct(product._id)}
											className="text-red-400 hover:text-red-300 flex items-center justify-center"
										>
											<Trash className="h-5 w-5" />
										</button>
									</div>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};

export default ProductsList;
