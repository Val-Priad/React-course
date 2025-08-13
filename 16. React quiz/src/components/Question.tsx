import React from "react";
import { TQuestion } from "./App";

function Question({
  question,
  dispatch,
  children,
}: {
  question: TQuestion;
  dispatch: React.Dispatch<any>;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4>{question.question}</h4>
      {children}
    </div>
  );
}

export default Question;
