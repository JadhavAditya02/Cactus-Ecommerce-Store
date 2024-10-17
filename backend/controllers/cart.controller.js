import Product from "../models/product.model.js";

// Helper function to handle errors
const handleError = (res, error, customMessage) => {
  console.error(customMessage, error.message);
  res.status(500).json({ message: "Server error", error: error.message });
};

// Get products in the user's cart
export const getCartProducts = async (req, res) => {
  try {
    const products = await Product.find({
      _id: { $in: req.user.cartItems.map((item) => item.id) },
    });

    // Create cart items with quantity for each product
    const cartItems = products.map((product) => {
      const item = req.user.cartItems.find(
        (cartItem) => cartItem.id === product.id
      );
      return { ...product.toJSON(), quantity: item?.quantity || 0 }; // Use optional chaining for safety
    });

    res.json(cartItems);
  } catch (error) {
    handleError(res, error, "Error in getCartProducts controller");
  }
};

// Add product to the user's cart
export const addToCart = async (req, res) => {
  const { productId } = req.body;
  const user = req.user;

  try {
    const existingItem = user.cartItems.find((item) => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push({ id: productId, quantity: 1 }); // Store productId and quantity together
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    handleError(res, error, "Error in addToCart controller");
  }
};

// Remove products from the user's cart
export const removeAllFromCart = async (req, res) => {
  const { productId } = req.body;
  const user = req.user;

  try {
    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter((item) => item.id !== productId);
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    handleError(res, error, "Error in removeAllFromCart controller");
  }
};

// Update quantity of a product in the user's cart
// cart.controller.js
export const updateQuantity = async (req, res) => {
  const { id: productId } = req.params;
  const { quantity } = req.body;
  const user = req.user;

  try {
      const existingItem = user.cartItems.find((item) => item.id === productId);

      if (existingItem) {
          if (quantity <= 0) {
              user.cartItems = user.cartItems.filter((item) => item.id !== productId);
          } else {
              existingItem.quantity = quantity;
          }

          await user.save();
          return res.json(user.cartItems);
      } else {
          return res.status(404).json({ message: "Product not found in cart" });
      }
  } catch (error) {
      handleError(res, error, "Error in updateQuantity controller");
  }
};
