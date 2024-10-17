import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = [
  "caps",
  "skateboards",
  "backpacks",
  "clothes",
  "shirts",
  "t-shirts",
  "hoodie",
  "tops",
  "bottoms",
  "boxers",
  "socks",
  "eyewears",
  "wallets",
  "watches",
  "accessories",
];

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: [], // Change category to an array
    image: "",
  });
  const [error, setError] = useState("");
  const { createProduct, loading } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (!newProduct.name || !newProduct.description || !newProduct.price || newProduct.category.length === 0 || !newProduct.image) {
      setError("Please fill all the required fields.");
      return;
    }

    setError(""); // Clear any previous errors

    try {
      await createProduct(newProduct);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: [],
        image: "",
      });
    } catch {
      console.log("Error creating a product");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };

      reader.readAsDataURL(file); // base64
    }
  };

  const handleCategoryChange = (category) => {
    if (newProduct.category.includes(category)) {
      // Remove the category if it's already selected
      setNewProduct({
        ...newProduct,
        category: newProduct.category.filter((cat) => cat !== category),
      });
    } else {
      // Add the category if it's not already selected
      setNewProduct({
        ...newProduct,
        category: [...newProduct.category, category],
      });
    }
  };

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-emerald-300">
        Create New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300"
          >
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
              px-3 text-white focus:outline-none focus:ring-2
              focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300"
          >
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            rows="3"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm
              py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 
              focus:border-emerald-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-300"
          >
            Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={newProduct.price}
            onChange={(e) => {
              const value = e.target.value;
              // Ensure that the input value is handled as a string or number correctly
              setNewProduct({ ...newProduct, price: value });
            }}
            step="0.01"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm 
              py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500
              focus:border-emerald-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-300"
          >
            Categories <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center text-gray-300">
                <input
                  type="checkbox"
                  checked={newProduct.category.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="form-checkbox h-4 w-4 text-emerald-600 transition duration-150 ease-in-out"
                />
                <span className="ml-2">{category}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mt-1 flex items-center">
          <input
            type="file"
            id="image"
            className="sr-only"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          <label
            htmlFor="image"
            className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            <Upload className="h-5 w-5 inline-block mr-2" />
            Upload Image
          </label>
          {newProduct.image && (
            <span className="ml-3 text-sm text-gray-400">Image uploaded</span>
          )}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
            shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader
                className="mr-2 h-5 w-5 animate-spin"
                aria-hidden="true"
              />
              Loading...
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Product
            </>
          )}
        </button>
      </form>

      {/* CSS to hide arrows in number input fields */}
      <style jsx>{`
        input[type='number']::-webkit-inner-spin-button,
        input[type='number']::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type='number'] {
          -moz-appearance: textfield; /* For Firefox */
        }
      `}</style>
    </motion.div>
  );
};

export default CreateProductForm;
