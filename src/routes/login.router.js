import bcrypt from "bcryptjs";
import express, { Router } from "express";
import User from "../models/user.model.js";

const router = Router();

router.get("/", (req, res) => {
	if (req.session.user) {
		res.redirect("/");
	} else {
		res.render("login/index");
	}
});

router.post("/", async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username: username }).exec();

	if (!user) {
		res.render("login/index", { errorMessage: "Invalid username"})
	} else if ((await bcrypt.compare(password, user.passwordHash)) === false) {
		res.render("login/index", { errorMessage: "You entered the wrong password"})
	} else {
		req.session.regenerate((err) => {
			if (err) next(err);
	
			req.session.user = user._id;
			req.session.save((err) => {
				if (err) return next(err);
				res.redirect("/");
			});
		});
	}
});

export default router;
