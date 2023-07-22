const express = require("express")
const { createForm, getAllForms, getForm, deleteForm, updateForm } = require("../controllers/fromController")
const reqiureAuth = require("../middlewares/requireAuth")

const router = express.Router()

router.use(reqiureAuth)

router.post('/add', createForm)

router.get('/all', getAllForms)

router.get('/:id', getForm)

router.delete('/:id', deleteForm)

router.patch('/:id', updateForm)

module.exports = router