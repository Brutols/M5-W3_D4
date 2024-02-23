import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  books: [],
  filteredBooks: [],
  loading: false,
  error: "",
  selected: "",
};

export const getBooks = createAsyncThunk("books/GETBooks", async () => {
  try {
    const res = await axios.get("https://striveschool-api.herokuapp.com/books");
    return await res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    filterBooks: (state, action) => {
      const lowerCasePayload = action.payload.toLowerCase();
      state.filteredBooks = state.books.filter((book) => {
        return book.title.toLowerCase().includes(lowerCasePayload);
      });
    },
    handleSelection: (state, { payload }) => {
      const { type, value } = payload;
      switch (type) {
        case "set":
          state.selected = value;
          break;
        case "reset":
          state.selected = "";
          break;
        default:
          return state;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = `${action.error.code}: ${action.error.message}`;
      });
  },
});

export const allBooks = (state) => state.booksData.books;
export const allFilteredBooks = (state) => state.booksData.filteredBooks;
export const isAllBooksLoading = (state) => state.booksData.loading;
export const isAllBooksError = (state) => state.booksData.error;
export const isSelected = (state) => state.booksData.selected;
export const { filterBooks, handleSelection } = booksSlice.actions;

export default booksSlice.reducer;
