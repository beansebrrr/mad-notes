import dotenv from "dotenv";
import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import session from "express-session";
import mongoose from "mongoose";
import path from "path";

import indexRouter from "./src/routes/index.router.js";
import loginRouter from "./src/routes/login.router.js";
import logoutRouter from "./src/routes/logout.router.js";
import registerRouter from "./src/routes/register.router.js";
import tasksRouter from "./src/routes/tasks.router.js";

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
app.use("/vendor/htmx", express.static(path.join(__dirname, "node_modules/htmx.org/dist")))

app.use(expressEjsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
	}),
);

mongoose.connect(process.env.MONGODB_URI, {});
const db = mongoose.connection;
db.on("error", (e) => console.error(e));
db.on("open", () => console.log("Database connected"));

// Routes
app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/register", registerRouter);
app.use("/tasks", tasksRouter);
app.listen(process.env.PORT || 3000);
