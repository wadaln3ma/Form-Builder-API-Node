require("./utils/db")
const express = require("express")
const userRoutes = require("./routes/userRoutes")
const otpRoutes = require("./routes/otpRoutes")
const formRoutes = require("./routes/formRoutes")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())


//registering routes
app.get("/", (req,res)=>{
  res.status(200).json({msg: "Hello World!"})
})
app.use("/api/users", userRoutes)
app.use("/", otpRoutes)
app.use("/api/form", formRoutes)

module.exports = app