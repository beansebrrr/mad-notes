import bcrypt from "bcryptjs";
import { Router } from "express";
import mongoose from "mongoose";
import User from "../models/user.model.js";

const router = Router();

router.post("/check-password", (req, res) => {
	const { password } = req.body;
	if (password.length < 8) {
		res.send("Your password must be 8 characters or longer");
	} else {
		res.send("");
	}
});

router.post("/check-repeat-password", (req, res) => {
	const { password, repeatPassword } = req.body;
	if (password !== repeatPassword) {
		res.send("Make sure the passwords match");
	} else {
		res.send("");
	}
});

router.get("/users", async (req, res) => {
	const users = await User.find().select("-passwordHash");
	res.send(users);
});

router.post("/users", async (req, res) => {
	const username = req.body.username.toLowerCase();

	const password = req.body.password;
	const passwordHash = await bcrypt.hash(password, 10);

	const sameNames = await User.find({ username: username }).exec();
	if (sameNames.length > 0) {
		res.send("Username already exists! Please use another one.");
	} else {
		const user = new User({
			username,
			passwordHash,
		});

		try {
			const newUser = user.save();
		} catch (err) {
			console.error(":(");
		}

		res.send("User created successfully");
	}
});

router.put("/users/:id", async (req, res) => {
	const newUsername = req.body.username.toLowerCase();
	if (newUsername === null || newUsername.trim() === "") {
		res.send("Please enter a valid username");
	} else if ((await User.find({ username: newUsername }).exec()).length > 0) {
		res.send("Username already taken");
	}

	const user = await User.findById(req.params.id);
	user.username = newUsername;
	user.save();
	res.send("Updated successfully");
});

router.delete("/users/:id", async (req, res, next) => {
	await User.findByIdAndDelete(req.params.id);
	res.send("Deleted");
});

export default router;
