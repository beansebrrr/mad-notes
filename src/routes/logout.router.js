import { Router } from "express";

const router = Router()

router.get("/", function (req, res) {
  req.session.user = null
  req.session.save(function (err) {
    if (err) next(err)

    req.session.regenerate(function (err) {
      if (err) return next(err);
      res.redirect("/")
    })
  })
})



export default router;