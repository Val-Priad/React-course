import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import PricingPage from "./pages/PricingPage";
import ProductPage from "./pages/ProductPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import AppPage from "./pages/AppPage";
import CitiesList from "./components/CitiesList";
import CountriesList from "./components/CountriesList";
import CityDetails from "./components/CityDetails";
import Form from "./components/Form";
import CitiesProvider from "./contexts/CitiesProvider";

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
  id?: string;
};

function App() {
  // TOLEARN think about <Navigate/> component as about redirect

  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="product" element={<ProductPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="app" element={<AppPage />}>
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<CitiesList />} />
            <Route path="cities/:id" element={<CityDetails />}></Route>
            <Route path="countries" element={<CountriesList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
