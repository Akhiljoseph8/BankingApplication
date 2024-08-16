const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    balance:{
        type:Number,
        default:0
    },
    history:{
        type:Array,
        default:[]
    }
})

const users = mongoose.model('users', userSchema)
module.exports = users 