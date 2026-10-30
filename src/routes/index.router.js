import { Router } from "express";

const router = Router();

router.get("/",
  function (req, res, next) {

    if (req.session.user) {
      next()
    } else {
      next("route")
    }
  },
  function (req, res) {
    res.render("index");
  }
)

router.get("/", function (req, res) {
  res.redirect("/login")
})

export default router;
