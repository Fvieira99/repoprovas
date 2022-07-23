import supertest from "supertest";
import prisma from "../src/config/database.js";
import * as userFactory from "./factories/userFactory.js";
import * as testFactory from "./factories/testFactory.js";
import app from "../src/app/app.js";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users;`;
  await prisma.$executeRaw`TRUNCATE TABLE tests;`;
});

describe("Running tests test suit", () => {
  it("given correct test info create new test and return code 201", async () => {
    const userInfo = userFactory.createUserInfo();
    await userFactory.createUser(userInfo);

    const tokenResponse = await supertest(app).post("/sign-in").send(userInfo);
    const { token } = tokenResponse.body;

    const testInfo = testFactory.createTestInfo();
    const createTestResponse = await testFactory.createTest(testInfo, token);
    expect(createTestResponse.statusCode).toBe(201);

    const createdTest = await prisma.test.findFirst({
      where: {
        name: testInfo.name
      }
    });

    expect(createdTest).not.toBeNull();
  });

  it("given nonexistent categoryId return code 404 on test creation", async () => {
    const userInfo = userFactory.createUserInfo();
    await userFactory.createUser(userInfo);

    const tokenResponse = await supertest(app).post("/sign-in").send(userInfo);
    const { token } = tokenResponse.body;

    const wrongCategoryId = 4;
    const testInfo = testFactory.createTestInfo(wrongCategoryId);
    const createTestResponse = await testFactory.createTest(testInfo, token);
    expect(createTestResponse.statusCode).toBe(404);
  });

  it("given wrong or nonexistent teacherId return code 404 on test creation", async () => {
    const userInfo = userFactory.createUserInfo();
    await userFactory.createUser(userInfo);

    const tokenResponse = await supertest(app).post("/sign-in").send(userInfo);
    const { token } = tokenResponse.body;

    const wrongTeacherId = 2;
    const testInfo = testFactory.createTestInfo(
      undefined,
      wrongTeacherId,
      undefined
    );
    const createTestResponse = await testFactory.createTest(testInfo, token);
    expect(createTestResponse.statusCode).toBe(404);
  });

  it("given wrong or nonexistent disciplineId return code 404 on test creation", async () => {
    const userInfo = userFactory.createUserInfo();
    await userFactory.createUser(userInfo);

    const tokenResponse = await supertest(app).post("/sign-in").send(userInfo);
    const { token } = tokenResponse.body;

    const wrongDisciplineId = 4;
    const testInfo = testFactory.createTestInfo(
      undefined,
      undefined,
      wrongDisciplineId
    );
    const testResponse = await supertest(app)
      .post("/tests")
      .send(testInfo)
      .set("Authorization", `Bearer ${token}`);
    expect(testResponse.statusCode).toBe(404);
  });

  it("given disciplines as query parameter return tests by discipline", async () => {
    const userInfo = userFactory.createUserInfo();
    await userFactory.createUser(userInfo);

    const tokenResponse = await supertest(app).post("/sign-in").send(userInfo);
    const { token } = tokenResponse.body;

    const testInfo = testFactory.createTestInfo();
    const createTestResponse = await testFactory.createTest(testInfo, token);
    expect(createTestResponse.statusCode).toBe(201);

    const getTestsResponse = await testFactory.getTestsByQuery(
      "disciplines",
      token
    );
    expect(getTestsResponse.body).not.toBeNull();
    expect(getTestsResponse.statusCode).toBe(200);
  });

  it("given teachers as query parameter return tests by teacher", async () => {
    const userInfo = userFactory.createUserInfo();
    await userFactory.createUser(userInfo);

    const tokenResponse = await supertest(app).post("/sign-in").send(userInfo);
    const { token } = tokenResponse.body;

    const testInfo = testFactory.createTestInfo();
    const createTestResponse = await testFactory.createTest(testInfo, token);
    expect(createTestResponse.statusCode).toBe(201);

    const getTestsResponse = await testFactory.getTestsByQuery(
      "teachers",
      token
    );
    expect(getTestsResponse.body).not.toBeNull();
    expect(getTestsResponse.statusCode).toBe(200);
  });

  it("given empty or wrong query parameter return code 400.", async () => {
    const userInfo = userFactory.createUserInfo();
    await userFactory.createUser(userInfo);

    const tokenResponse = await supertest(app).post("/sign-in").send(userInfo);
    const { token } = tokenResponse.body;

    const testInfo = testFactory.createTestInfo();
    const createTestResponse = await testFactory.createTest(testInfo, token);
    expect(createTestResponse.statusCode).toBe(201);

    const getTestsResponse = await testFactory.getTestsByQuery("", token);
    expect(getTestsResponse.statusCode).toBe(400);
  });
});

afterAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users;`;
  await prisma.$executeRaw`TRUNCATE TABLE tests;`;
  prisma.$disconnect();
});
