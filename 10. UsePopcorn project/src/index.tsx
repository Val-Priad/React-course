import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import StarRating from "./StarRating";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// root.render(
//   <React.StrictMode>
//     <StarRating maxRating={5} />
//     <StarRating maxRating={10} />
//     <StarRating
//       stroke="hsl(240, 100%, 50%)"
//       size="24px"
//       fill="hsl(0, 100%, 50%)"
//       messages={["terrible", "bad", "okay", "good", "amazing"]}
//       defaultRating={3}
//     />
//   </React.StrictMode>
// );
