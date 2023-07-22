require("dotenv").config()
const mongoose = require("mongoose")

const { MONGO_URI } = process.env

const connectDB = async ()=>{
  try {
    await mongoose.connect(MONGO_URI)
    console.log("MongoDB Connected")
  } catch (error) {
    console.log(error)
  }
}

connectDB()