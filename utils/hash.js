import bcrypt from "bcrypt";
const hashPassword = async function () {
  this.password = await bcrypt.hash(this.password, 10);
};
const passwordCompare = async function (password) {
  return await bcrypt.compare(this.password, password);
};
export { hashPassword,passwordCompare };
