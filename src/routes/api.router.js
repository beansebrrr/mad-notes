import { Router } from "express";
import User from "../models/user.model.js"
import Task from "../models/task.model.js"
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const router = Router()

router.post("/check-password", function (req, res) {
  const { password } = req.body
  if (password.length < 8) {
    res.send("Your password must be 8 characters or longer")
  } else {
    res.send("")
  }
})

router.post("/check-repeat-password", function (req, res) {
  const { password, repeatPassword } = req.body
  if (password !== repeatPassword) {
    res.send("Make sure the passwords match")
  } else {
    res.send("")
  }
})

router.get("/users", async function (req, res) {
  const users = await User.find().select("-passwordHash")
  res.send(users)
})

router.post("/users", async function (req, res) {
  const username = req.body.username.toLowerCase();

  const password = req.body.password;
  const passwordHash = await bcrypt.hash(password, 10);

  const sameNames = await User.find({ username: username }).exec();
  if (sameNames.length > 0) {
    res.send("Username already exists! Please use another one.")
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
})

router.put("/users/:id", async function (req, res) {
  const user = await User.findById(req.params.id)
  user.username = req.body.username || user.username
  await user.save()
  res.send("Updated successfully")
})

router.delete("/users/:id", async function (req, res) {
  await Task.deleteMany({
    userId: new mongoose.Types.ObjectId(req.params.id)
  })
  await User.findByIdAndDelete(req.params.id)
  res.send("Deleted the guy.")
})

export default router