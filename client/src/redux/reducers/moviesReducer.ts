"use client";

import { movie } from "@/app/home/Featured";

interface movies {
  moviesList: movie[];
  myList: movie[];
  position: {
    x: number;
    y: number;
  };
  isHovered: boolean;
  hoveredMovie: movie | null
}

const movies: movies = {
  moviesList: [],
  myList: [],
  isHovered: false,
  position: { x: 0, y: 0 },
  hoveredMovie: null,
};

type action = {
  type: string;
  payload?: any;
};

const moviesReducer = (state = movies, action: action): movies => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_MOVIES":
      return { ...state, moviesList: payload };
    case "ADD_MY_LIST":
      return { ...state, myList: payload };
    case "ADD_MOVIE_TO_MYLIST":
      return { ...state, myList: [...state.myList, payload] };
    case "REMOVE_MOVIE":
      return { ...state, myList: state.myList.filter((m) => m.id !== payload) };
    case "MOVIE_HOVERED":
      return {
        ...state,
        isHovered: true,
        position: { x: payload.x, y: payload.y },
        hoveredMovie: payload.movie,
      };
    case "MOVIE_UNHOVERED":
      return { ...state, isHovered: false, hoveredMovie: null };
    default:
      return state;
  }
};

export default moviesReducer;
