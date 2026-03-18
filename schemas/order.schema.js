import Joi from "joi";

const objectId = /^[0-9a-fA-F]{24}$/;

const createOrderSchema = Joi.object({
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().pattern(objectId).required().messages({
          "string.pattern.base": "productId must be a valid ObjectId",
          "any.required": "productId is required",
        }),

        quantity: Joi.number().min(1).required().messages({
          "number.base": "quantity must be a number",
          "number.min": "quantity must be at least 1",
          "any.required": "quantity is required",
        }),
      }),
    )
    .min(1)
    .required()
    .messages({
      "array.base": "products must be an array",
      "array.min": "at least one product is required",
      "any.required": "products is required",
    }),

  status: Joi.string()
    .valid("pending", "shipped", "delivered")
    .optional()
    .messages({
      "any.only": "status must be one of pending, shipped, delivered",
    }),
});

const updateOrderSchema = Joi.object({
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().pattern(objectId).messages({
          "string.pattern.base": "productId must be a valid ObjectId",
        }),

        quantity: Joi.number().min(1).messages({
          "number.base": "quantity must be a number",
          "number.min": "quantity must be at least 1",
        }),
      }),
    )
    .min(1)
    .messages({
      "array.base": "products must be an array",
      "array.min": "at least one product is required",
    }),

  status: Joi.string().valid("pending", "shipped", "delivered").messages({
    "any.only": "status must be one of pending, shipped, delivered",
  }),
})
  .min(1)
  .messages({
    "object.min": "at least one field must be provided for update",
  });
const updateOrderStatusSchema = Joi.object({
  status: Joi.string().valid("pending", "shipped", "delivered").optional(),
});
export { updateOrderSchema, createOrderSchema, updateOrderStatusSchema };
