const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();

const db = require('./database')

const index = require('./routes/index');
const userRoute = require('./routes/userRoute');

app.use(express.json())
app.use(cors())

app.use('/', index);
app.use('/', userRoute);
module.exports = app;