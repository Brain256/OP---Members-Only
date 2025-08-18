const { createUser } = require('../db/queries.js'); 
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs"); 

exports.getSignUp = (req, res) => {
    res.render("sign-up", { errors: null }); 
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

    await createUser(firstname, lastname, username, hashedPassword); 

    res.redirect('/'); 
}