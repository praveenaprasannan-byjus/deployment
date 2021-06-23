const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routes = require('./routes');

const port = 5000;
const url = process.env.MONGODB_URL;
const app = express();
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', err => {
    logger.info('Mongoose error', err);
});

db.once('open', async () => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use('/',routes());
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
})


