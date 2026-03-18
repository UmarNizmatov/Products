import userModele from "../models/user.modele.js";
import MyError from "../utils/customError.js";
import myResponse from "../utils/customresponse.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

const register = async (req, res, next) => {
  try {
    const user = await userModele.create(req.body);
    user.password = undefined;
    return myResponse(res, 201, "You have registered please log in", user);
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModele.findOne({email});
    if (!user) throw new MyError(404, "Not found");
    const isMatch = user.passwordCompare(password);
    if (!isMatch) throw new MyError(400, "Wrong password");
    const refreshToken = generateRefreshToken(user);
    const accessToken = generateAccessToken(user);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "PRO",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return myResponse(res, 201, "You have logged in succesfully", accessToken);
  } catch (error) {
    next(error);
  }
};
export { login, register };
