import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
	req.session.user = null;
	req.session.save((err) => {
		if (err) next(err);

		req.session.regenerate((err) => {
			if (err) return next(err);
			res.redirect("/");
		});
	});
});

export default router;
