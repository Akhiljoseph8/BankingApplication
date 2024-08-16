//to load .env content into process.env
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Router/routes')
require('./Database/connection')
//creating server
const bankingServer = express()

//configuring cors in server
bankingServer.use(cors())
bankingServer.use(express.json())
bankingServer.use(router)

const PORT = 3000

//to run server
bankingServer.listen(PORT, () => {
    console.log(`server is running at:${PORT}`)
})

bankingServer.get('/', (req, res) => {
    res.status(200).send("<h1>The request is hit at server..</h1>")
})