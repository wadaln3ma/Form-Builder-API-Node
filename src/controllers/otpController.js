const OTP = require("../models/otpModel")
const userModel = require("../models/userModel")
const generateOTP = require("../utils/generateOTP")
const sendMail = require("../utils/sendMail")
const hashData = require("../utils/hashData")
const bcrypt = require("bcrypt")

const { AUTH_MAIL } = process.env

const sendOTP = async (email, subject, message, duration = 3) =>{
  try {
    if(!(email && subject && message)){
      throw Error("Provide Values for Emial")
    }
    
    await OTP.deleteOne({ email})

    const generatedOTP = await generateOTP()

    const mailOptions = {
      from : AUTH_MAIL,
      to: email,
      subject,
      html: `<p>${message}</p>
      <p style="color:tomato;font-size:25px;letter-spacing:2px;"><b>${generatedOTP}</b></p>
      <p>This code <b>expires in ${duration} minutes</b>.</p>`
    }

    await sendMail(mailOptions)

    const hashedOTP = await hashData(generatedOTP)

    const newOtp = new OTP({
      email,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 60* +duration,
    })

    const savedOTP = await newOtp.save()

  return savedOTP

  } catch (error) {
   throw error
  }
}

const verifyOTP = async (email, otp)=>{
  try {
    if(!(email && otp)){
      throw Error("Provide mail and otp values")
    }

    const matchOTP = await OTP.findOne({email})

    if(!matchOTP){
      throw Error("No otp record found")
    }

    const {expiresAt} = matchOTP
    if(expiresAt < Date.now()){
      await OTP.deleteOne({ email})
      throw Error("Code has expired. Request a new one.")
    }
    const hashedOTP = matchOTP.otp
    
    const match = await bcrypt.compare(otp, hashedOTP)

    return match
  } catch (error) {
    throw error
  }
}

const verifyMail = async (email, otp)=>{
  try {
    if(!(email && otp)){
      throw Error("Provide mail and otp values")
    }

    const validOTP = await verifyOTP(email, otp)

    if(!validOTP){
      throw Error("Invalid code, please check your inbox")
    }

      await userModel.updateOne({email}, {verified: true})
      await OTP.deleteOne({ email})

    return validOTP
  } catch (error) {
    throw error
  }
}

const deleteOTP = async (email)=>{
  try {
    await OTP.deleteOne({ email })
  } catch (error) {
    throw error
  }
}

module.exports = {sendOTP, deleteOTP, verifyOTP, verifyMail}