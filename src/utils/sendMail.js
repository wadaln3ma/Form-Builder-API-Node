const nodemailer = require("nodemailer")

const { AUTH_EMAIL, AUTH_PASSWORD, MAIL_HOST, MAIL_PORT } = process.env

let transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
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