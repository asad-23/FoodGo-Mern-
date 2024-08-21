const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

router.post('/displaydata', (req, res) => {
    try {
        res.send(global.foodItems)
    } catch (error) {
        console.log(error)
    }
})


router.post('/orderdatalist', async(req, res) => {
    const email = req.body.email;
    try{
        const foodOrders = await mongoose.connection.db.collection('orders').find({}).toArray()
        const data = await foodOrders.filter(item => item.email === email)
        res.send(data)
    }catch(error){
        console.log(error)
    }
})

module.exports = router