import { usersProps ,postProps} from "../types"


export const currentUserSelector= (state:{user:{currentUser:usersProps,status:string}})=>state.user.currentUser
export const allUsersSelector= (state:{user:{allUsers:{ [key: string]: usersProps },status:string}})=>state.user.allUsers
export const currentProfileSelector= (state:{user:{currentProfile:usersProps,status:string}})=>state.user.currentProfile
export const showSuggestSelector =(state:{user:{relativeUsers:{suggestUsers:usersProps[]}}})=>state.user.relativeUsers.suggestUsers
export const showFollowersSelector =(state:{user:{relativeUsers:{followerUsers:usersProps[]}}})=>state.user.relativeUsers.followerUsers
export const showFollowingsSelector =(state:{user:{relativeUsers:{followingUsers:usersProps[]}}})=>state.user.relativeUsers.followingUsers
export const getAccessToken = (state:{user:{accessToken:string}})=>state.user.accessToken
export const getCurrentPostSelector= ((state:{post:{currentPost:postProps}})=>state.post.currentPost)
export const postsSelector=(state:{post:{posts:postProps[]}})=>state.post.posts


