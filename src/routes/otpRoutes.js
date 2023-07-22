const express = require("express")
const { sendOTP, verifyOTP, verifyMail } = require("../controllers/otpController")
const router = express.Router()

router.post("/api/auth/otp", async (req, res)=>{
  try {
    const {email, subject, message, duration} = req.body

    const createdOTP = await sendOTP(
      email, subject, message, duration
    )

    res.status(200).json(createdOTP)
  } catch (error) {
   return res.status(400).json({msg: error.message}) 
  }
})

router.post("/api/auth/otp/verify", async (req,res)=>{
  try {
    const {email, otp} = req.body

    const isValidOTP = await verifyOTP(email, otp)
    res.status(200).json({ isValidOTP})
  } catch (error) {
    return res.status(400).send({msg: error.message})
  }
})

router.post("/api/auth/otp/verifyMail", async (req,res)=>{
  try {
    const {email, otp} = req.body

    const isValidOTP = await verifyMail(email, otp)
    res.status(200).json({ email, msg :"verified successfully"})
  } catch (error) {
    res.status(400).send({msg : error.message})
    return
  }
})

module.exports = router