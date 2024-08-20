const users = require('../Models/userModel')
const admin = require('../Models/adminModel')
const jwt = require('jsonwebtoken')

exports.getAllUsers = async (req, res) => {
    try {
        const user = await users.find()
        res.status(200).json(user)
    }
    catch (err) {
        console.log(err)
        res.status(404).json(err)
    }
}


exports.deleteUser = async (req, res) => {
    const id=req.params.id
    try {
        const task = await users.findByIdAndDelete({ _id:id })
        res.status(200).json(task)
    }
    catch (err) {
        console.log(err)
        res.status(404).json(err)
    }
}


exports.adminLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const existing = await admin.findOne({ email, password })
        if (existing) {
            const secretKey = "secretkey123"
            const token = jwt.sign({ userId: existing._id }, secretKey)
            res.status(200).json({ token,userId: existing._id })
        } else {
            res.status(406).json("Invalid mail/password")
        }
    }
    catch (err) {
        res.status(404).json(err)
    }
}