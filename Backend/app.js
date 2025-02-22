const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors');
const register = require('./routes/register')
const login = require('./routes/login')

// middleware functions
app.use(cors());
app.use(express.json());
app.use('/api/register', register);
app.use('/api/login', login)



// connect to my mongo db
mongoose.connect("mongodb://localhost/expense-tracker")
    .then(() => console.log("Connection to mongoose established successfully..."))
    .catch(e => console.log(e.message))


// START OF MY SERVER
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))