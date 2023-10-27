"use client";

import Link from "next/link";
import {memo} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { FaPlay } from "react-icons/fa";
import { GoStar } from "react-icons/go";
import { IoMdTime } from "react-icons/io";
import  {SlCalender} from "react-icons/sl";
import {state} from "./page";

interface props {
  pos: state;
};

const MovieCard = ({pos}: props) => {
  const {x, y, movie} = pos;

  if(!pos) return null;

  return (
    <Card
      sx={{
        maxWidth: 300,
        position: "fixed",
        zIndex: 999994884848,
        top: `${y + 110}px`,
        left: `${x + 300 > window.innerWidth ? window.innerWidth - 400 : x}px`,
        background: "#151515",
        }}
        className="hidden md:!block z-[8763763762]"
        onMouseOver={(e) => e.preventDefault()}
        onMouseLeave={(e) => e.preventDefault()}
      >
        <CardMedia
          sx={{ height: 180 }}
          image={movie.thumbnail}
          title="Movie"
        />
        <CardContent>
          <Typography variant="h6" className="text-white">
            {movie.movie_name}
          </Typography>
          <div className="flex items-center py-2 justify-between">
            <div className="flex-1">
            <Link 
              className="flex items-center flex-1 space-x-1" 
              href={{ pathname: `/video`, query: { id: movie.id } }}
            >
              <FaPlay size={16} color="#fff" className="cursor-pointer" />
              <Typography variant="body2" className="text-white">
                Play
              </Typography>
            </Link>
            </div>
            <div className="flex items-center flex-1 space-x-1">
              <GoStar size={20} color="#fff" />
              <Typography variant="body2" className="text-white">
                {movie.rating}
              </Typography>
            </div>
            <div className="flex items-center flex-1 space-x-1 -ml-2">
              <IoMdTime size={18} color="#fff" />
              <Typography variant="body2" className="text-white">
                {movie.length}
              </Typography>
            </div>
            <div className="flex items-center flex-1 space-x-2">
              <SlCalender size={16} color="#fff" />
              <Typography variant="body2" className="text-white text-right">
                {movie.release_year}
              </Typography>
            </div>
          </div>
          <Typography
            variant="body2"
            // color="text.secondary"
            className="text-white"
          >
            {movie.description}
          </Typography>
        </CardContent>
    </Card>
  )
}

export default memo(MovieCard);