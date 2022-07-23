import Joi from "joi";
var signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required(),
    confirmPassword: Joi.ref("password")
});
export default signUpSchema;
