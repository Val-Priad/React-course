import { Link } from "react-router-dom";

function Button({
  children,
  disabled,
  to,
  type,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  to?: string;
  onClick?: () => void;
  type: "round" | "small" | "primary" | "secondary";
}) {
  const baseStyle =
    "inline-block rounded-full bg-yellow-400 font-semibold tracking-wide text-stone-800 uppercase shadow-md shadow-yellow-400/50 transition-colors duration-300 hover:bg-yellow-500 hover:shadow-md hover:shadow-yellow-500/50 focus:ring focus:ring-yellow-300 focus:ring-offset-2 focus:outline-none active:bg-yellow-600 disabled:cursor-not-allowed ";

  const styles = {
    primary: baseStyle + "px-4 py-3 md:px-6 md:py-4",
    small: baseStyle + "px-2 py-1 md:px-3 md:py-2 text-xs",
    secondary:
      "inline-block rounded-full border-2 border-stone-300 px-2 py-1 text-xs font-semibold tracking-wide text-stone-400 uppercase shadow-md transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:ring-2 focus:ring-stone-300 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed md:px-3 md:py-2",
    round: baseStyle + "w-6 h-6 md:w-8 md:h-8",
  };

  if (to) {
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
