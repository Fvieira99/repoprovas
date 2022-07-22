import prisma from "../config/database.js";

export async function findAllCategories() {
  return prisma.category.findMany();
}

export async function findOneCategory(id: number) {
  return await prisma.category.findUnique({ where: { id } });
}
