require('dotenv').config();

const express = require('express'); 
const app = express(); 

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs'); 

const path = require('path'); 

app.set("view engine", "ejs"); 
app.set("views", path.join(__dirname, "views")); 

const userRouter = require('./routes/userRouter.js'); 

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: true}));

const PORT = process.env.PORT || 3000; 

app.get("/", (req, res) => {
    res.render("home");
})

app.use("/users", userRouter); 

app.listen(3000, () => {
    console.log(`Server started on port ${PORT}`); 
})

