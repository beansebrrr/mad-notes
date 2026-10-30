import express, { Router } from "express";
import Task from "../models/task.model.js";
const router = Router()

router.get("/", function (req, res) {
  res.redirect("/")
})

router.post("/", express.urlencoded({ extended: false }), async function (req, res) {
  const { taskTitle } = req.body
  const task = new Task({
    userId: req.session.user,
    title: taskTitle
  })

  try {
    const newTask = await task.save()
  } catch (err) {
    throw new Error("Error saving new task :(")
  }

  res.redirect("/")
})

export default router;