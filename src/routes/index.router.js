import { Router } from "express";
import Task from "../models/task.model.js";

const router = Router();

router.get(
	"/",
	(req, res, next) => {
		if (req.session.user) {
			next();
		} else {
			next("route");
		}
	},
	async (req, res) => {
		let tasks;
		try {
			tasks = await Task.find({ userId: req.session.user }).exec();
		} catch (err) {
			tasks = [];
		}

		res.render("index", { tasks: tasks });
	},
);

router.get("/", (req, res) => {
	res.redirect("/login");
});

export default router;
