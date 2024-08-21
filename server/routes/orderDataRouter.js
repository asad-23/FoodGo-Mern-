const express = require('express')
const router = express.Router()
const orderSchema = require('../models/orderSchema.js')


router.post('/orderdata', async(req, res) => {
    let data = req.body.order_data;
    await data.splice(0, 0,{order_date: req.body.order_date})

    let email = await orderSchema.findOne({'email': req.body.email})
    if(!email){
        try {
            await orderSchema.create({
                email: req.body.email,
                order_data: [data],
            }).then(() => {
                res.status(200).json({
                    success: true,
                    message: "Order added successfully"
                })
            });
        } catch (error) {
            console.log(error)
        };
    }else{
        try {
            await orderSchema.findOneAndUpdate({ email: req.body.email }, { $push: { order_data: data } });
            res.status(200).json({ success: true, message: "Order updated successfully" });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
})

module.exports = router