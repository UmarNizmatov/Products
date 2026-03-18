import Joi from "joi";

const productCreateSchema = Joi.object({
  title: Joi.string().min(3).max(120).trim().required(),

  price: Joi.number().min(0).required(),

  category: Joi.string().trim().required(),

  stock: Joi.number().min(0).required(),
});
const updateProductSchema = Joi.object({
  title: Joi.string().min(3).max(120).trim(),
  price: Joi.number().min(0),
  category: Joi.string().trim(),
  stock: Joi.number().min(0),
});

export { updateProductSchema, productCreateSchema };
