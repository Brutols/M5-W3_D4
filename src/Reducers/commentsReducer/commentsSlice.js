import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  commentsList: [],
  loading: false,
  commentRefresh: false,
  error: "",
};

export const getComments = createAsyncThunk(
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

export const allComments = (state) => state.commentsData.commentsList;
export const isAllCommentsLoading = (state) => state.commentsData.loading;
export const isCommentRefreshed = (state) => state.commentsData.commentRefresh;
export const isAllCommentsError = (state) => state.commentsData.error;
export const { handleCommentRefresh, handleError } = commentsSlice.actions;

export default commentsSlice.reducer;
