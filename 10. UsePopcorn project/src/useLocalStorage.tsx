import { useState, useEffect, Dispatch, SetStateAction } from "react";

export type MovieWatchedT = {
  imdbId: string;
  title: string;
  year: string;
  poster: string;
  runtime: number;
  imdbRating: number;
  userRating: number;
  countRatingDecisions: number;
};

export function useLocalStorage(
  initialState: MovieWatchedT[],
  key = "watched"
): [MovieWatchedT[], Dispatch<SetStateAction<MovieWatchedT[]>>] {
  const [value, setValue] = useState<MovieWatchedT[]>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
      // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
    },
    [value, key]
  );

  return [value, setValue];
}
