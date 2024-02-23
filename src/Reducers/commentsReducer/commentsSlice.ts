import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// _id(pin):"65d3bc2524f605001937d4fc"
// comment(pin):"nosdasd"
// rate(pin):4
// elementId(pin):"0425264041"
// author(pin):"fraco92@gmail.com"
// createdAt(pin):"2024-02-19T20:37:57.587Z"
// updatedAt(pin):"2024-02-21T15:51:27.574Z"
// __v(pin):0

interface comment {
  _id: string,
  comment: string,
  rate: number,
  elementId: string,
  author: string,
  createdAt: string,
  updatedAt: string,
  __v: number
}

interface initialStateInterface {
  commentsList: comment[],
  loading: boolean,
  commentRefresh: boolean,
  error: string | null 
}

const initialState: initialStateInterface = {
  commentsList: [],
  loading: false,
  commentRefresh: false,
  error: "",
};

export const getComments: any = createAsyncThunk(
  "comments/GETComments",
  async (id) => {
    try {
      const res = await axios.get(
        `https://striveschool-api.herokuapp.com/api/books/${id}/comments/`,
        {
          headers: {
            Authorization:
              "Bearer " +
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFmOWU5YmJkNWQxMjAwMTg5MGQ0NjQiLCJpYXQiOjE3MDgwOTU5MjEsImV4cCI6MTcwOTMwNTUyMX0.uUoRJ9TIYLG9g18h_sNUuZ0dnv9hqZIVH6jD_kpZhFs",
          },
        }
      );
      return await res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    handleCommentRefresh: (state) => {
      state.commentRefresh = !state.commentRefresh;
    },
    handleError: (state, { payload }) => {
        const { value } = payload;
        state.error = value;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.loading = false;
        state.commentsList = action.payload.reverse();
      })
      .addCase(getComments.rejected, (state, action) => {
        state.loading = false;
        state.error = `${action.error.code}: ${action.error.message}`;
      });
  },
});

export const allComments = ({commentsData: {commentsList}}: {commentsData: {commentsList: comment[]}}) => commentsList;
export const isAllCommentsLoading = ({commentsData: {loading}}: {commentsData: {loading: boolean}}) => loading;
export const isCommentRefreshed = ({commentsData: {commentRefresh}}: {commentsData: {commentRefresh: boolean}}) => commentRefresh;
export const isAllCommentsError = ({commentsData: {error}}: {commentsData: {error: string | null}}) => error;
export const { handleCommentRefresh, handleError } = commentsSlice.actions;

export default commentsSlice.reducer;
