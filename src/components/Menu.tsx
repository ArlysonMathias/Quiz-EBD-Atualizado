import type { QuestionsFile } from "../types/Question";
import { Button } from "./Button";
type MenuProps = {
  onSelect: (level: keyof QuestionsFile) => void;
  counts: QuestionsFile;
};

const difficultyMap: Record<keyof QuestionsFile, { label: string; variant: "easy" | "medium" | "hard" }> = {
  easy: { label: "Fácil", variant: "easy" },
  medium: { label: "Médio", variant: "medium" },
  hard: { label: "Difícil", variant: "hard" }
};

export const Menu = ({ onSelect, counts }: MenuProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold text-white mb-6">Bem vindo(a) ao desafio bíblico!</h1>
        <h1 className="text-2xl font-bold text-white mb-6">Escolha sua dificuldade</h1>

        <div className="flex flex-col gap-4">
          {(Object.keys(counts) as Array<keyof QuestionsFile>).map((level) => (
            <Button key={level} onClick={() => onSelect(level)} variant={difficultyMap[level].variant}>
              {difficultyMap[level].label} <span className="text-xs">{counts[level]?.length}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
