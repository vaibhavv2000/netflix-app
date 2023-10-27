import pg from "../config/pg";

export interface movie {
  movie_name: string;
  release_year: number;
  thumbnail: string;
  rating: number;
  length: number;
  title_img: string;
  pg: boolean;
  type: string;
  genre: string;
  description: string;
};

const movies: movie[] = [
  { 
    movie_name: "Joker",
    release_year: 2019,
    thumbnail: "https://c4.wallpaperflare.com/wallpaper/267/666/423/joker-2019-movie-joker-joaquin-phoenix-movies-dancing-hd-wallpaper-preview.jpg",
    rating: 4.7,
    length: 2.15,
    title_img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Joker_%282019%29_logotype.png/800px-Joker_%282019%29_logotype.png?20200409175950",
    pg: true,
    type: "movie",
    genre: "thriller",
    description: "During the 1980's, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure.",
  },
  { 
    movie_name: "Stranger Things",
    release_year: 2016,
    thumbnail: "https://c4.wallpaperflare.com/wallpaper/623/173/147/tv-show-stranger-things-caleb-mclaughlin-dustin-henderson-eleven-stranger-things-hd-wallpaper-preview.jpg",
    rating: 4.2,
    length: 7.32,
    title_img: "https://www.freepnglogos.com/uploads/stranger-things-logo-png/funko-pocket-chaveiros-stranger-things-mania-pop-6.png",
    pg: false,
    type: "web_series",
    genre: "horror",
    description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
  },
  { 
    movie_name: "Avengers",
    release_year: 2012,
    thumbnail: "https://c4.wallpaperflare.com/wallpaper/296/400/37/movie-avengers-infinity-war-black-panther-movie-black-widow-wallpaper-preview.jpg",
    rating: 4.8,
    length: 2.32,
    title_img: "https://freepngimg.com/thumb/avengers/117348-logo-avengers-download-hq.png",
    pg: false,
    type: "movie",
    genre: "superhero",
    description: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
  },
  { 
    movie_name: "Avatar",
    release_year: 2009,
    thumbnail: "https://c4.wallpaperflare.com/wallpaper/972/337/203/avatar-2009-poster-movie-black-wallpaper-preview.jpg",
    rating: 4.7,
    length: 3.32,
    title_img: "https://lumiere-a.akamaihd.net/v1/images/avatar_nav_logo_c08aa297.png",
    pg: true,
    type: "movie",
    genre: "sci-fi",
    description: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
  },
  { 
    movie_name: "Iron man 3",
    release_year: 2013,
    thumbnail: "https://images.alphacoders.com/111/thumb-1920-1116505.png",
    rating: 4.3,
    length: 2.42,
    title_img: "https://logos-world.net/wp-content/uploads/2020/12/Iron-Man-Logo-700x394.png",
    pg: false,
    type: "movie",
    genre: "superhero",
    description: "When Tony Stark's world is torn apart by a formidable terrorist called the Mandarin, he starts an odyssey of rebuilding and retribution.",
  },
  { 
    movie_name: "Barbie",
    release_year: 2023,
    thumbnail: "https://c4.wallpaperflare.com/wallpaper/441/145/69/barbie-barbie-2023-margot-robbie-ryan-gosling-movies-hd-wallpaper-preview.jpg",
    rating: 3.8,
    length: 2.12,
    title_img: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Barbie_The_Movie_Logo.png",
    pg: false,
    type: "movie",
    genre: "comedy",
    description: "Barbie suffers a crisis that leads her to question her world and her existence.",
  },
  { 
    movie_name: "Rio",
    release_year: 2011,
    thumbnail: "https://c4.wallpaperflare.com/wallpaper/784/853/246/rio-movie-2011-rio-movie-wallpaper-preview.jpg",
    rating: 4.1,
    length: 1.56,
    title_img: "https://freepngimg.com/thumb/rio/31031-7-rio-hd.png",
    pg: false,
    type: "movie",
    genre: "animation",
    description: "When Blu, a domesticated macaw from small-town Minnesota, meets the fiercely independent Jewel, he takes off on an adventure to Rio de Janeiro with the bird of his dreams.",
  },
  { 
    movie_name: "Game Of Thrones",
    release_year: 2011,
    thumbnail: "https://c4.wallpaperflare.com/wallpaper/409/399/588/fantasy-art-dark-fantasy-game-of-thrones-the-night-king-wallpaper-preview.jpg",
    rating: 4.1,
    length: 2.12,
    title_img: "https://freepngimg.com/thumb/game_of_thrones/1-2-game-of-thrones-logo-picture.png",
    pg: true,
    type: "web_series",
    genre: "royalty",
    description: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for a millennia.",
  },
  { 
    movie_name: "Jaws",
    release_year: 1975,
    thumbnail: "https://c4.wallpaperflare.com/wallpaper/617/241/195/jaws-movies-shark-split-view-wallpaper-preview.jpg",
    rating: 4.9,
    length: 2.32,
    title_img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/JAWS_logo.svg/215px-JAWS_logo.svg.png",
    pg: true,
    type: "movie",
    genre: "thriller",
    description: "When a killer shark unleashes chaos on a beach community off Cape Cod, it's up to a local sheriff, a marine biologist, and an old seafarer to hunt the beast down.",
  },
  { 
    movie_name: "Suicide Squad",
    release_year: 2016,
    thumbnail: "https://static1.colliderimages.com/wordpress/wp-content/uploads/2021/05/suicide-squad-characters-social.jpg",
    rating: 3.8,
    length: 2.22,
    title_img: "https://occ-0-2085-2186.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABYXwOMRzkHc-so8gfy1CasteIVQapMd17rndbVv9Wo9GPJIqmz1SDLyB72AWkGqLxZd9S9IunSd48uuygmmWKryRNT63VQRDGna163Rnt0V0.png?r=98e",
    pg: true,
    type: "movie",
    genre: "superhero",
    description: "A secret government agency recruits some of the most dangerous incarcerated super-villains to form a defensive task force. Their first mission: save the world from the apocalypse.",
  },
];


export const addMovies = () => {
  for(let i of movies) {
    async function addMovie(m: movie) {
      const { thumbnail, rating, title_img, description } = m;
      const { length, type, genre, release_year, movie_name } = m;

      const values1 = [thumbnail, rating, title_img, description, length];
      const values2 = [ type, genre, release_year, movie_name];
      
      try {
        const add = await pg.query(
          `INSERT INTO movies (thumbnail, rating, title_img, description, length, 
            pg, type, genre, release_year, movie_name)
          VALUES 
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
          [...values1, m.pg, ...values2]
        );

        console.log("Added new movie");
      } catch (error) {
        console.log("Movie add error", error);
      }
    };

    addMovie(i);
  };
};