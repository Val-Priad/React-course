import { useEffect, useReducer } from "react";
import { API_URL } from "../Config";
import { CitiesContext } from "./CitiesContext";
import type { TCity } from "../App";

type TCitiesState = {
  cities: TCity[];
  isLoading: boolean;
  currentCity: TCity | undefined;
  error: string;
};

type TAction =
  | { type: "rejected"; payload: string }
  | { type: "loading" }
  | { type: "city/loaded"; payload: TCity }
  | { type: "cities/loaded"; payload: TCity[] }
  | { type: "city/created"; payload: TCity[] }
  | { type: "city/deleted"; payload: TCity[] };

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: undefined,
  error: "",
};

function reducer(state: TCitiesState, action: TAction): TCitiesState {
  switch (action.type) {
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    default:
      return state;
  }
}

function CitiesProvider({ children }: { children: React.ReactNode }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${API_URL}/cities`);
        if (!res.ok) throw new Error("Error occurred while fetching cities");
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        if (error instanceof Error) {
          dispatch({ type: "rejected", payload: error.message });
          console.error(error);
        }
      }
    }
    fetchCities();
  }, []);

  async function getCity(id: string) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${API_URL}/cities/${id}`);

      if (!res.ok) throw new Error("Error occurred while fetching cities");

      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        console.log("Amogus");
        dispatch({ type: "rejected", payload: error.message });
      }
    }
  }

  async function postCity(newCity: TCity) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${API_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Error occurred while posting city");

      const data = await res.json();
      dispatch({ type: "city/created", payload: [...cities, data] });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: "rejected", payload: error.message });
        console.error(error);
      }
    }
  }

  async function deleteCity(id: string) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${API_URL}/cities/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error occurred while deleting city");
      dispatch({
        type: "city/deleted",
        payload: cities.filter((city) => city.id !== id),
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        dispatch({ type: "rejected", payload: error.message });
      }
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, getCity, postCity, deleteCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export default CitiesProvider;
