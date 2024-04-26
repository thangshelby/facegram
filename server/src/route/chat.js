import express from 'express'
import { findConversation ,sendMessage,findMessagesOfConversation } from '../controllers/chatController.js'
import { verifyAccessToken } from '../controllers/middlewareControler.js'
const chatRouter= express.Router()

chatRouter.post('/',verifyAccessToken,findConversation,findMessagesOfConversation)
chatRouter.post('/send-message',verifyAccessToken,findConversation,sendMessage)

export default chatRouter