# MetaMagbetAI PROJECT

## Problem definition

The aim of this project is to develop a front end form application, that will accept user inputs, validate the input, check for errors and handle it smoothly and then return the errors to the Cloud database/ local database

Logic were seperated from the server.js files for easy readability, updates and maintenance

## Implementation

1. I moved sign up logic to the controller: This logic will handle password hashing, validating passwords and will check for existing users. It's  located in controllers/authcontrollers.js

2. Created routes in auth.js: the /signup routelocated in routes/auth.js is linked to signUp function in controller.

3. main server.js, imports and use routes. It's easy to manage.

### Importance

  *Logic/routes are seperated making the code easy to read and understand
 *The server.js focus on setting the server and middleware
  *signUp function can be reused any where.
  
### future use

  !!! More upgrades or routes for login, password, resets other inputs / logics can be added into the authcontrollers.js function and routes created in auth.js.

### New skills acquired  

In researching for this project I came across new application and frameworks I haven't used before, it is an exciting journey for me and I hope to master these new skills as I practice more and utilize them in my code for efficiency and easy coding.  

MongoDB
Node.js
express
PostMan
.jsos
Nodemon
npm
dotenv
.gitignore
Git and GitHub and others.

### RESULT

The code works as expected, it accepts user data, validate it, check for errors, hash the password for security and securely saved them to my MongoDB data base.


### Resources

Special thanks:

Dr Emeka.  
Google.  
stack-overflow.  
Youtube: {
    Patience Coder,
    Code king,  
    Net ninja
}  
