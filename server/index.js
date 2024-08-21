const express = require('express')
const mongo  = require('./DB_connect.js')
const router = require('./routes/userRouter.js')
const cors = require('cors')

require('dotenv').config()


mongo() // Connecting to MongoDB

const port = process.env.PORT
const app = express()
app.use(express.json())

// app.use(cors())

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))


  
app.use('/api', router)
app.use('/api', require('./routes/displayRoute.js'))
app.use('/api', require('./routes/orderDataRouter.js'))

app.use((req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is up and running"
    })
})

app.listen(port, () => console.log(`Server running on port ${port}`))