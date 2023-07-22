const jwt = require("jsonwebtoken")
const UserModel = require("../models/userModel")

const reqiureAuth = async (req, res, next) =>{
  const { authorization } = req.headers

  if(!authorization){
    return res.status(401).json({msg: "Not Authorized"})
  }

  const token = authorization.split(" ")[1]

  //verifying token
  try {
    const {_id} = jwt.verify(token, process.env.SECRET)

    req.user = await UserModel.findOne({_id}).select('_id')

    next()
  } catch (error) {
    res.status(401).json({msg: "Not Authorized"})
  }
}

module.exports = reqiureAuth