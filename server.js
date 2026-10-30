import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import mongoose from "mongoose";
import path from "path";

const __dirname = import.meta.dirname;

if (process.env.NODE_ENV !== "production") {
	dotenv.config();
}

const app = express();

// Set directories
app.set("view engine", "ejs");
app.set("views", __dirname + "/src/views");
app.set("layout", "layouts/layout");
app.use(express.static(path.join(__dirname, "public")));


app.use(expressEjsLayouts);
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {});
const db = mongoose.connection;
db.on("error", (e) => console.error(e));
db.on("open", () => console.log("Database connected"));

app.listen(process.env.PORT || 3000);
