import { Router } from "express";
import User from "../models/user.model.js";

const router = Router();

router.get(
	"/",
	async (req, res, next) => {
		if (await User.findById(req.session.user).exec()) {
			next();
		} else {
			next("route");
		}
	},
	async (req, res) => {
		res.render("index");
	},
);

router.get("/", (req, res) => {
	res.redirect("/login");
});

router.get("/profile", async (req, res) => {
	if (!(await User.findById(req.session.user).exec())) res.redirect("/");
	const user = await User.findById(req.session.user).exec();
	res.render("profile/index", { user: user });
});

export default router;
