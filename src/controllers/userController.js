const validator = require("validator")
const UserModel = require("../models/userModel")
const hashData = require("../utils/hashData")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { sendOTP } = require("./otpController")

const signToken = (id) => jwt.sign({_id: id}, process.env.SECRET, { expiresIn: "2d"})

const registerUser = async (req,res)=>{
  const {name, email, password} = req.body

  //validating user input
  if(!name || !email || !password){
    res.status(400).json({msg: "All filds must be filled"})
    return
  }

  if(!validator.isEmail(email)){
    res.status(400).json({msg: "Not a valid Email"})
    return
  }

  if(!validator.isStrongPassword(password)){
    res.status(400).json({msg: "Please Enter a Strong Password!"})
    return
  }

  //checking if user email allready exits in the database
  const exists = await UserModel.findOne({email})

  if(exists){
    res.status(400).json({msg: "Email Allready in use"})
    return
  }
  
  try{
    const hashedPassword = await hashData(password)
    const savedUser = await UserModel.create({name, email, password: hashedPassword})
    const token = signToken(savedUser._id)
    //sending otp verification email
    const subject = "Email Verification"
    const verMessage = "Please verify Your Email with the PIN below"
    await sendOTP(email, subject, verMessage)
    res.status(200).json({msg: "registration successful"})
  }catch(error){
    res.status(400).json({msg: error.message})
  }
}

const loginUser = async (req,res)=>{
  const { email, password } = req.body
  if(!email || !password){
    res.status(400).json({msg: "All filds must be filled"})
    return
  }

  const user = await UserModel.findOne({email})

  if(!user){
    res.status(400).json({msg: "Invalid Credentials"})
    return
  }

  const verified = user.verified
  if(!verified){
    const subject = "Email Verification"
    const verMessage = "Please verify Your Email with the PIN below"
    await sendOTP(email, subject, verMessage)
    return res.status(400).json({msg: "Please verify your email, Check your inbox"})
  }

  const match = await bcrypt.compare(password, user.password)

  if(!match){
    res.status(400).json({msg: "Invalid Credentials"})
    return
  }

  const token = signToken(user._id)

  const name = user.name

  res.status(200).json({email,name, token})

}

module.exports = {registerUser, loginUser}