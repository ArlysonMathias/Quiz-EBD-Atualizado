import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./Button";

interface QuestionProps {
  data: {
    id: number;
    text: string;
    options: string[];
    correct: number;
  } | null;
  onBack: () => void;
  onReset: () => void;
}

export const Question = ({ data, onBack, onReset }: QuestionProps) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const hasAnswered = selectedIdx !== null;

  const getColors = (index: number) => {
    // se o usuário ainda não respondeu
    if (!hasAnswered) {
      return "bg-gray-500 hover:bg-gray-600";
    }

    const isCorrect = index === data?.correct;
    const isSelected = index === selectedIdx;

    // se o usuário respondeu corretamente
    if (isCorrect) {
      return "bg-green-500 text-white";
    }

    // 3. Se o usuário clicou NESTA aqui e ela estava errada
    if (isSelected && !isCorrect) {
      return "bg-red-500 text-white";
    }

    // 4. Opções erradas que NÃO foram clicadas (ficam neutras/apagadas)
    return "bg-slate-200 text-slate-400 opacity-50";
  };

  const verifyAnswer = (index: number) => {
    if (index === data?.correct) {
      toast.success("Resposta correta!");
    } else {
      toast.error("Resposta incorreta!");
    }
  };

  if (!data) return null;

  return (
    <div className="min-h-screen  flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg flex flex-col items-center w-full max-w-xl text-center">
        <h2 className="text-2xl mt-4 mb-8">{data?.text}</h2>
        <div className="flex flex-col">
          {data?.options.map((option, index) => (
            <button
              type="button"
              disabled={hasAnswered}
              onClick={() => {
                setSelectedIdx(index);
                verifyAnswer(index);
              }}
              key={index}
              className={`mt-4 btn cursor-pointer ${getColors(index)}
               text-white font-bold py-2 px-4 rounded-2xl`}>
              {option}
            </button>
          ))}
          <div className="w-full p-3 flex justify-between gap-4 mt-4">
            {hasAnswered ? (
              <>
                <Button onClick={onBack} className="py-2 px-4">
                  Voltar
                </Button>
                <Button onClick={onReset} className="py-2 px-4 bg-red-600 hover:bg-red-700">
                  Resetar
                </Button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
