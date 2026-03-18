import productModele from "../models/product.modele.js";
import MyError from "../utils/customError.js";
import myResponse from "../utils/customresponse.js";

const getAllProducts = async (req, res, next) => {
  try {
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);

    if (!page || page <= 0 || isNaN(page)) page = 1;
    if (!limit || limit <= 0 || isNaN(limit)) limit = 10;

    const skip = (page - 1) * limit;

    const queryObj = { ...req.query };
    delete queryObj.page;
    delete queryObj.limit;

    let match = {};

    for (let key in queryObj) {
      let value = queryObj[key];
      if (key.includes(">")) {
        const field = key.split(">")[0];
        match[field] = { $gt: Number(value) };
      } else if (key.includes("<")) {
        const field = key.split("<")[0];
        match[field] = { $lt: Number(value) };
      } else if (key.includes(">=")) {
        const field = key.split(">=")[0];
        match[field] = { $gte: Number(value) };
      } else if (key.includes("<=")) {
        const field = key.split("<=")[0];
        match[field] = { $lte: Number(value) };
      } else if (key === "category") {
        match.category = value;
      } else if (key === "title") {
        match.title = { $regex: value, $options: "i" };
      } else if (key === "stock") {
        match.stock = Number(value);
      } else if (key === "price") {
        match.price = Number(value);
      }
    }

    const total = await productModele.countDocuments(match);
    const totalPages = Math.ceil(total / limit);

    const products = await productModele.aggregate([
      { $match: match },
      { $skip: skip },
      { $limit: limit },
    ]);

    return myResponse(res, 200, "All products", {
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};
const getProductByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productModele.findById(id);
    if (!product) throw new MyError(404, "Not found");
    return myResponse(res, 200, "Product", product);
  } catch (error) {
    next(error);
  }
};
const addProduct = async (req, res, next) => {
  try {
    const product = await productModele.create(req.body);
    return myResponse(res, 201, "Product was added", product);
  } catch (error) {
    next(error);
  }
};
const deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted_product = await productModele.findByIdAndDelete(id);
    return myResponse(res, 200, "This product was deleted", deleted_product);
  } catch (error) {
    next(error);
  }
};
const updateProductbyId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated_product = await productModele.findByIdAndUpdate(
      id,
      req.body,
      { new: true },
    );
    return myResponse(
      res,
      201,
      "PRoduct was succesfylly updated",
      deleted_product,
    );
  } catch (error) {
    next(error);
  }
};
export {
  getAllProducts,
  getProductByID,
  addProduct,
  deleteProductById,
  updateProductbyId,
};
