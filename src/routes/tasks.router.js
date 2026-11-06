import { Router } from "express";
import Task from "../models/task.model.js";

const router = Router();

router.get("/", (req, res) => {
	res.redirect("/");
});

router.post("/", async (req, res) => {
	const { taskTitle } = req.body;

	const task = new Task({
		userId: req.session.user,
		title: taskTitle,
	});

	try {
		const newTask = await task.save();
		res.redirect("/");
	} catch (err) {
		req.body.errorMessage = "";
		res.redirect("/");
	}
});

router.put("/:id", async (req, res) => {
	const _ = req.body.checked;
	// The request body is parsed into a string so I parse it back into a boolean
	if (!["true", "false"].includes(_))
		throw new Error("A boolean value was not passed");
	const checked = _ === "true";

	const task = await Task.findById(req.params.id);
	task.isChecked = checked;
	await task.save();

	const tasks = await Task.find({ userId: req.session.user });
	res.render("partials/taskList", { tasks: tasks });
});

router.delete("/:id", async (req, res) => {
	await Task.findByIdAndDelete(req.params.id).exec();
	const tasks = await Task.find({ userId: req.session.user });
	res.render("partials/taskList", { tasks: tasks });
});

export default router;
