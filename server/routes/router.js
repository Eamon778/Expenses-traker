const express = require('express');
const { addExpenses, getExpenses, updateExpenses, deleteExpenses } = require('../controllers/controller');
const { createUser, loginUser } = require('../controllers/authController')

const router = express.Router();

//auth router for user login and registration
router.route('/auth/login').post(loginUser)
router.route('/auth/register').post(createUser)

//routes for all the expenses
router.route('/users/:id/expenses').get(getExpenses).post(addExpenses)
router.route('/users/:id/expenses/:expenseId').put(updateExpenses).delete(deleteExpenses)

module.exports = router;