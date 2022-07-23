import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { unauthorizedError } from "../utils/errorUtil.js";
dotenv.config();
var JWT_KEY = process.env.JWT_SECRET;
export default function validateToken(req, res, next) {
    var authorization = req.headers["authorization"];
    var token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Bearer ", "");
    if (!token) {
        throw unauthorizedError("You don't have a token!");
    }
    var user = jwt.verify(token, JWT_KEY, verifyInvalidToken);
    res.locals.user = user;
    next();
}
function verifyInvalidToken(err, decoded) {
    if (err) {
        throw unauthorizedError("Your token is not valid!");
    }
    return decoded;
}
