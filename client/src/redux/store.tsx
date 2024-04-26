import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../_root/userSlice";
import postSlice from "../_root/postSlice";

const rootReducer={
    'user':userSlice,
    'post':postSlice
}

const store= configureStore({
    reducer:rootReducer
})


export default store
