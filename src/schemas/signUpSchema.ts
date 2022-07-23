import Joi from "joi";

interface InputSignUpData {
    email: string;
    password: string;
    confirmPassword: string;
}

const signUpSchema = Joi.object<InputSignUpData>({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required(),
    confirmPassword: Joi.ref("password"),
});

export default signUpSchema;
