// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user.js');  // Adjust the path based on where your user model is located
const router = express.Router();  // Create a new router

// Sign-Up Endpoint
router.post('/signup', async (req, res) => {
  const { username, email, password, confirmpassword } = req.body;

  // Log request data for debugging (disable this in production)
  console.log('Received data:', req.body);  

  // Check if passwords match
  if (password !== confirmpassword) {
    return res.status(400).json({ message: "Passwords do not match!" });
  }

  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save new user to the database
    await newUser.save();
    console.log('New Registration:', newUser);

    // Send success response
    res.status(201).json({ message: 'User registered successfully!' });

  } catch (error) {
    // Handle any unexpected errors
    console.error(error);
    res.status(500).json({ message: 'Error registering user.' });
  }
});

module.exports = router;  // Export the router
