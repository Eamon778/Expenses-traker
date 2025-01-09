const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const router = require('./routes/router');
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors())
app.use('/api', router);

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(3000, () => {
        console.log(`Server is listening on port: ${process.env.PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start()