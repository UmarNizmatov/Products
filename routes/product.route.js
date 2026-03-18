import { Router } from "express";
import {
  addProduct,
  deleteProductById,
  getAllProducts,
  getProductByID,
  updateProductbyId,
} from "../controller/product.controller.js";
import {
  adminCheck,
  bodyValidator,
  refreshTokenValidator,
} from "../middlewares/validator.middleware.js";
import {
  productCreateSchema,
  updateProductSchema,
} from "../schemas/product.schema.js";

const productRouter = new Router();

productRouter.get("/", getAllProducts);

productRouter.get("/:id", getProductByID);

productRouter.post(
  "/",
  refreshTokenValidator,
  adminCheck,
  bodyValidator(productCreateSchema),
  addProduct,
);

productRouter.delete("/:id", deleteProductById);

productRouter.put(
  "/:id",
  bodyValidator(updateProductSchema),
  updateProductbyId,
);

export default productRouter;
