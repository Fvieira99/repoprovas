import { Request, Response } from "express";
import * as userService from "../services/userService.js";
import { CreateUserData } from "../repositories/userRepository.js";

export async function signUp(req: Request, res: Response) {
    const { email, password } = req.body as CreateUserData;
    await userService.signUp({ email, password });
    res.status(201).send("User Created!");
}

export async function signIn(req: Request, res: Response) {
    const data: CreateUserData = req.body;
    const token = await userService.signIn(data);
    res.status(200).send({ token });
}
