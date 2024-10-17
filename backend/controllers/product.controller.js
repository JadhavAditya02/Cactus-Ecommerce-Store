import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
import Product from "../models/product.model.js";

// Helper function for error handling
const handleError = (res, error, customMessage) => {
	console.error(customMessage, error.message);
	res.status(500).json({ message: "Server error", error: error.message });
};

export const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find({});
		res.json({ products });
	} catch (error) {
		handleError(res, error, "Error in getAllProducts controller");
	}
};

export const getFeaturedProducts = async (req, res) => {
	try {
		const cachedProducts = await redis.get("featured_products");
		if (cachedProducts) {
			return res.json(JSON.parse(cachedProducts));
		}

		const featuredProducts = await Product.find({ isFeatured: true }).lean();
		if (!featuredProducts.length) {
			return res.status(404).json({ message: "No featured products found" });
		}

		await redis.set("featured_products", JSON.stringify(featuredProducts));
		res.json(featuredProducts);
	} catch (error) {
		handleError(res, error, "Error in getFeaturedProducts controller");
	}
};

export const createProduct = async (req, res) => {
	try {
		const { name, description, price, image, category } = req.body;

		let imageUrl = "";
		if (image) {
			const cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
			imageUrl = cloudinaryResponse?.secure_url || "";
		}

		const product = await Product.create({
			name,
			description,
			price,
			image: imageUrl,
			category,
		});

		res.status(201).json(product);
	} catch (error) {
		handleError(res, error, "Error in createProduct controller");
	}
};

export const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		if (product.image) {
			const publicId = product.image.split("/").pop().split(".")[0];
			await cloudinary.uploader.destroy(`products/${publicId}`);
			console.log("Deleted image from Cloudinary");
		}

		await Product.findByIdAndDelete(req.params.id);
		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		handleError(res, error, "Error in deleteProduct controller");
	}
};

export const getRecommendedProducts = async (req, res) => {
	try {
		const products = await Product.aggregate([
			{ $sample: { size: 4 } },
			{ $project: { _id: 1, name: 1, description: 1, image: 1, price: 1 } },
		]);
		res.json(products);
	} catch (error) {
		handleError(res, error, "Error in getRecommendedProducts controller");
	}
};

export const getProductsByCategory = async (req, res) => {
	const { category } = req.params;
	try {
		const products = await Product.find({ category });
		res.json({ products });
	} catch (error) {
		handleError(res, error, "Error in getProductsByCategory controller");
	}
};

export const toggleFeaturedProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		product.isFeatured = !product.isFeatured;
		const updatedProduct = await product.save();
		await updateFeaturedProductsCache();
		res.json(updatedProduct);
	} catch (error) {
		handleError(res, error, "Error in toggleFeaturedProduct controller");
	}
};

async function updateFeaturedProductsCache() {
	try {
		const featuredProducts = await Product.find({ isFeatured: true }).lean();
		await redis.set("featured_products", JSON.stringify(featuredProducts));
	} catch (error) {
		console.log("Error in updateFeaturedProductsCache function:", error.message);
	}
}
