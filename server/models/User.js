const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, unique: true, lowercase: true, trim: true, match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']},
    password: { type: String, required: true},
    totalExpense: {type:Number},
    expenses: [{
        description: { type: String, required: true },
        amount: { type: Number, required: true },
        date: { type: Date, default: Date.now}
    }]
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)