import { Outlet } from "react-router-dom";
import AppNavigationBar from "./AppNavigationBar";
import Logo from "./Logo";
import styles from "./styles/Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNavigationBar />
      <Outlet />
    </div>
  );
}

export default Sidebar;
