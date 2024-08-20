const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userController')
const adminController = require('../Controllers/adminController')
const jwtMiddleware = require('../Middileware/jwtMiddileware')


router.post('/register', userController.userRegister)
router.post('/login', userController.userLogin)
router.put('/update-balance',jwtMiddleware,userController.updateBalance)
router.get('/get-balance',jwtMiddleware,userController.getBalance )
router.get('/all-users',adminController.getAllUsers)
router.delete('/delete-user/:id',adminController.deleteUser)
router.post('/admin-login', adminController.adminLogin)

module.exports = router