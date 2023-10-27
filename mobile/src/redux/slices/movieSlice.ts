import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { movie } from "../../components/Feed/Featured";

interface movies {
  moviesList: movie[];
  myList: movie[];
}

const initialState: movies = {
  moviesList: [],
  myList: [],
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    addMovies: (state, action: PayloadAction<movie[]>) => {
      state.moviesList = action.payload;
    },
    addToMyList: (state, action: PayloadAction<movie[]>) => {
      state.myList = action.payload;
    },
    addMovieToMyList: (state, action: PayloadAction<movie>) => {
      state.myList.push(action.payload);
    },
    removeMovie: (state, action: PayloadAction<any>) => {
      state.myList = state.myList.filter((m) => m.id !== action.payload);
    },
  },
});

export const { addMovieToMyList, addMovies, addToMyList, removeMovie } =
  movieSlice.actions;

export default movieSlice.reducer;
