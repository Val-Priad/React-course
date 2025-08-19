import { Link } from "react-router-dom";
import type { TCity } from "../App";
import styles from "./styles/CityPreview.module.css";
import { useCities } from "../contexts/CitiesContext";
import type React from "react";

function CityPreview({ city }: { city: TCity }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (id) {
      deleteCity(id);
    }
  }

  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          id === currentCity?.id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button
          className={styles.deleteBtn}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export default CityPreview;
