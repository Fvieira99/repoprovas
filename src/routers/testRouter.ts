import { Router } from "express";
import { createTest, getTestsByQuery } from "../controllers/testController.js";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";
import validateToken from "../middlewares/validateTokenMiddleware.js";
import testSchema from "../schemas/testSchema.js";

const testRouter = Router();

testRouter.post("/tests", validateToken, validateSchema(testSchema), createTest);

testRouter.get("/tests", validateToken, getTestsByQuery);

export default testRouter;
