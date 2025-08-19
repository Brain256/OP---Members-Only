const { Router } = require('express'); 
const userController = require('../controllers/userController.js'); 
const { body } = require('express-validator'); 
require('dotenv').config(); 

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

userRouter.get("/member-sign-up", userController.getMemberSignUp);
userRouter.post("/member-sign-up", 
    [
        body("password")
            .trim()
            .custom((value) => {
                return value === process.env.SECRET; 
            }).withMessage("Wrong Password"),
    ],
    userController.submitMemberSignUp); 

userRouter.get("/log-in", userController.getLogIn); 
userRouter.post("/log-in", userController.submitLogIn); 
userRouter.get("/log-out", userController.logOut); 



module.exports = userRouter; 