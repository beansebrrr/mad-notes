import { Router } from "express";

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

export default router