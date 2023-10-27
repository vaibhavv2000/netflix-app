import {MouseEvent,memo,useRef,SetStateAction} from "react";
import {movie} from "./Featured";
import Image from "next/image";
import Link from "next/link";

var thumbnail = `h-60 w-40 md:h-40 md:w-[270px] rounded-md hover:opacity-60 cursor-pointer relative`;

interface props {
  movie: movie;
  setPos: React.Dispatch<SetStateAction<any>>;
};

const ListMovie = (props: props) => {
  const {movie,setPos} = props;

  const movieRef = useRef<HTMLDivElement>(null);

  function mouseHovered(event: MouseEvent<HTMLDivElement>) {
    let top: number = 0;

    event.stopPropagation();

    window.addEventListener("mouseover",function getPos(e: any) {
      top = e.target.offsettTop
    });

    setPos({x: event.clientX,y: top,movie});
  };

  return (
    <div
      ref={movieRef}
      onMouseEnter={mouseHovered}
      className={thumbnail}
    >
      <Link href={{pathname: "/video",query: {id: movie.id}}} className="h-full w-full">
        <Image
          src={movie.thumbnail}
          className="h-full w-full rounded-md object-cover"
          alt=""
          fill
        />
      </Link>
    </div>
  );
};

export default memo(ListMovie);
