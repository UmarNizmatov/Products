import { Router } from "express";
import { login, register } from "../controller/user.controller.js";
import {
  bodyValidator,
  sameEmailCheck,
} from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/user.schema.js";

const userRouter = new Router();

userRouter.post(
  "/register",
  bodyValidator(registerSchema),
  sameEmailCheck,
  register,
);

userRouter.post("/login", bodyValidator(loginSchema), login);


export default userRouter;
