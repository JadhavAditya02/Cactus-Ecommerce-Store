import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

const handleError = (error) => {
  console.error("Error:", error);
  throw error;
};

export const getAnalyticsData = async () => {
  try {
    const [totalUsers, totalProducts, salesData] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Order.aggregate([
        {
          $group: {
            _id: null,
            totalSales: { $sum: 1 },
            totalRevenue: { $sum: "$totalAmount" },
          },
        },
      ]),
    ]);

    const { totalSales = 0, totalRevenue = 0 } = salesData[0] || {};

    return {
      users: totalUsers,
      products: totalProducts,
      totalSales,
      totalRevenue,
    };
  } catch (error) {
    handleError(error);
  }
};

export const getDailySalesData = async (startDate, endDate) => {
  try {
    const dailySalesData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          sales: { $sum: 1 },
          revenue: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const dateArray = getDatesInRange(startDate, endDate);

    const salesDataMap = new Map(
      dailySalesData.map(({ _id, sales, revenue }) => [_id, { sales, revenue }])
    );

    return dateArray.map((date) => {
      const { sales = 0, revenue = 0 } = salesDataMap.get(date) || {};
      return {
        date,
        sales,
        revenue,
      };
    });
  } catch (error) {
    handleError(error);
  }
};

function getDatesInRange(startDate, endDate) {
  const dates = [];
  const currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    dates.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}
