const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})

const admin = mongoose.model('admin', adminSchema)
module.exports = admin 