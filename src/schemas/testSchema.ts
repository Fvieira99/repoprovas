import Joi from "joi";
import { InputTestData } from "../services/testService.js";

const testSchema = Joi.object<InputTestData>({
    name: Joi.string().required(),
    pdfUrl: Joi.string().uri().required(),
    categoryId: Joi.number().required(),
    teacherId: Joi.number().required(),
    disciplineId: Joi.number().required(),
});

export default testSchema;
