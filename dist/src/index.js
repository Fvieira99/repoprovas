import app from "./app/app.js";
import dotenv from "dotenv";
dotenv.config();
var port = +process.env.PORT || 4000;
app.listen(port, function () { return console.log("Server is running on port: ".concat(port)); });
