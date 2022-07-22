import supertest from "supertest";
import prisma from "../src/config/database.js";
import * as userFactory from "./factories/userFactory.js";
import app from "../src/app/app.js";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users;`;
});

describe("User tests suit", () => {
  it("given email and password create new user and return code 201", async () => {
    const userInfo = userFactory.createUserInfo();
    const response = await supertest(app).post("/sign-up").send(userInfo);
    expect(response.statusCode).toBe(201);

    const user = await userFactory.findUserByEmail(userInfo.email);
    expect(user).not.toBeNull();
  });

  it("given correct email and password return token and code 200", async () => {
    const userInfo = userFactory.createUserInfo();
    await userFactory.createUser(userInfo);

    const response = await supertest(app).post("/sign-in").send(userInfo);
    const { token } = response.body;
    expect(token).not.toBeNull();
    expect(response.statusCode).toBe(200);
  });

  it("given incorrect password on signin return code 401", async () => {
    const userInfo = userFactory.createUserInfo();
    await userFactory.createUser(userInfo);

    const response = await supertest(app)
      .post("/sign-in")
      .send({ ...userInfo, password: "wrongpassword" });
    expect(response.statusCode).toBe(401);
    expect(response.body.token).toBeUndefined();
  });

  it("given incorrect email on signin return code 401", async () => {
    const userInfo = userFactory.createUserInfo();
    await userFactory.createUser(userInfo);

    const response = await supertest(app)
      .post("/sign-in")
      .send({ ...userInfo, email: "wrong@email.com" });
    expect(response.statusCode).toBe(401);
    expect(response.body.token).toBeUndefined();
  });
});

afterAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users;`;
  prisma.$disconnect();
});
