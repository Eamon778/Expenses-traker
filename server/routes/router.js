const express = require('express');
const { testData } = require('../controllers/controller');

const router = express.Router();

router.route('/').get(testData);

module.exports = router;