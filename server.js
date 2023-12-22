/* eslint-disable quotes */
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { xss } from "express-xss-sanitizer";
import { configDotenv } from "dotenv";

configDotenv();
const app = express();
const PORT = process.env.PORT || 11010;
const HOST = process.env.HOST || "0.0.0.0";
const __dirname = path.resolve(path.dirname(''));
const dir = path.join(__dirname, "/build/");

app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.json({ limit: "2kb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "2kb" }));
app.use(xss());

app.get("*", (req, res) => {
    res.sendFile(path.join(dir, "index.html"));
});
app.listen(PORT, () => {
    console.log(`The app runs on ${HOST}:${PORT}`);
});