"use client";

import {memo} from "react";
import Image from "next/image";
import {useEffect,useState} from "react";
import {RootState} from "@/redux/store";
import {useSelector} from "react-redux";
import {GoPlus} from "react-icons/go";
import {FaPlay} from "react-icons/fa";
import {Button,Typography} from "@mui/material";
import {useRouter} from "next/navigation";
import Link from "next/link";
import Navbar from "./Navbar";
import {state} from "./page";

export interface movie {
  description: string;
  genre: string;
  id: number;
  length: number;
  movie_name: string;
  pg: boolean;
  rating: number;
  release_year: number;
  thumbnail: string;
  title_img: string;
  type: string;
}

interface props {
  setPos?: React.Dispatch<React.SetStateAction<state | null>>;
};

const Featured = ({setPos}: props): JSX.Element => {
  const [movie,setMovie] = useState<movie | null>();

  const router = useRouter();

  const c_user = useSelector((state: RootState) => state.user);
  const {moviesList} = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    if(!c_user.name) router.push("/");
  },[c_user.name,router]);

  useEffect(() => {
    const movies = [...moviesList];
    const movie = movies[Math.floor(Math.random() * movies.length)];
    setMovie(movie);
  },[moviesList]);

  if(!movie) return <Navbar />;

  return (
    <div onMouseEnter={() => setPos && setPos(null)}>
      <Navbar />
      <div className="relative h-96 sm:h-[420px] md:h-[550px] lg:h-[700px] bg-no-repeat">
        <div className="absolute md:left-10 left-2 md:top-[50%] w-80 sm:w-96 z-10 translate-y-[-40%] md:translate-y-[-50%] top-[50%] xxl:scale-150 xxl:left-40">
          <img
            src={movie.title_img}
            alt=""
            className="h-16 sm:h-14 md:h-40 w-60 md:w-full object-fill"
          />
          <div className="flex items-center text-lg font-medium my-2 space-x-2 text-white">
            <span>{movie.movie_name} |</span>
            <span>{movie.release_year} |</span>
            <span>{movie.genre}</span>
          </div>
          <Typography className="text-white/80 text-[12px]" sx={{my: 1}}>
            {movie.description}
          </Typography>
          <div className="flex items-center space-x-3 py-2">
            <Button
              variant="contained"
              size="large"
              startIcon={<FaPlay size={20} color={"#fff"} />}
            >
              <Link href={{pathname: "/video",query: {id: movie.id}}}>PLAY</Link>
            </Button>
            <Button
              variant="contained"
              size="large"
              // sx={{background: "#999","&:hover": {background: "#999"}}}
              sx={{backgroundColor: "#888"}}
              startIcon={<GoPlus size={23} color={"#fff"} />}
            >
              MY LIST
            </Button>
          </div>
        </div>
        <Image
          src={movie.thumbnail}
          alt=""
          fill
          className="h-full w-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[rgba(0,0,0,0.17777)] to-[rgba(0,0,0,0.377777)]"></div>
      </div>
    </div>
  );
};

export default Featured;
