"use client";

import {NextPage} from "next";
import {useEffect,useState} from "react";
import Featured,{movie} from "./Featured";
import Lists from "./Lists";
import {useDispatch,useSelector} from "react-redux";
import {AppDispatch,RootState} from "@/redux/store";
import MovieCard from "./MovieCard";
import {redirect} from "next/navigation";

export interface state {
  x: number;
  y: number;
  movie: movie;
};

const HomePage: NextPage = () => {
  const [pos,setPos] = useState<state | null>(null);
  const {movies} = useSelector((state: RootState) => state);
  const c_user = useSelector((state: RootState) => state.user);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const u = localStorage.getItem("netflix") as string | any;
    let user = JSON.parse(u);
    // if(!u) redirect("/");
    if(!c_user.name) redirect("/");
    else {
      movies.moviesList.length < 1 && dispatch({type: "FETCH_MOVIES",payload: c_user.email});
      document.title = `Home - ${c_user.name}`;
    };
  },[movies, c_user]);

  return (
    <div className="bg-black" style={{maxWidth: "2350px",margin: "auto"}}>
      <Featured setPos={setPos} />
      {lists.map((l: string,i: number) => (
        <Lists title={l} setPos={setPos} key={String(`r${i}`)} />)
      )}
      {pos && <MovieCard pos={pos} />}
    </div>
  );
};

export default HomePage;

let lists = [
  "Featured Movies","New Releases","Popular Movies","Horror Thriller","Comedy Movies","My List"
];