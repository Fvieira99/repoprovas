import { Router } from "express";
import { signUp, signIn } from "../controllers/userController.js";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";
import signUpSchema from "../schemas/signUpSchema.js";
import signInSchema from "../schemas/signInSchema.js";
const userRouter = Router();

userRouter.post("/signup", validateSchema(signUpSchema), signUp);
userRouter.post("/signIn", validateSchema(signInSchema), signIn);

export default userRouter;
