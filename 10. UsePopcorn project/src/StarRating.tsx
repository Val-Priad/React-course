import { useState } from "react";

export default function StarRating({
  maxRating = 5,
  fill = "hsl(60, 100%, 50%)",
  stroke = "hsl(0, 0%, 0%)",
  size = "48px",
  className = "",
  messages = [],
  defaultRating = 0,
  onSetRating = (rating) => {},
}: {
  maxRating?: number;
  fill?: string;
  stroke?: string;
  size?: string;
  className?: string;
  messages?: string[];
  defaultRating?: number;
  onSetRating?: (rating: number) => void;
}) {
  let [rating, setRating] = useState(defaultRating);
  let [hoverRating, setHoverRating] = useState(0);

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  };

  const starContainer = {
    display: "flex",
    gap: "4px",
  };

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color: stroke,
    fontSize: size,
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainer}>
        {Array.from({ length: maxRating }).map((_, idx) => (
          <Star
            key={idx}
            num={idx + 1}
            rating={rating}
            hoverRating={hoverRating}
            onClick={() => {
              setRating(idx + 1);
              onSetRating(idx + 1);
            }}
            onMouseEnter={() => setHoverRating(idx + 1)}
            onMouseLeave={() => setHoverRating(0)}
            fill={fill}
            stroke={stroke}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[hoverRating ? hoverRating - 1 : rating - 1]
          : hoverRating || rating || ""}
      </p>
    </div>
  );
}

function Star({
  num,
  rating,
  hoverRating,
  size,
  fill,
  stroke,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  num: number;
  rating: number;
  hoverRating: number;
  size: string;
  fill: string;
  stroke: string;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const starStyle = {
    width: size,
    height: size,
    display: "block",
    cursor: "pointer",
  };
  return (
    <span
      role="button"
      style={starStyle}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill={num <= rating || num <= hoverRating ? fill : "#fff"}
        stroke={stroke}
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </span>
  );
}
/*
FULL STAR

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20"
  fill="#000"
  stroke="#000"
>
  <path
    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
  />
</svg>


EMPTY STAR

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="#000"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="{2}"
    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
  />
</svg>

*/
