import styles from "./styles/Button.module.css";

function Button({
  children,
  onClick,
  type,
}: {
  children: React.ReactNode;
  onClick: () => void;
  type: string;
}) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
