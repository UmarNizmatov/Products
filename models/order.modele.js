import mongoose from "mongoose";
import productModele from "./product.modele.js";
import MyError from "../utils/customError.js";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: {
          type: Number,
          min: 1,
          required: true,
        },
      },
    ],
    totalPrice: Number,
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
orderSchema.pre("save", async function () {
  let total = 0;
  for (let item of this.products) {
    const product = await productModele.findById(item.productId);
    if (!product) return next(new MyError(404, "Product not found"));
    total += product.price * item.quantity;
  }
  this.totalPrice = total;
});

export default mongoose.model("order", orderSchema);
