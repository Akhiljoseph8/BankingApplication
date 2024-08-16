const users = require('../Models/userModel')

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