import { Router } from "express";
import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js"

const router = Router()

router.get("/", function (req, res) {
  res.render("login/index")
})

router.post("/", express.urlencoded({ extended: false }), async function (req, res) {
  const { username, password } = req.body

  const user = await User.findOne({ username: username }).exec()
  if (!user) {
    throw new Error("User is not found")
  } else if (await bcrypt.compare(password, user.passwordHash) === false) {
    throw new Error("Wrong password")
  }
  
  req.session.regenerate(function (err) {
    if (err) next(err)

    req.session.user = user._id

    req.session.save(function (err) {
      if (err) return next(err)
      res.redirect("/")
    })
  })

})

export default router;