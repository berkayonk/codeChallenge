/**
 * This class for creating routes and using them.
 *
 * @author  Berkay Önk
 */

const express = require('express');
const app = express();

// In order to use input json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// declare routes
const hintsRoutes = require('./show-hints');
const calculateRoutes = require('./calculate');

// use routes
app.use('/show-hints', hintsRoutes); 
app.use('/calculate', calculateRoutes); 

module.exports = app;