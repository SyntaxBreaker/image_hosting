require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const imageRouters = require('./routes/imageRoutes');

const app = express();
app.use(cors());

mongoose.connect(process.env.dbURI)
    .then(() => app.listen(3000))
    .catch(err => console.log(err))

app.use('/', imageRouters);