import { createContext, useContext } from "react";
import type { TCity } from "../App";

// <TCity[] | undefined>

type TCityContext = {
  cities: TCity[];
  isLoading: boolean;
  currentCity: TCity | undefined;
  getCity: (id: string) => void;
  postCity: (newCity: TCity) => void;
  deleteCity: (id: string) => void;
};

export const CitiesContext = createContext<TCityContext | undefined>(
  undefined
);

export function useCities(): TCityContext {
  const context = useContext(CitiesContext);

  if (context === undefined) {
    throw new Error("`useCities` must be used only within CitiesProvider");
  }

  return context;
}
