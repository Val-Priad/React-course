import { useQuestions } from "../Contexts/QuestionsContext";

function Question({ children }: { children: React.ReactNode }) {
  const { questions, questionIdx } = useQuestions();
  return (
    <div>
      <h4>{questions[questionIdx].question}</h4>
      {children}
    </div>
  );
}

export default Question;
