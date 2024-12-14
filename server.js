
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();  // To load environment variables from the .env file

const app = express();
const PORT = process.env.PORT ||  3000;

// Middleware to pass incoming form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve the static form HTML
/* app.use(express.static(path.join(__dirname, 'public'))); */
app.use(express.static('public'));


// CORS Middleware (Global) allow cross-origin requests
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

// MongoDB Connection
/* mongoose.connect('mongodb://localhost:27017/metamagnet', { useNewUrlParser: true, useUnifiedTopology: true }); */

mongoose.connect(process.env.MONGODB_ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err));


//import user model
const User = require('./models/user');

// Sign-Up Endpoint
app.post('/signup', async (req, res) => {

  const { username, email, password, confirmpassword } = req.body;

if (password !== confirmpassword) {
  return res.status(400).json({ message: "Passwords do not match!" });
}
  try {
    const hashedpassword = await bcrypt.hash(password, 10);


    //create a user object
    const newUser = new User({
      username,
      email,
      password: hashedpassword,
    });

    //save new user to database
    await newUser.save();
    console.log('New Registration:', newUser)

    res.status(201).json({ message: 'User registered successfully!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user.' });
  }
});


//get route to serve the form
/* app.get('/', (req, res) => {
  return   res.sendFile(path.join(__dirname, 'signup.html'));
  }); */

// Start server
const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
  
  // Handle server errors
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error('Port 3990 is already in use. Please use a different port.');
        process.exit(1);
    }
  });

