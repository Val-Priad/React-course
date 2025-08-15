import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import PricingPage from "./pages/PricingPage";
import ProductPage from "./pages/ProductPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import AppPage from "./pages/AppPage";
import CitiesList from "./components/CitiesList";
import { useEffect, useState } from "react";
import { API_URL } from "./Config";
import CountriesList from "./components/CountriesList";
import CityDetails from "./components/CityDetails";
import Form from "./components/Form";

export type TCity = {
  cityName: string;
  country: string;
  emoji: string;
  date: string; // ISO 8601 -> YYYY-MM-DD
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
  id: number;
};

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  // TOLEARN think about <Navigate/> component as about redirect

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<ProductPage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="app" element={<AppPage />}>
          <Route index element={<Navigate replace to="cities" />} />
          <Route
            path="cities"
            element={<CitiesList cities={cities} isLoading={isLoading} />}
          />
          <Route path="cities/:id" element={<CityDetails />}></Route>
          <Route
            path="countries"
            element={<CountriesList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
