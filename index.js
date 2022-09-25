const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser")
const mongoose = require('mongoose');
const apiRoutes = require('./routes/apiRoutes');
const cookieParser = require('cookie-parser')
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;

const app = express();
app.use(cookieParser())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/users', apiRoutes);


mongoose.connect(mongoUri, { useNewUrlParser: 
    true}
    ).catch(error => console.log("Error connecting to MongoDB: " + error))

mongoose.connection.once('open', () => console.log('Connected successfully to MongoDB'))

app.get('/', (req, res) => {
    res.json({
        message: "Hello to API"
    });
});

app.listen(PORT, () => {
    console.log("Server started on port " + PORT)
})
