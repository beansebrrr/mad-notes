import bcrypt from "bcryptjs";
import express, { Router } from "express";
import User from "../models/user.model.js";

const router = Router();

router.get("/", (req, res) => {
	if (req.session.user) {
		res.redirect("/");
	} else {
		res.render("register/index");
	}
});

router.post("/", async (req, res) => {
	const username = req.body.username.toLowerCase();

	const password = req.body.password;
	const passwordHash = await bcrypt.hash(password, 10);

	const sameNames = await User.find({ username: username }).exec();
	if (sameNames.length > 0) {
		res.render("register/index", {
			errorMessage: "Username already exists! Please use another one.",
		});
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

		res.redirect("/");
	}
});

export default router;
