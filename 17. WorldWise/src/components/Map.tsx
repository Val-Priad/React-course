import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./styles/Map.module.css";

function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [lat, lng] = [searchParams.get("lat"), searchParams.get("lng")];
  console.log(setSearchParams);
  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      {lat} {lng}
    </div>
  );
}

export default Map;
