const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const app = express();

// middleware to parse incoming form data 
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json());

//serve the static files
app.use(express.static(path.join(__dirname, 'public')));

//CORS MIDDLEWAREV(GLOBAL)

app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*'),
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next()
})


//connection to mongo database

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('DATABASE HAS BEEN CONNECTED SUCCESFULLY')) 
.catch((err) => console.log(err, 'MONGO DATABASE CONNECTION FAILED!!!!'));

//import tser model
const newUser = require('./models/user');

//het login data from public
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
  });


//Handle GET request to fetch data from public folder
app.get('/', (req, res,) => {
    return res.sendFile(path.join(__dirname, 'public', 'signup.html'))
});


//Handle POST request to save sata to mongo database

app.post('/submit', async (req, res) => {
  try {

    const { username, email, password } = req.body

 if (!username || !email || !password) {
    console.log('All fields are required'); 
    return res.status(400).send('All fields are required');
}
const existingUser = await newUser.findOne({ username });
        if (existingUser) {
            console.log('Username is already taken');
            return res.status(400).send('Username is already taken');
        }

const hashedpassword = await bcrypt.hash(password, 10);

const user = new newUser({ username, email, password: hashedpassword });

await user.save();

console.log('USER DATA DON SAVED TO DATABASE');
console.log('New Registration:', user);
//res.send('User data has been submited to MetaMagnetAI database'); 

  
  } catch (error) {
    console.error('ERROR SAVING USER TO MetaMagbetAI DATABASE', error.message);
    res.status(500).send('ERROR SAVING USER TO MetaMagnetAI DATABASE');
  }
 });




//handle login route

app.post('/login', async (req, res) => {

try {
    const { username, password } = req.body;

//make sure all inputs are filled 
/* if (!username || !password) {
    return res.status(400).send('username and password are required');
} */

//search for user in the database

const userRecord = await newUser.findOne({username});
if ( !userRecord)
{ console.log(req.body);  // To check what is being sent

    return res.status(400).send('User not found');
}


// compare password with hashkey
const isMatch = await bcrypt.compare(password, userRecord.password);

if (isMatch) {
  console.log('Login successful!');

  res.send('Welcome! You have successfully logged in.');
} else {
  console.log('Incorrect password');

  res.status(400).send('Incorrect password');
}

} catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).send('Error during login');
}


});


// start server

const server = app.listen(PORT, () => {
    console.log(`Ears so wide open on port ${PORT}`);
});

//Handle server errors

server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`${PORT} is actively used by ME!!`);
        process.exit(1);
    }
});