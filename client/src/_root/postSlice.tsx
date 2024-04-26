import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postProps } from "../types";
import { createPosts } from "../fetchapi/postHandler";

interface postState {
  status: string;
  posts: postProps[];
  currentPost: postProps;
}
const initialPost: postProps = {
  _id: "",
  userId: "",
  tags: [],
  place: "",
  message: "",
  imageUrl: "",
  comments: [],
  liked: [],
  createdAt: null,
};

const initialState = {
  status: "idle",
  posts: [],
  currentPost: initialPost,
} as postState;
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(getHomeFeed.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "loading";
        state.posts.push(action.payload);
      })

      .addCase(getPostsByUserId.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.posts[action.payload.index].liked.push(action.payload.userId);
        if (state.currentPost._id == state.posts[action.payload.index]._id) {
          state.currentPost = state.posts[action.payload.index];
        }

      })

      .addCase(unLikePost.fulfilled, (state, action) => {
        const updateLiked = state.posts[action.payload.index].liked.filter(
          (id) => {
            return id != action.payload.userId;
          }
        );
        state.posts[action.payload.index].liked = updateLiked;
        if (state.currentPost._id == state.posts[action.payload.index]._id) {
          state.currentPost = state.posts[action.payload.index];
        }
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(getCurrentPost.fulfilled, (state, action) => {
        state.currentPost = action.payload;
      });
  },
});

export const getHomeFeed = createAsyncThunk(
  "post/getHomeFeed",
  async (data: { accessToken: string; userId: string; userName: string }) => {
    const { accessToken, userId, userName } = data;

    const res = await fetch(`http://localhost:5000/post/home-feed/${userId}`, {
      method: "GET",
      headers: {
        AccessToken: accessToken,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((homeFeed) => {
        if (homeFeed.length < 5) {
          const final = createPosts({ userId, userName });
          return final;
        } else {
          return homeFeed;
        } 
      });
    return res;
  }
);

export const getCurrentPost = createAsyncThunk(
  "post/getCurrentPost",
  async (data: {
    accessToken: string;
    postId: string | undefined;
    userId: string;
  }) => {
    const { accessToken, postId, userId } = data;
    const response = await fetch(
      `http://localhost:5000/post/get-post/${postId}`,
      {
        method: "GET",
        headers: {
          AccessToken: accessToken,
          userId: userId,
          "Content-Type": "application/json",
        },
      }
    );
    return response.json();
  }
);

export const createPost = createAsyncThunk(
  "post/createPost",
  async (data: { accessToken: string; postInfo: object }) => {
    const { accessToken, postInfo } = data;
    const response = await fetch("http://localhost:5000/post/create-post", {
      method: "POST",
      headers: {
        AccessToken: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postInfo),
    });
    return response.json();
  }
);

export const getPostsByUserId = createAsyncThunk(
  "post/getPostsByUserId",
  async (data: { accessToken: string; userId: string }) => {
    const { accessToken, userId } = data;
    const response = await fetch(
      `http://localhost:5000/post/my-posts/${userId}`,
      {
        method: "GET",
        headers: { AccessToken: accessToken },
      }
    );
    return response.json();
  }
);

export const likePost = createAsyncThunk(
  "post/likePost",
  async (data: {
    accessToken: string;
    userId: string;
    postId: string;
    index: number;
  }) => {
    const { accessToken, userId, postId, index } = data;
    await fetch(`http://localhost:5000/post/like/${postId}/${userId}`, {
      method: "GET",
      headers: { AccessToken: accessToken },
    });
    return { userId, index };
  }
);
export const unLikePost = createAsyncThunk(
  "post/unLikePost",
  async (data: {
    accessToken: string;
    userId: string;
    postId: string;
    index: number;
  }) => {
    const { accessToken, userId, postId, index } = data;

    await fetch(`http://localhost:5000/post/unlike/${postId}/${userId}`, {
      method: "GET",
      headers: { AccessToken: accessToken },
    });
    return { userId, index };
  }
);
export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postId: string) => {
    const response = await fetch(`http://localhost:5000/post/${postId}`, {
      method: "GET",
    });
    return response.json();
  }
);
export default postSlice.reducer;
