const { Router } = require('express'); 
const { body } = require('express-validator'); 

const messageController = require('../controllers/messageController.js')

const messageRouter = new Router(); 

messageRouter.get('/new-message', messageController.getMessageForm);
messageRouter.post('/new-message', 
    messageController.submitMessageForm); 

module.exports = messageRouter; 