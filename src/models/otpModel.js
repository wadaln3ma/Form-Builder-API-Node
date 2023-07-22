const mongoose = require("mongoose")
const Schema = mongoose.Schema

const otpSchema = new Schema({
  email : {type: String, unique: true},
  otp: String,
  createdAt: Date,
  expiresAt: Date
})

const OTP = mongoose.model("OTP", otpSchema)

module.exports = OTP