import { useState } from "react";

function useGeolocation(): {
  position: [number, number] | null;
  getPosition: () => void;
  isLoading: boolean;
  error: string | null;
} {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setIsLoading(false);
      },
      (error) => {
        console.error(`Error occurred: ${error} 💥💥💥`);
        setIsLoading(false);
      }
    );
  }
  return { position, getPosition, isLoading, error };
}
export default useGeolocation;
