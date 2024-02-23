import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// asin:"1940026091"
// title:"Pandemic (The Extinction Files, Book 1)"
// img:"https://images-na.ssl-images-amazon.com/images/I/91xrEMcvmQL.jpg"
// price:7.81
// category:"scifi"

interface book {
  asin: string,
  title: string,
  img: string,
  price: number,
  category: string
}

interface initialStateInterface {
  books: book[],
  filteredBooks: book[] | null,
  loading: boolean,
  error: string | null,
  selected: string | null
}

const initialState: initialStateInterface = {
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

export const allBooks = ({booksData: {books}}: {booksData: {books: book[]}}) => books;
export const allFilteredBooks = ({booksData: {filteredBooks}}: {booksData: {filteredBooks: book[]}}) => filteredBooks;
export const isAllBooksLoading = ({booksData: {loading}}: {booksData: {loading: boolean}}) => loading;
export const isAllBooksError = ({booksData: {error}}: {booksData: {error: string | null}}) => error;
export const isSelected = ({booksData: {selected}}: {booksData: {selected: string | null}}) => selected;
export const { filterBooks, handleSelection } = booksSlice.actions;

export default booksSlice.reducer;
