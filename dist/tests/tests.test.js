var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import supertest from "supertest";
import prisma from "../src/config/database.js";
import * as userFactory from "./factories/userFactory.js";
import * as testFactory from "./factories/testFactory.js";
import app from "../src/app/app.js";
beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$executeRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["TRUNCATE TABLE users;"], ["TRUNCATE TABLE users;"])))];
            case 1:
                _a.sent();
                return [4 /*yield*/, prisma.$executeRaw(templateObject_2 || (templateObject_2 = __makeTemplateObject(["TRUNCATE TABLE tests;"], ["TRUNCATE TABLE tests;"])))];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
describe("Running tests test suit", function () {
    it("given correct test info create new test and return code 201", function () { return __awaiter(void 0, void 0, void 0, function () {
        var userInfo, tokenResponse, token, testInfo, createTestResponse, createdTest;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userInfo = userFactory.createUserInfo();
                    return [4 /*yield*/, userFactory.createUser(userInfo)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, supertest(app).post("/sign-in").send(userInfo)];
                case 2:
                    tokenResponse = _a.sent();
                    token = tokenResponse.body.token;
                    testInfo = testFactory.createTestInfo();
                    return [4 /*yield*/, testFactory.createTest(testInfo, token)];
                case 3:
                    createTestResponse = _a.sent();
                    expect(createTestResponse.statusCode).toBe(201);
                    return [4 /*yield*/, prisma.test.findFirst({
                            where: {
                                name: testInfo.name
                            }
                        })];
                case 4:
                    createdTest = _a.sent();
                    expect(createdTest).not.toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    it("given nonexistent categoryId return code 404 on test creation", function () { return __awaiter(void 0, void 0, void 0, function () {
        var userInfo, tokenResponse, token, wrongCategoryId, testInfo, createTestResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userInfo = userFactory.createUserInfo();
                    return [4 /*yield*/, userFactory.createUser(userInfo)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, supertest(app).post("/sign-in").send(userInfo)];
                case 2:
                    tokenResponse = _a.sent();
                    token = tokenResponse.body.token;
                    wrongCategoryId = 4;
                    testInfo = testFactory.createTestInfo(wrongCategoryId);
                    return [4 /*yield*/, testFactory.createTest(testInfo, token)];
                case 3:
                    createTestResponse = _a.sent();
                    expect(createTestResponse.statusCode).toBe(404);
                    return [2 /*return*/];
            }
        });
    }); });
    it("given wrong or nonexistent teacherId return code 404 on test creation", function () { return __awaiter(void 0, void 0, void 0, function () {
        var userInfo, tokenResponse, token, wrongTeacherId, testInfo, createTestResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userInfo = userFactory.createUserInfo();
                    return [4 /*yield*/, userFactory.createUser(userInfo)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, supertest(app).post("/sign-in").send(userInfo)];
                case 2:
                    tokenResponse = _a.sent();
                    token = tokenResponse.body.token;
                    wrongTeacherId = 2;
                    testInfo = testFactory.createTestInfo(undefined, wrongTeacherId, undefined);
                    return [4 /*yield*/, testFactory.createTest(testInfo, token)];
                case 3:
                    createTestResponse = _a.sent();
                    expect(createTestResponse.statusCode).toBe(404);
                    return [2 /*return*/];
            }
        });
    }); });
    it("given wrong or nonexistent disciplineId return code 404 on test creation", function () { return __awaiter(void 0, void 0, void 0, function () {
        var userInfo, tokenResponse, token, wrongDisciplineId, testInfo, testResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userInfo = userFactory.createUserInfo();
                    return [4 /*yield*/, userFactory.createUser(userInfo)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, supertest(app).post("/sign-in").send(userInfo)];
                case 2:
                    tokenResponse = _a.sent();
                    token = tokenResponse.body.token;
                    wrongDisciplineId = 4;
                    testInfo = testFactory.createTestInfo(undefined, undefined, wrongDisciplineId);
                    return [4 /*yield*/, supertest(app)
                            .post("/tests")
                            .send(testInfo)
                            .set("Authorization", "Bearer ".concat(token))];
                case 3:
                    testResponse = _a.sent();
                    expect(testResponse.statusCode).toBe(404);
                    return [2 /*return*/];
            }
        });
    }); });
    it("given disciplines as query parameter return tests by discipline", function () { return __awaiter(void 0, void 0, void 0, function () {
        var userInfo, tokenResponse, token, testInfo, createTestResponse, getTestsResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userInfo = userFactory.createUserInfo();
                    return [4 /*yield*/, userFactory.createUser(userInfo)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, supertest(app).post("/sign-in").send(userInfo)];
                case 2:
                    tokenResponse = _a.sent();
                    token = tokenResponse.body.token;
                    testInfo = testFactory.createTestInfo();
                    return [4 /*yield*/, testFactory.createTest(testInfo, token)];
                case 3:
                    createTestResponse = _a.sent();
                    expect(createTestResponse.statusCode).toBe(201);
                    return [4 /*yield*/, testFactory.getTestsByQuery("disciplines", token)];
                case 4:
                    getTestsResponse = _a.sent();
                    expect(getTestsResponse.body).not.toBeNull();
                    expect(getTestsResponse.statusCode).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it("given teachers as query parameter return tests by teacher", function () { return __awaiter(void 0, void 0, void 0, function () {
        var userInfo, tokenResponse, token, testInfo, createTestResponse, getTestsResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userInfo = userFactory.createUserInfo();
                    return [4 /*yield*/, userFactory.createUser(userInfo)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, supertest(app).post("/sign-in").send(userInfo)];
                case 2:
                    tokenResponse = _a.sent();
                    token = tokenResponse.body.token;
                    testInfo = testFactory.createTestInfo();
                    return [4 /*yield*/, testFactory.createTest(testInfo, token)];
                case 3:
                    createTestResponse = _a.sent();
                    expect(createTestResponse.statusCode).toBe(201);
                    return [4 /*yield*/, testFactory.getTestsByQuery("teachers", token)];
                case 4:
                    getTestsResponse = _a.sent();
                    expect(getTestsResponse.body).not.toBeNull();
                    expect(getTestsResponse.statusCode).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it("given empty or wrong query parameter return code 400.", function () { return __awaiter(void 0, void 0, void 0, function () {
        var userInfo, tokenResponse, token, testInfo, createTestResponse, getTestsResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userInfo = userFactory.createUserInfo();
                    return [4 /*yield*/, userFactory.createUser(userInfo)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, supertest(app).post("/sign-in").send(userInfo)];
                case 2:
                    tokenResponse = _a.sent();
                    token = tokenResponse.body.token;
                    testInfo = testFactory.createTestInfo();
                    return [4 /*yield*/, testFactory.createTest(testInfo, token)];
                case 3:
                    createTestResponse = _a.sent();
                    expect(createTestResponse.statusCode).toBe(201);
                    return [4 /*yield*/, testFactory.getTestsByQuery("", token)];
                case 4:
                    getTestsResponse = _a.sent();
                    expect(getTestsResponse.statusCode).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
});
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$executeRaw(templateObject_3 || (templateObject_3 = __makeTemplateObject(["TRUNCATE TABLE users;"], ["TRUNCATE TABLE users;"])))];
            case 1:
                _a.sent();
                return [4 /*yield*/, prisma.$executeRaw(templateObject_4 || (templateObject_4 = __makeTemplateObject(["TRUNCATE TABLE tests;"], ["TRUNCATE TABLE tests;"])))];
            case 2:
                _a.sent();
                prisma.$disconnect();
                return [2 /*return*/];
        }
    });
}); });
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
