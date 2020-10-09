const express = require('express');
const app = express();
const router = express.Router();

const db = require('./database')

const index = require('./routes/index');
const authRoute = require('./routes/authRoute');

app.use(express.json())

app.use('/', index);
app.use('/', authRoute);
module.exports = app;