import { ErrorResponse, useNavigate, useRouteError } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  const error = useRouteError() as ErrorResponse | Error;
  const message = "data" in error ? error.data : error.message;

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{message}</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default NotFound;
