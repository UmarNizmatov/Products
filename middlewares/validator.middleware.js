import productModele from "../models/product.modele.js";
import userModele from "../models/user.modele.js";
import MyError from "../utils/customError.js";
import jwt from "jsonwebtoken";

const bodyValidator = (schema) => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req.body);
      if (error) throw new MyError(400, error.details[0].message);
      next();
    } catch (error) {
      next(error);
    }
  };
};

const sameEmailCheck = async (req, res, next) => {
  try {
    const { email } = req.body;
    const emailInDb = await userModele.findOne({ email });
    if (emailInDb) throw new MyError(400, "This email is already registered");
    next();
  } catch (error) {
    next(error);
  }
};
const adminCheck = (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== "admin")
      throw new MyError(403, "Forbiden you are not allowed");
    next();
  } catch (error) {
    next(error);
  }
};
const refreshTokenValidator = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) throw new MyError(401, "Refresh token is required");
    const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
    const userInDb = await userModele.findById(user.id);
    if (!userInDb) throw new MyError(401, "Token revoked");
    req.user = userInDb;
    next();
  } catch (error) {
    next(error);
  }
};
const stockCheak = async (req, res, next) => {
  try {
    for (let item of req.body.products) {
      const product = await productModele.findById(item.productId);
      if (!product) throw new MyError(404, "This product was not found");
      if (product.stock < item.stock)
        throw new MyError(400, "You have ordered this product more than stock");
    }

    next();
  } catch (error) {
    next(error);
  }
};
export {
  sameEmailCheck,
  bodyValidator,
  adminCheck,
  refreshTokenValidator,
  stockCheak,
};
