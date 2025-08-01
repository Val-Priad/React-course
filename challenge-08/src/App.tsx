import { useState } from "react";

type TPosition = {
  lat: number;
  lng: number;
};

function useGeolocation(): [
  TPosition | null,
  () => void,
  boolean,
  string | null
] {
  // TOLEARN - any state update in a custom hook provokes rerender of a
  // an element that uses this hook
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState<TPosition | null>(null);
  const [error, setError] = useState<string | null>(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
      }
    );
  }
  return [position, getPosition, isLoading, error];
}

export default function App() {
  const [countClicks, setCountClicks] = useState(0);
  const [position, getPosition, isLoading, error] = useGeolocation();

  let lat, lng;
  if (position) ({ lat, lng } = position);
  else lat = lng = 0;

  function handleClick() {
    setCountClicks((count) => count + 1);
    getPosition();
  }

  return (
    <div>
      <button onClick={handleClick} disabled={isLoading}>
        Get my position
      </button>

      {isLoading && <p>Loading position...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p>
          Your GPS position:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
          >
            {lat}, {lng}
          </a>
        </p>
      )}

      <p>You requested position {countClicks} times</p>
    </div>
  );
}
