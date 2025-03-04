import Order from "../models/orderModel.js";

// Create Order
export const createOrderController = async (req, res) => {
  try {
    const { products, totalAmount } = req.body;
    if (!products || products.length === 0 || !totalAmount) {
      return res.status(400).json({ message: "Invalid order details" });
    }

    const order = await new Order({
      user: req.user._id,
      products,
      totalAmount,
    }).save();

    res.status(201).json({ success: true, message: "Order created", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error creating order" });
  }
};

// Get Orders for a User
export const getUserOrdersController = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "products.product"
    );
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

// Get All Orders (Admin)
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("products.product");
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching all orders" });
  }
};

// Update Order Status
export const updateOrderStatusController = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    res
      .status(200)
      .json({ success: true, message: "Order status updated", order });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error updating order status" });
  }
};
