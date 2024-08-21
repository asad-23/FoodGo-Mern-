const mongoose = require('mongoose')
require('dotenv').config()

const MONGO_URL = process.env.MONGO_URL


const mongo = () => {
    mongoose.connect(MONGO_URL).then(async() => {
        console.log("MongoDB Connected!")
        
        const foodItems = await mongoose.connection.db.collection('FoodItems').find({}).toArray()
        const foodCategory = await mongoose.connection.db.collection('FoodCategory').find({}).toArray()

        const total = [foodItems, foodCategory]
        global.foodItems = total
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = mongo