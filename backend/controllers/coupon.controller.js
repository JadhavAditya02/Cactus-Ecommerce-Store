import Coupon from "../models/coupon.model.js";

// Helper function to handle errors
const handleError = (res, error, customMessage) => {
  console.error(customMessage, error.message);
  res.status(500).json({ message: "Server error", error: error.message });
};

// Get the active coupon for the user
export const getCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findOne({
      userId: req.user._id,
      isActive: true,
    });

    res.json(coupon || null);
  } catch (error) {
    handleError(res, error, "Error in getCoupon controller");
  }
};

// Validate a coupon code
export const validateCoupon = async (req, res) => {
  const { code } = req.body;

  try {
    const coupon = await Coupon.findOne({
      code,
      userId: req.user._id,
      isActive: true,
    });

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    // Check expiration date and deactivate if expired
    if (coupon.expirationDate < new Date()) {
      coupon.isActive = false;
      await coupon.save(); // Deactivate expired coupon
      return res.status(404).json({ message: "Coupon expired" });
    }

    res.json({
      message: "Coupon is valid",
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
    });
  } catch (error) {
    handleError(res, error, "Error in validateCoupon controller");
  }
};
