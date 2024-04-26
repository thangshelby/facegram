import express from 'express'
import { signUp,singIn } from '../controllers/authController.js'

const authRouter= express.Router()


authRouter.post('/sign-in',singIn)
authRouter.post('/sign-up',signUp)


export default authRouter


