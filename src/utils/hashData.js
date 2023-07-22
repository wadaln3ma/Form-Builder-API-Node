const bcrypt = require("bcrypt")

const hashData = async (data, saltRounds=10)=>{
  try {
    const salt = await bcrypt.genSalt(saltRounds)
    const hashed = await bcrypt.hash(data, salt)
    return hashed
  } catch (error) {
    throw error
  }
}

module.exports = hashData