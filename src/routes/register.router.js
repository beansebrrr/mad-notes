import { Router } from "express";
import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js"
const router = Router()

router.get("/", function (req, res) {
  res.render("register/index")
})

router.post("/", express.urlencoded({ extended: false }), async function (req, res) {
  const { username, password } = req.body
  const passwordHash = await bcrypt.hash(password, 10)

  const sameNames = (await User.find({ username: username }).exec())
  if (sameNames.length > 0) {
    throw new Error("Username is unavailable")
  }

  const user = new User({
    username, passwordHash
  })

  try {
    const newUser = user.save()
  } catch (err) {
    console.error(":(")
  }

  res.redirect("/")
})

export default router;