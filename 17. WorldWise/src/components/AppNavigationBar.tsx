import { NavLink } from "react-router-dom";
import styles from "./styles/AppNavigationBar.module.css";

function AppNavigationBar() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities">Cities</NavLink>
        </li>
        <li>
          <NavLink to="countries">Countries</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNavigationBar;
