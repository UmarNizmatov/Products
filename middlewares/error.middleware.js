import myResponse from "../utils/customresponse.js";

const errorHandler = (err, req, res, next) => {
  if (!Number.isInteger(err.status)) err.status = 500;
  let stack = null;
  if (process.env.NODE_ENV.includes("DEV")) stack = err.stack;
  myResponse(res, err.status, err.message, stack, false);
};
export default errorHandler;
