import React, { useEffect, useState } from "react";

import styles from "./styles/Form.module.css";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import { useNavigate, useSearchParams } from "react-router-dom";
import { REVERSE_GEOCODING_API_URL } from "../Config";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [countryEmoji, setCountryEmoji] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [notes, setNotes] = useState("");

  const [errorFetchingCity, setErrorFetchingCity] = useState("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const { postCity, isLoading: isLoadingPostCity } = useCities();
  const navigator = useNavigate();

  useEffect(() => {
    if (!lat || !lng) return;

    async function fetchCity() {
      try {
        setErrorFetchingCity("");
        setIsLoadingLocation(true);
        const res = await fetch(
          `${REVERSE_GEOCODING_API_URL}?latitude=${lat}&longitude=${lng}`
        );

        if (!res.ok) {
          throw new Error("Failed to load appropriate city");
        }

        const data = await res.json();

        if (!data.city || !data.countryCode) {
          throw new Error(
            "It'doesn't seem to be a city, click somewhere else"
          );
        }

        setCityName(data.city);
        setCountryEmoji(convertToEmoji(data.countryCode));
        setCountry(data.countryName);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          setErrorFetchingCity(error.message);
        }
      } finally {
        // TOLEARN be careful with setting isLoading, it always must
        // be in the finally block
        setIsLoadingLocation(false);
      }
    }
    fetchCity();
  }, [lat, lng]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!cityName || !date) return;
    if (!lat || !lng) return;

    const newCity = {
      cityName,
      country,
      date,
      notes,
      position: { lat: Number(lat), lng: Number(lng) },
      emoji: countryEmoji,
    };
    await postCity(newCity);
    navigator("/app/cities");
  }

  if (isLoadingLocation) {
    return <Spinner />;
  }

  if (errorFetchingCity) {
    return <Message message={errorFetchingCity} />;
  }

  if (!lat || !lng) {
    return <Message message="Select a city on the map 🥺" />;
  }

  return (
    <form
      className={`${styles.form} ${isLoadingPostCity ? styles.loading : ""}`}
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{countryEmoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          type="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button onClick={() => {}} type="primary">
          Add
        </Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
