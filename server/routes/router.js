const express = require('express');
const { addExpenses, getExpenses, updateExpenses, deleteExpenses } = require('../controllers/controller');
const { createUser, loginUser } = require('../controllers/authController')

const router = express.Router();

//auth router for user login and registration
router.route('/auth/login').post(loginUser)
router.route('/auth/register').post(createUser)

//routes for all the expenses
router.route('/expenses/').get(getExpenses).post(addExpenses).put(updateExpenses).delete(deleteExpenses)

module.exports = router;