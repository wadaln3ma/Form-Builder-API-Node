const nodemailer = require("nodemailer")

const { AUTH_EMAIL, AUTH_PASSWORD } = process.env

let transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASSWORD
  }
})

transporter.verify((error, success)=>{
  if(error){
    console.error(error)
  }else{
    console.log(success)
  }
})

const sendMail = async (mailOptions)=>{
  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    throw error
  }
}

module.exports = sendMail