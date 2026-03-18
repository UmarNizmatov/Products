const myResponse = (res, status_code, message, data = null, success = true) => {
  if (!Number.isInteger(status_code)) status_code = 200;
  return res.status(status_code).json({
    success,
    message,
    data,
  });
};
export default myResponse
