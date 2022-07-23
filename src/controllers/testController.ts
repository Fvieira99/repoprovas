import { Request, Response } from "express";
import * as testService from "../services/testService.js";

export async function createTest(req: Request, res: Response) {
    const data: testService.InputTestData = req.body;
    await testService.createTest(data);
    res.status(201).send("Test Created");
}

export async function getTestsByQuery(req: Request, res: Response) {
    const query = req.query.groupBy;

    if (query !== "disciplines" && query !== "teachers") {
        return res.status(400).send("Please send query parameter");
    }
    const tests = await testService.getTestsByQuery(query);
    res.send(tests);
}
