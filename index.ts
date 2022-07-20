import app from "./src/app/app.js";
import dotenv from "dotenv";

dotenv.config();

const port = +process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is running on port: ${port}`));
