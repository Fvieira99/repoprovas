import prisma from "../../src/config/database.js";
import { faker } from "@faker-js/faker";
import supertest from "supertest";
import app from "../../src/app/app.js";

import { Query, InputTestData } from "../../src/services/testService.js";

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

export async function getTestsByQuery(query: Query, token: string) {
  return await supertest(app)
    .get(`/tests?groupBy=${query}`)
    .set("Authorization", `Bearer ${token}`);
}

export async function createTest(testInfo: InputTestData, token: string) {
  return await supertest(app)
    .post("/tests")
    .send(testInfo)
    .set("Authorization", `Bearer ${token}`);
}
