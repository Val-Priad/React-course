import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import styles from "./styles/AppLayout.module.css";

function AppPage() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}

export default AppPage;
