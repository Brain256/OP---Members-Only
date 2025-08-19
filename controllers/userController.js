const { createUser, changeStatus } = require('../db/queries.js'); 
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs"); 
const passport = require('passport'); 

exports.getSignUp = (req, res) => {
    res.render("sign-up", { errors: null }); 
}

exports.getMemberSignUp = (req, res) => {
    res.render("member-sign-up", { errors: null }); 
}

exports.getLogIn = (req, res) => {
    res.render("log-in"); 
}

exports.submitSignUp = async (req, res) => {

    const errors = validationResult(req); 

    if (!errors.isEmpty()) {

        return res.status(400).render("sign-up", { 
        errors: errors.array()
        });
    }

    const {firstname, lastname, username, password} = req.body; 

    const hashedPassword = await bcrypt.hash(password, 10); 

    const result = await createUser(firstname, lastname, username, hashedPassword); 
    const user = result.rows[0]; 

    req.login(user, () => {
        res.redirect('/'); 
    })
}

exports.submitMemberSignUp = async (req, res) => {
    const errors = validationResult(req); 

    if (!errors.isEmpty()) {

        return res.status(400).render("member-sign-up", { 
        errors: errors.array()
        });
    }

    await changeStatus(req.user.username); 

    res.redirect('/'); 

}

exports.submitLogIn = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/log-in"
})

exports.logOut = (req, res) => {
    req.logout((err) => {
        if(err) {
            return next(err); 
        }
        res.redirect("/"); 
    })
}

