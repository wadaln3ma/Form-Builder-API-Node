require("dotenv").config()
const mongoose = require("mongoose")

const app = require("./app")

const { PORT, MONGO_URI } = process.env

const startServer = ()=>{
  app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
  })
}

const connectDB = async ()=>{
  try {
    await mongoose.connect(MONGO_URI)
    console.log("MongoDB Connected")
    startServer()
  } catch (error) {
    console.log(error)
  }
}

connectDB()

