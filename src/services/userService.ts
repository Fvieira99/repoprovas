import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as userRepository from "../repositories/userRepository.js";
import { notFoundError, unauthorizedError } from "../utils/errorUtil.js";

dotenv.config();

export async function signUp(data: userRepository.CreateUserData) {
  const existingUser = await userRepository.findByEmail(data.email);
  if (existingUser) {
    throw { type: "conflict", message: "Email is already being used" };
  }

  const encryptedPassword = encryptPassword(data.password);

  await userRepository.create({ ...data, password: encryptedPassword });
}

export async function signIn(data: userRepository.CreateUserData) {
  const user = await userRepository.findByEmail(data.email);
  console.log(user);
  if (!user || !isCorrectPassword(data.password, user.password)) {
    throw unauthorizedError("Credentials are not valid!");
  }
  const JWT_DATA = { userId: user.id };
  const JWT_KEY = process.env.JWT_SECRET;
  const JWT_CONFIG = { expiresIn: 60 * 60 };
  const token = jwt.sign(JWT_DATA, JWT_KEY, JWT_CONFIG);
  return token;
}

function encryptPassword(password: string) {
  const SALT = 10;
  return bcrypt.hashSync(password, SALT);
}

function isCorrectPassword(inputPassword: string, userPassword: string) {
  return bcrypt.compareSync(inputPassword, userPassword);
}
