import prisma from "../../src/config/database.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

interface CreateUserData {
  email: string;
  password: string;
}

export function createUserInfo(email = "a@dmin.com", passwordLength = 10) {
  return {
    email,
    password: faker.internet.password(passwordLength)
  };
}

export async function createUser(data: CreateUserData) {
  const SALT = 10;
  const user = await prisma.user.create({
    data: { ...data, password: bcrypt.hashSync(data.password, SALT) }
  });
  return user;
}

export async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email }
  });
}
