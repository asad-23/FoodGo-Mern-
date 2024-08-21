const express = require('express')
const cors = require('cors')
const userSchema = require('../models/userSchema.js')
const router = express.Router();
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const contactSchema = require('../models/contactSchema.js')
require('dotenv').config()


const jwtSecret = process.env.JWT_TOKEN

router.post('/createuser',[body('email', 'Enter valid Email').isEmail(),
    body('name', 'Enter atleast 4 digits name.').isLength({min:4}),
    body('password', 'Password must contain atleast 4 digits').isLength({min:4})],
    async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({error: errors.array()})
        }

        const {name, mobile, email, password} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)
        try {
            const user = new userSchema({name, mobile, email, password:hashPassword});
            await user.save();

            const data = user.id
            const authToken = jwt.sign(data, jwtSecret);

            res.status(200).json({
                success: true,
                token: authToken,
                user
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.errmsg
            })
        }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userSchema.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            });
        }

        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, jwtSecret);

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token: authToken
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

router.post('/contact', async(req, res) => {
    const {name, email, subject, message} = req.body;
    try{
        const contact = new contactSchema({name, email, subject,message})
        await contact.save()
        res.status(200).json({
            success: true,
            message: "Message sent successfully"
        })
    }catch(error){
        console.log(error)
    }
})

module.exports = router