import { ActionDispatch, createContext, useContext } from "react";
import { TAction, TQuestion } from "./QuestionsProvider";

type TQuestionsContext = {
  questions: TQuestion[];
  status: string;
  questionIdx: number;
  answerIdx: number | null;
  points: number;
  highScore: number;
  secondsRemaining: number;
  questionsQty: number;
  maxPossiblePoints: number;
  dispatch: ActionDispatch<[action: TAction]>;
};

export const QuestionsContext = createContext<TQuestionsContext | undefined>(
  undefined
);

export function useQuestions() {
  const context = useContext(QuestionsContext);

  if (context === undefined) {
    throw new Error(
      "You have used `useQuestions` out of `QuestionsProvider` - context is undefined"
    );
  }
  return context;
}
