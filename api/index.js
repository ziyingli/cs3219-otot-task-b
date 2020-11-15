// Import statements
let express = require('express')
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

// Initialize the app
let app = express();

// Import routes
let apiRoutes = require("./api-routes");

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb+srv://ziyingli:ziyingli99@otot-task-b.x079u.mongodb.net/db?retryWrites=true&w=majority&authSource=admin', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Send message for default URL
app.get('/', async (req, res) => {
    res.json({ message: 'Hello World with Express'});
});

// Use Api routes in the App
app.use('/api', apiRoutes);

module.exports = app
