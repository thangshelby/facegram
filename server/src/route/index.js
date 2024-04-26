import authRouter  from "./auth.js"
import postRouter from './post.js'
import userRouter from './user.js'
import chatRouter from "./chat.js"
import commentRouter from "./comment.js"
import storyRouter from "./story.js"
const route=(app)=>{
    app.use('/post',postRouter)
    app.use('/auth',authRouter)
    app.use('/user',userRouter)
    app.use('/chat',chatRouter)
    app.use('/comment',commentRouter)
    app.use('/story',storyRouter)
} 


export default route