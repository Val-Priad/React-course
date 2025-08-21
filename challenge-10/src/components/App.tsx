import Main from "./Main";
import Header from "./Header";
import Loader from "./Loader";
import ErrorMessage from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Options from "./Options";
import NextButton from "./NextButton";
import ProgressBar from "./ProgressBar";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";
import { useQuestions } from "../Contexts/QuestionsContext";

function App() {
  const { status } = useQuestions();
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorMessage />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <ProgressBar />
            <Question>
              <Options />
            </Question>
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
