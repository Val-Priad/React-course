import React, { useEffect, useState } from "react";
import styles from "./styles/LoginPage.module.css";
import NavigationBar from "../components/NavigationBar";
import { FAKE_USER } from "../Config";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState(FAKE_USER.email);
  const [password, setPassword] = useState(FAKE_USER.password);
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) return;

    login(email, password);
  }

  useEffect(() => {
    if (!isAuthenticated) return;

    navigate("/app", { replace: true });
  }, [navigate, isAuthenticated]);

  return (
    <main className={styles.login}>
      <NavigationBar />
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
