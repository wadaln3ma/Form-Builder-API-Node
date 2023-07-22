const mongoose = require("mongoose")
const Schema = mongoose.Schema

const formSchema = new Schema({
  idx : String,
  formTitle: {type: String,require: true, default: 'Untitled'},
  titleColor: {type: String, requied: true, default: "black"},
  questions: [
      {
      questionId: {type: String, requied: true},
      questionTitle: {type: String, requied: true},
      options: [
        option = new Schema({
        type: String,
        id: String,
        value: String,
        name: String,
        })
      ]
    }
  ],
  user_id: {type: String, required: true}
},{timestamps: true})

const FormModel = mongoose.model('Form', formSchema)

module.exports = FormModel