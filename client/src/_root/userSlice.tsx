import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { usersProps } from "../types";

export const userNameMapUserID: { [key: string]: string } = {};

const initialUser: usersProps = {
  _id: "",
  userName: "",
  name: "",
  email: "",
  posts: [],
  followers: [],
  followings: [],
  imgAvatar: "",
};

interface userState {
  status: string;
  currentUser: usersProps;
  allUsers:{ [key: string]: usersProps };
  accessToken: string;
}
const initialState = {
  status: "idle",
  currentUser: initialUser,
  accessToken: "",
} as userState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(reload.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.status = action.payload.status;
          state.currentUser = initialUser;
          return;
        }
        state.currentUser = action.payload.user;
        state.accessToken = action.payload.token;
        state.status = "idle";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentUser = action.payload.user;
        state.accessToken = action.payload.token;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.currentUser = initialUser;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentUser = action.payload;
      })
      .addCase(SocialMediaInteraction.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentUser = action.payload;
      })
      .addCase(getAllUsers.fulfilled,(state,action)=>{
        state.status= 'idle'
        const response: { [key: string]: usersProps }={} 
        action.payload.map((user:usersProps) => {
          response[user._id]= user
        });
        state.allUsers= response
      })
  },
});

export const reload = createAsyncThunk("user/reload", () => {
  return 1;
});
export const signIn = createAsyncThunk(
  "user/signIn",
  async (data: { email: string; password: string }) => {
    const response = await fetch("http://localhost:5000/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
);

export const signUp = createAsyncThunk(
  "user/signUp",
  async (newData: object) => {
    const response = await fetch("http://localhost:5000/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    return response.json();
  }
);
export const logOut = createAsyncThunk("user/logOut", async () => {
  return initialState;
});
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (data: { accessToken: string; _id: string; link: string }) => {
    const { _id, accessToken } = data;
    const response = await fetch(`http://localhost:5000/user/${_id}`, {
      method: "PUT",
      headers: {
        AccessToken: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  }
);
export const SocialMediaInteraction = createAsyncThunk(
  "user/interaction",
  async (data: {
    accessToken: string;
    owner: string;
    friend: string;
    type: string;
  }) => {
    const { accessToken } = data;
    const response = await fetch(
      `http://localhost:5000/user/interactions
  `,
      {
        method: "POST",
        headers: {
          AccessToken: accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return response.json()
  }
);

export const getAllUsers= createAsyncThunk('user/getAllUser',async(accessToken:string )=>{
  const response = await fetch(
    `http://localhost:5000/user/get-all-user
`,
    {
      method: "GET",
      headers: {
        AccessToken: accessToken,
        "Content-Type": "application/json",
      },
    }
  );
  return response.json()
})

export default userSlice.reducer;
