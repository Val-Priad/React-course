import type { TCity } from "../App";
import CountryPreview from "./CountryPreview";
import Message from "./Message";
import Spinner from "./Spinner";
import styles from "./styles/CountriesList.module.css";

function CountriesList({
  cities,
  isLoading,
}: {
  cities: TCity[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return <Spinner />;
  }

  if (cities.length === 0) {
    return (
      <Message
        message={"Add your first city by clicking on a city on the map!!!"}
      />
    );
  }

  const countriesMap = new Map();
  cities.forEach((city) => {
    countriesMap.set(city.country, {
      country: city.country,
      emoji: city.emoji,
    });
  });
  const countries = Array.from(countriesMap.values());

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryPreview country={country} />
      ))}
    </ul>
  );
}

export default CountriesList;
