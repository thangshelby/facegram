import express from 'express'
import { createStory, getStories,getUsersHaveStory,getUsersStories} from '../controllers/storyController.js'
import { verifyAccessToken } from '../controllers/middlewareControler.js'

const storyRouter= express.Router()

storyRouter.post('/create-story',verifyAccessToken,createStory )
storyRouter.post('/get-stories',verifyAccessToken,getStories)
storyRouter.post('/get-users-have-story',verifyAccessToken,getUsersHaveStory)
storyRouter.post('/get-users-stories',verifyAccessToken,getUsersStories)


export default storyRouter