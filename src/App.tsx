import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./App.css";
import { Menu } from "./components/Menu";
import { Question } from "./components/Question";
import type { QuestionsFile } from "./types/Question";

function App() {
  const [questionsPool, setQuestionsPool] = useState<QuestionsFile | null>(null);
  const [allQuestions, setAllQuestions] = useState<QuestionsFile | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [currentDifficulty, setCurrentDifficulty] = useState<keyof QuestionsFile | null>(null);

  useEffect(() => {
    axios.get("/questions.json").then((response) => {
      setAllQuestions(response.data);
      setQuestionsPool(response.data);
    });
  }, []);

  const handleSelectDifficulty = (level: keyof QuestionsFile) => {
    if (!questionsPool) return;
    const avaliable = questionsPool[level];

    if (avaliable && avaliable.length > 0) {
      const randomIndex = Math.floor(Math.random() * avaliable.length);
      setCurrentQuestion(avaliable[randomIndex]);
      setCurrentDifficulty(level);
    } else {
      toast.error(`As questões do nível ${level === "easy" ? "fácil" : level === "medium" ? "médio" : "difícil"} não estão disponíveis.`);
    }
  };

  const handleRemove = () => {
    if (currentQuestion && currentDifficulty && questionsPool) {
      const updatedPool = {
        ...questionsPool,
        [currentDifficulty]: questionsPool[currentDifficulty]!.filter((question) => question.id !== currentQuestion.id)
      };
      setQuestionsPool(updatedPool); // Atualiza o estado
      setCurrentQuestion(null); // Volta para o menu
      setCurrentDifficulty(null);
    }
  };

  // 5. Reset (Usa o backup allQuestions)
  const handleReset = () => {
    if (allQuestions) {
      setQuestionsPool(allQuestions); // Restaura o pool original do backup
      setCurrentQuestion(null);
      setCurrentDifficulty(null);
    }
  };

  if (!questionsPool) return <div className="text-white text-center mt-10">Carregando questões...</div>;
  return (
    <>
      {currentQuestion ? (
        <Question data={currentQuestion} onBack={handleRemove} onReset={handleReset} />
      ) : (
        <Menu counts={questionsPool} onSelect={handleSelectDifficulty} />
      )}
    </>
  );
}

export default App;
