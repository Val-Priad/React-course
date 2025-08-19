import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./styles/Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useCities } from "../contexts/CitiesContext";
import useGeolocation from "../hooks/useGeolocation";
import Button from "./Button";

function Map() {
  const {
    position: userPosition,
    getPosition,
    isLoading: isLoadingUserPosition,
  } = useGeolocation();
  const { cities } = useCities();
  const [mapPosition, setMapPosition]: [
    [number, number],
    Dispatch<SetStateAction<[number, number]>>
  ] = useState([50.4504, 30.5245]); // TOLEARN when you update this values you do not
  // rerender component, it is a default values, never do this mistake again,
  // be careful

  const [searchParams] = useSearchParams();
  useEffect(() => {
    if (!searchParams.size) {
      return;
    }

    setMapPosition([
      Number(searchParams.get("lat")),
      Number(searchParams.get("lng")),
    ]);
  }, [searchParams]);

  useEffect(() => {
    if (!userPosition) {
      return;
    }
    setMapPosition(userPosition);
  }, [userPosition]);

  return (
    <div className={styles.mapContainer}>
      {!userPosition && (
        <Button type="position" onClick={() => getPosition()}>
          {isLoadingUserPosition ? "Loading..." : "Use your position"}
        </Button>
      )}

      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          const position: [number, number] = [
            city.position.lat,
            city.position.lng,
          ];

          return (
            <Marker position={position} key={city.id}>
              <Popup>
                <span>{city.emoji}</span> <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPosition} />
        <OnMapClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }: { position: [number, number] }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function OnMapClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      // cSpell: disable-next-line
      const { lat, lng } = e.latlng;
      navigate(`form?lat=${lat}&lng=${lng}`);
    },
  });
  return null;
}

export default Map;
