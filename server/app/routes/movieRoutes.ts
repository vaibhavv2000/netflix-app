import {Request,Response,Router,NextFunction as NF} from "express";
import * as fs from "fs";
import path from "path";
import pg from "../config/pg";
import {movie} from "../db/createMovies";

const router: Router = Router();

router.post("/addmovie",async (req: Request,res: Response,next: NF) => {
  const {
    thumbnail,
    rating,
    title_img,
    description,
    length,
    type,
    genre,
    release_year,
    movie_name,
  } = req.body as movie;

  try {
    await pg.query(
      `INSERT INTO movies (thumbnail, rating, title_img, description, length, 
        pg, type, genre, release_year, movie_name)
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        thumbnail,
        rating,
        title_img,
        description,
        length,
        req.body.pg,
        type,
        genre,
        release_year,
        movie_name,
      ]
    );

    return res.status(201).json({message: "Added"});
  } catch(error) {
    next(error);
  }
});

router.get("/featuredmovie",async (req: Request,res: Response,next: NF) => {
  try {
    const random_movie = await pg.query(
      `SELECT * FROM movies ORDER BY random() LIMIT 1`
    );

    return res.status(200).json(random_movie.rows[0]);
  } catch(error) {
    next(error);
  }
});

router.get("/movies",async (req: Request,res: Response,next: NF) => {
  try {
    const random_movies = await pg.query(
      `SELECT * FROM movies ORDER BY random() LIMIT 10`
    );

    return res.status(200).json(random_movies.rows);
  } catch(error) {
    next(error);
  }
});

router.post("/addtowishlist",async (req: Request,res: Response,next: NF) => {
  const {email,movieId} = req.body;

  if(!email || !movieId)
    return res.status(400).json({message: "All fields are required"});

  try {
    await pg.query(
      `INSERT INTO usermovieslist (email, movieid) VALUES ($1, $2)`,
      [email,movieId]
    );

    return res.status(201).json({message: "Added"});
  } catch(error) {
    next(error);
  }
});

router.post("/removefromwishlist",async (req: Request,res: Response,next: NF) => {
  const {email,movieId} = req.body;

  if(!email || !movieId)
    return res.status(400).json({message: "All fields are required"});

  try {
    await pg.query(
      `DELETE FROM usermovieslist WHERE email = $1 AND movieId = $2`,
      [email,movieId]
    );

    return res.status(200).json({message: "removed"});
  } catch(error) {
    next(error);
  }
}
);

router.get("/getlist",async (req: Request,res: Response,next: NF) => {
  const {email} = req.query;

  if(!email) {
    return res.status(400).json({message: "All fields are required"});
  }
    

  try {
    const movieIds = await pg.query(
      `SELECT * FROM usermovieslist WHERE email = $1`,
      [email]
    );

    const movies = await Promise.all(
      movieIds.rows.map(async (m) => {
        return (
          await pg.query(`SELECT * FROM movies WHERE id = $1`,[m.movieid])
        ).rows[0];
      })
    );

    return res.status(201).json(movies);
  } catch(error) {
    next(error);
  }
});

router.get("/playmovie",async (req: Request,res: Response,next: NF) => {
  const filePath = path.join(process.cwd(),"/app/video.mp4");

  const range = req.headers.range;

  fs.stat(filePath,(err,data) => {
    console.log(data);
  });

  if(range) {
    const parts = range.replace(/bytes=/,"").split("-");
    const start = parseInt(parts[0],10);
    const end = parseInt(parts[0],10);
  }

  try {
    const readable = fs.createReadStream(filePath,{
      highWaterMark: 1024 * 100,
    });

    readable.pipe(res);
  } catch(error) {
    next(error);
  }
});

export {router as movieRouter};
