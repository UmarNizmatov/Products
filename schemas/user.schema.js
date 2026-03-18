import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(120).trim().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid("admin", "user").optional(),
});
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export { loginSchema, registerSchema };
