"use client";

import {useState,useEffect,memo,SetStateAction,useRef} from "react";
import {movie} from "./Featured";
import ListMovie from "./ListMovie";
import {SlArrowLeft,SlArrowRight} from "react-icons/sl";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {Typography} from "@mui/material";

var arrow =
  "absolute h-full w-14 bg-[rgba(0,0,0,0.5)] md:!grid place-items-center z-[999999] hidden top-0";

interface props {
  title: string;
  setPos: React.Dispatch<SetStateAction<any>>;
}

const Lists = (props: props) => {
  const {title,setPos} = props;
  const [movies,setMovies] = useState<movie[]>([]);
  const [slideNum,setSlideNum] = useState<number>(0);

  const moviesRef = useRef<HTMLDivElement>(null);

  const {moviesList,myList} = useSelector((state: RootState) => state.movies);

  const slide = (opt: "left" | "right") => {
    const {width} = moviesRef.current?.getBoundingClientRect() as any;

    if(opt === "left" && slideNum > 0) {
      setSlideNum((p) => p - 200);
    } else if(opt === "right" && slideNum < width + 300) {
      setSlideNum((p) => p + 200);
    }
  };

  useEffect(() => {
    if(title === "My List" && movies.length < 1) setMovies(myList);
    else if(movies.length < 1) setMovies(moviesList);
  },[movies, moviesList]);

  return (
    <div className="p-3" onMouseEnter={() => setPos(null)}>
      <Typography variant="h6" className="text-white" sx={{my: 1}}>
        {title}
      </Typography>
      <div ref={moviesRef} className="overflow-x-scroll md:overflow-x-hidden relative">
        {movies.length > 3 && (
          <div className={`${arrow} left-0`}>
            <SlArrowLeft
              size={40}
              color="#fff"
              className="cursor-pointer z-[9999999]"
              onClick={() => slide("left")}
            />
          </div>
        )}
        <div
          className="w-max flex items-center space-x-3 md:space-x-2"
          style={{transform: `translateX(${-slideNum}px)`}}
          onBlur={() => setPos(null)}
        >
          {movies.length < 1 ? (
            <div>
              <h1 className="text-red-600 font-medium text-3xl">List Empty</h1>
            </div>
          ) : (
            movies
              .sort((a,b) => Math.random() - 0.5)
              .map((m) => <ListMovie key={Math.random()} movie={m} setPos={setPos} />)
          )}
        </div>

        {movies.length > 3 && (
          <div className={`${arrow} right-0`}>
            <SlArrowRight
              size={40}
              color="#fff"
              className="cursor-pointer z-[999999999999]"
              onClick={() => slide("right")}
            />
          </div>
        )}
      </div>
    </div>
  ); 
};

export default memo(Lists);
