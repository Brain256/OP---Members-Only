const { Router } = require('express'); 
const userController = require('../controllers/userController.js'); 
const { body } = require('express-validator'); 

const userRouter = new Router(); 

userRouter.get("/sign-up", userController.getSignUp); 
userRouter.post("/sign-up", 
    [
        body("firstname").trim().escape(),
        body("lastname").trim().escape(),
        body("username").trim().escape(), 
        body("password").trim(),
        body("confirm-pass").custom((value, { req }) => {
            return value === req.body.password; 
        }).withMessage("must match password")
    ],
    userController.submitSignUp
); 

module.exports = userRouter; 