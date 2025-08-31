import { Link, useNavigate } from "react-router-dom";

function LinkButton({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}) {
  const style = "text-sm text-blue-500 hover:text-blue-700 hover:underline";

  const navigate = useNavigate();

  if (to === "-1") {
    return (
      <button className="style" onClick={() => navigate(-1)}>
        {children}
      </button>
    );
  }

  return (
    <Link className={style} to={to}>
      {children}
    </Link>
  );
}

export default LinkButton;
