const User = require('../models/User')
const bcrypt = require('bcrypt')

const createUser = async (req, res) => {
    try {
        const {name, email, password} = req.body

        if (!name || !email || !password){
            return res.status(400).json({success: false, message: 'All Fields are required'})
        }

        const existingUser = await User.findOne({ email })
        if(existingUser){
            return res.status(400).json({success: false, message: 'This email is alread exists'})
        }

        const bcrPass = await bcrypt.hash(password, 10)

        const newUser = new User({name, email, password: bcrPass})
        await newUser.save()

        const {password: _, ...safeUser} = newUser.toObject()
        res.status(200).json({success: true, message: 'User Registred successfully', data: safeUser})
    } catch (err) {
        res.status(500).json({success: false, message: 'Internal Server Error'})
        console.log(err);
        
    }
}

const loginUser = async (req, res) =>{
    try {
        const {email, password} = req.body

        const user = await User.findOne({ email})
        if(!user){
            return res.status(404).json({success: false, message: "Can't find user with this email"})
        }

        const isMatched = await bcrypt.compare(password, user.password)
        if(!isMatched){
            return res.status(400).json({success: false, message: 'Invalid password'})
        }

        const {password: _, ...safeUser} = user.toObject()
        res.status(200).json({success: true, message: 'Login successfully', data: safeUser})
    } catch (err){
        res.status(500).josn({success: false, message: 'Interval Server Error'})
        console.log(err);
        
    }
}

module.exports = { createUser, loginUser }