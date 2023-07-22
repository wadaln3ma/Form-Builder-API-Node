const mongoose = require('mongoose')
const FormModel = require('../models/formModel')

//Adding a new Form Document to DB
const createForm = async (req, res)=>{
  const {idx, formTitle, questions} = req.body
  
try {
  const user_id = req.user._id
  const newForm = await FormModel.create({idx, formTitle, questions, user_id})
  res.status(200).json({newForm})
} catch (error) {
  res.status(400).json({msg: error.message})
}
}

//Gettng All Forms Documents
const getAllForms = async (req, res)=>{
  const user_id = req.user._id

  const forms = await FormModel.find({user_id}).sort({createdAt: -1})

  res.status(200).json(forms)
}

//Getting a Single Form Document
const getForm = async (req, res)=>{
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({msg: "No Form Found!"})
  }

  const form = await FormModel.findById(id)

  if(!form){
    return res.status(400).json({msg: "No Form Found!"})
  }

  res.status(200).json(form)
}

//Deleting a form Document
const deleteForm = async (req, res)=>{
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({msg: "No Form Found!"})
  }

  const form = await FormModel.findOneAndDelete({_id: id})

  if(!form){
    return res.status(400).json({msg: "No Form Found!"})
  }

  res.status(200).json(form)
}

//Updating a Form
const updateForm = async (req, res)=>{
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({msg: "No Form Found!"})
  }

  const form = await FormModel.findOneAndUpdate({_id: id}, {...req.body})

  if(!form){
    return res.status(400).json({msg: "No Form Found!"})
  }

  res.status(200).json(form)
}

module.exports = { createForm, getAllForms,getForm, deleteForm, updateForm}