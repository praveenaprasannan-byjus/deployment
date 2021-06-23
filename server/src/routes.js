const express = require('express');
const router = express.Router();

const weekOffRoutes = require('./WeekOffCollection/weekOffRoutes');

module.exports = function () {

    router.use('/weekoff',weekOffRoutes());
    return router;
 };