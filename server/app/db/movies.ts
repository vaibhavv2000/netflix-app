import pg from "../config/pg";

async function createMovie() {
  try {
	const table = await pg.query( 
	  `CREATE TABLE IF NOT EXISTS movies (
	  id SERIAL PRIMARY KEY,
	  thumbnail VARCHAR(1000) NOT NULL,
	  rating FLOAT NOT NULL,
	  title VARCHAR(300) NOT NULL,
	  decription VARCHAR(5000),
	  length FLOAT NOT NULL,
	  pg BOOLEAN,
	  type VARCHAR(100))`
	);

	const genreCol = await pg.query(
	  `ALTER TABLE movies 
	   ADD COLUMN genre VARCHAR(200)`
	);

	const typeMovie = await pg.query(
	  `CREATE TYPE movie_type 
	   AS ENUM ('web_series', 'movie', 'animation')`
	);

	const alterMovie = await pg.query(
	  `ALTER TABLE movies
	   ALTER COLUMN type TYPE movie_type
	   USING type::movie_type`
	);

	const releaseYear = await pg.query(
	  `ALTER TABLE movies 
	   ADD COLUMN release_year INT NOT NULL`
	);

	const changeTitle = await pg.query(
	  `ALTER TABLE movies
	   RENAME COLUMN title TO title_img`
	);

	const changeTitleType = await pg.query(
	  `ALTER TABLE movies
	   ALTER COLUMN title_img TYPE VARCHAR(1000)`
	);	

	const addMovieName = await pg.query(
	  `ALTER TABLE movies 
	   ADD COLUMN movie_name VARCHAR(1000)`
	);

	const description = await pg.query(
	  `ALTER TABLE movies
	   RENAME COLUMN decription TO description`
	);

	console.log("movie created")
  } catch (error) {
	console.log(error)
  };
};

// DROP TYPE admin_level1;

export {createMovie};