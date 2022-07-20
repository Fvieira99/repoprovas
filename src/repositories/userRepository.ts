import prisma from "../config/database.js";
import { User } from ".prisma/client";

export type CreateUserData = Omit<User, "id">;

export async function create(data: CreateUserData) {
  await prisma.user.create({ data });
}

export async function findByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}
