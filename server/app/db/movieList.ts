import pg from "../config/pg";

const createMovieList = async () => {
  try {
    const table = await pg.query(
     `CREATE TABLE userMoviesList (
      id SERIAL PRIMARY KEY,
      email VARCHAR(500) NOT NULL,
      movieId INT NOT NULL,
      FOREIGN KEY (movieId) REFERENCES movies(id) ON DELETE CASCADE
      )`
    );

    const createIndex = await pg.query(
      `CREATE INDEX email_index
       ON usermovieslist(email)`
    );

    console.log("Created movie list");
  } catch (error) {
    console.log(error);
  };
};

export {createMovieList};