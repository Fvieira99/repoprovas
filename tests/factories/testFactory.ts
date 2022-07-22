import prisma from "../../src/config/database.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

export function createTestInfo(
  categoryId = 1,
  teacherId = 1,
  disciplineId = 1
) {
  return {
    name: faker.name.jobTitle(),
    pdfUrl: faker.internet.url(),
    categoryId,
    teacherId,
    disciplineId
  };
}
