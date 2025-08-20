const { createMsg } = require('../db/queries.js'); 

exports.getMessageForm = (req, res) => {
    res.render('message-form'); 
}

exports.submitMessageForm = async (req, res) => {
    const { title, text } = req.body; 
    const id = req.user.id; 
    await createMsg(id, title, text); 

    res.redirect('/'); 
}