import * as Config from "./config";
import React, { RefObject, useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { useMovies, MovieSearchResponseT } from "./useMovies";
import { useLocalStorage, MovieWatchedT } from "./useLocalStorage";
import { useKey } from "./useKey";

interface RatingResponseT {
  Source: string;
  Value: string;
}

interface MovieResponseT {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: RatingResponseT[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

const average = (arr: number[]) => {
  return !arr?.length
    ? 0
    : arr.reduce((acc, cur) => acc + cur, 0) / arr.length;
};

function NavBar({ children }: { children: React.ReactNode }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (query: string) => void;
}) {
  const inputElement: RefObject<HTMLInputElement | null> = useRef(null);
  // // Not React way of doing things
  // useEffect(function () {
  //   const el: HTMLInputElement | null = document.querySelector(".search");
  //   if (el) el.focus();
  // }, []);

  useEffect(function () {
    // Runs only when dom has loaded #2
    inputElement.current?.focus();
  }, []);

  useKey("Enter", () => {
    if (document.activeElement === inputElement.current) return;
    setQuery("");
    inputElement.current?.focus();
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputElement} // Loads only when dom has loaded #1
    />
  );
}

function ResultsQty({ movies }: { movies: MovieSearchResponseT[] }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({ children }: { children: React.ReactNode }) {
  return <main className="main">{children}</main>;
}

function Box({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "-" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function ListOfMovies({
  movies,
  onMovieSelect,
}: {
  movies: MovieSearchResponseT[];
  onMovieSelect: (id: string) => void;
}) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          key={movie.imdbID}
          movie={movie}
          onMovieSelect={onMovieSelect}
        />
      ))}
    </ul>
  );
}

function Movie({
  movie,
  onMovieSelect,
}: {
  movie: MovieSearchResponseT;
  onMovieSelect: (id: string) => void;
}) {
  return (
    <li key={movie.imdbID} onClick={() => onMovieSelect(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function Summary({ watched }: { watched: MovieWatchedT[] }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{Math.round(avgImdbRating * 100) / 100}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{Math.round(avgUserRating * 100) / 100}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{Math.round(avgRuntime * 100) / 100} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({
  watched,
  onDeleteWatched: onDelete,
}: {
  watched: MovieWatchedT[];
  onDeleteWatched: (id: string) => void;
}) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbId}
          movie={movie}
          onDeleteWatched={onDelete}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({
  movie,
  onDeleteWatched: onDelete,
}: {
  movie: MovieWatchedT;
  onDeleteWatched: (id: string) => void;
}) {
  return (
    <li key={movie.imdbId}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
      <button
        className="btn-delete"
        onClick={() => {
          onDelete(movie.imdbId);
        }}
      >
        X
      </button>
    </li>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <p className="error">
      <span>⛔</span> {message}
    </p>
  );
}

function MovieDetails({
  selectedId,
  watched,
  onCloseMovie,
  onAddWatched,
}: {
  selectedId: string;
  watched: MovieWatchedT[];
  onCloseMovie: () => void;
  onAddWatched: (movie: any) => void;
}) {
  const [movie, setMovie] = useState<MovieResponseT | null>(null);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState(0);
  const watchedAlready = watched.some((movie) => movie.imdbId === selectedId);
  const countRef = useRef(0);

  useKey("Escape", onCloseMovie);
  useEffect(
    function () {
      if (userRating) countRef.current += 1;
    },
    [userRating]
  );

  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          const res = await fetch(`${Config.API_URL}i=${selectedId}`);
          if (!res.ok)
            throw new Error("Something went wrong when fetching movies");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovie(data);
        } catch (error) {
          if (error instanceof Error) setError(error.message);
          else console.log("Unexpected error 💥💥💥");
        }
      }
      setError("");
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (movie?.Title) {
        document.title = movie.Title;
      }
      return function () {
        document.title = "usePopcorn";
      };
    },
    [movie]
  );

  function handleAddToList() {
    if (watchedAlready) {
      alert("You can't add movies that was previously added before");
      return;
    }

    const newMovie: MovieWatchedT = {
      imdbId: selectedId,
      title: title,
      year: year,
      poster: poster,
      runtime: Number.parseInt(runtime),
      imdbRating: Number.parseFloat(imdbRating),
      userRating: userRating,
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newMovie);
    onCloseMovie();
  }

  if (error) return <ErrorMessage message={error} />;
  if (!movie) return <Loader />;

  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    Year: year,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          ⬅
        </button>
        <img src={poster} alt={`Poster of ${title} movie`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐</span>
            {imdbRating} IMDb rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          {watchedAlready ? (
            <p>
              You rated this movie:{" "}
              {
                watched.find((movie) => movie.imdbId === selectedId)
                  ?.userRating
              }
              <span>⭐</span>
            </p>
          ) : (
            <>
              <StarRating
                size={24}
                maxRating={10}
                stroke="hsl(50, 100%, 50%)"
                fill="hsl(50, 100%, 50%)"
                defaultColor="hsl(210, 10%, 23%)"
                onSetRating={setUserRating}
              />
              {!userRating ? (
                ""
              ) : (
                <button className="btn-add" onClick={handleAddToList}>
                  + Add to list
                </button>
              )}
            </>
          )}
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");
  // const [watched, setWatched] = useState<MovieWatchedT[]>([]);
  const [watched, setWatched] = useLocalStorage([]);
  const [movies, isLoaded, error] = useMovies(query, handleCloseMovie);

  function handleAddWatched(movie: MovieWatchedT) {
    setWatched((watched) => [...watched, movie]);
    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatched(id: string) {
    setWatched((watched) => watched.filter((movie) => movie.imdbId !== id));
  }

  function handleSelectMovie(id: string) {
    setSelectedId((selectedId) => (selectedId === id ? "" : id));
  }

  function handleCloseMovie() {
    setSelectedId("");
  }

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <ResultsQty movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {!isLoaded && <Loader />}
          {isLoaded && !error && (
            <ListOfMovies movies={movies} onMovieSelect={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {" "}
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              watched={watched}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
