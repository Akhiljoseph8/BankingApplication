const users = require('../Models/userModel')
const jwt = require('jsonwebtoken')


exports.userRegister = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json("User already exist")
        } else {
            const newUser = new users({
                username, password, email
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch (err) {
        console.log(err)
        res.status(404).json(err)
    }
}

exports.userLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await users.findOne({ email, password })
        if (existingUser) {
            const secretKey = "secretkey123"
            const token = jwt.sign({ userId: existingUser._id }, secretKey)

            res.status(200).json({ token, user: existingUser.username, userId: existingUser._id })
        } else {
            res.status(406).json("Invalid mail/password")
        }
    }
    catch (err) {
        res.status(404).json(err)
    }
}

exports.updateBalance = async (req, res) => {
    const {balance,history} = req.body
    const userId = req.payload
    console.log(history)
    try {
        const updateData = ({
            balance: balance
        })
        const t = await users.findByIdAndUpdate(userId, updateData)
        const h= await users.updateOne({_id:userId},{$push: {history:history}})
        res.status(200).json(t)
    }
    catch (err) {
        res.status(404).json(err)
    }
}

exports.getBalance = async (req, res) => {
    const userId = req.payload
    try {
        const balance = await users.findById(userId)
        res.status(200).json(balance)
    }
    catch (err) {
        console.log(err)
        res.status(404).json(err)
    }
}