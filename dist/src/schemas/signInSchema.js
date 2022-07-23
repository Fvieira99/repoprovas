import Joi from "joi";
var signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});
export default signInSchema;
