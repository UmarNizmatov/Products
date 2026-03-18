import orderModele from "../models/order.modele.js";
import myResponse from "../utils/customresponse.js";

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderModele
      .find()
      .populate("userId")
      .populate("products");
    return myResponse(res, 200, "All orders", orders);
  } catch (error) {
    next(error);
  }
};
const getUserOrders = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const orders = await orderModele
      .find(userId)
      .populate("userId")
      .populate("products");
    return myResponse(res, 200, "User orders", orders);
  } catch (error) {
    next(error);
  }
};
const createOrder = async (req, res, next) => {
  try {
    const { id } = req.user;
    const new_order = await orderModele.create({ userId: id, ...req.body });
    return myResponse(res, 201, "Order was successfully created", new_order);
  } catch (error) {
    next(error);
  }
};
const updateOrderStastus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated_order = await orderModele.findByIdAndUpdate(id, {
      stastus: req.body.status,
    });
    return myResponse(
      res,
      201,
      "You have succesfully updated order status",
      updated_order.populate("userId").populate("products"),
    );
  } catch (error) {
    next(error);
  }
};

export { createOrder, getAllOrders, getUserOrders, updateOrderStastus };
