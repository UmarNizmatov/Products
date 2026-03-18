import jwt from "jsonwebtoken";
const generateAccessToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "80m",
  });
};
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
export { generateAccessToken, generateRefreshToken };
