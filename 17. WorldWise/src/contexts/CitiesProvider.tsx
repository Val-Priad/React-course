import { useEffect, useState } from "react";
import { API_URL } from "../Config";
import { CitiesContext } from "./CitiesContext";
import type { TCity } from "../App";

function CitiesProvider({ children }: { children: React.ReactNode }) {
  const [cities, setCities] = useState<TCity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState<TCity | undefined>(undefined);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${API_URL}/cities`);
        if (!res.ok) throw new Error("Error occurred while fetching cities");
        const data = await res.json();
        setCities(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id: string) {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/cities/${id}`);

      if (!res.ok) throw new Error("Error occurred while fetching cities");

      const data = await res.json();
      setCurrentCity(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function postCity(newCity: TCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Error occurred while fetching cities");

      const data = await res.json();
      setCities((cities) => [...cities, data]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, getCity, postCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export default CitiesProvider;
