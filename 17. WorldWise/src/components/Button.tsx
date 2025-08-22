import styles from "./styles/Button.module.css";

function Button({
  children,
  onClick,
  type,
}: {
  children: React.ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  type?: string;
}) {
  return (
    <button
      className={`${styles.btn} ${type ? styles[type] : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
