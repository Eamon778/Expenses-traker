const User = require('../models/User')

const addExpenses = async (req, res) => {
    try {
        const { id } = req.params
        const {description, amount, date} = req.body

        if (!description || !amount) {
            return res.status(400).json({success: false, message: 'Description and amount are required'})
        }

        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({success: false, message: 'User not found'})
        }

        const newExpense = {description, amount, date}
        user.expenses.push(newExpense)
        await user.save()

        res.status(200).json({success: true, message: 'Expense added successfully'})
    } catch (err){
        console.log(err);
        res.status(500).json({success: false, message: 'Internal server error'})
    }
}

const getExpenses = async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id)
        if(!user) {
            return res.status(404).json({success: false, message: 'User not found'})
        }
        
        res.status(200).json({success: true, data: user.expenses})
    } catch (err){
        console.log(err)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
}

const updateExpenses = async (req, res) => {
    try {
        const { id, expensesId } = req.params
        const user = await User.findById(id)
        if(!user) {
            return res.status(404).json({success: false, message: 'User not found'})
        }

        const expense = await User.findById(expensesId)
        if(!expense) {
            return res.status(404).json({success: false, message: 'Expense not found'})
        }

        if (description !== undefined) expense.description = description;
        if (amount !== undefined) expense.amount = amount;
        if (date !== undefined) expense.date = date;
        await user.save()

        return res.status(200).json({success: true, message: 'Expense updated successfully'})
    } catch (err) {
        console.log(err)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
}

const deleteExpenses = async (req, res) => {
    try {
        const { id, expensesId } = req.params
        const user = await User.findById(id)
        if(!user) {
            return res.status(404).json({success: false, message: 'User not found'})
        }

        const expense = await User.findById(expensesId)
        if(!expense) {
            return res.status(404).json({success: false, message: 'Expense not found'})
        }

        expense.remove()
        await user.save()
        res.status(200).json({success: true, message: "Expense deleted successfully"})
    } catch (err) {
        console.log(err)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
}

module.exports = { addExpenses, getExpenses, updateExpenses, deleteExpenses };