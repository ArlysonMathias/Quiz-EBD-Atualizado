import type { QuestionsFile } from "../types/Question";
import { Button } from "./Button";
type MenuProps = {
  onSelect: (level: keyof QuestionsFile) => void;
  counts: QuestionsFile;
};

export const Menu = ({ onSelect, counts }: MenuProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold text-white mb-6">Bem vindo(a) ao desafio bíblico!</h1>
        <h1 className="text-2xl font-bold text-white mb-6">Escolha sua dificuldade</h1>

        <div className="flex flex-col gap-4">
          <Button onClick={() => onSelect("easy")} variant="easy">
            Fácil <span className="text-xs text-left">{counts.easy?.length}</span>
          </Button>
          <Button onClick={() => onSelect("medium")} variant="medium">
            Médio <span className="text-xs">{counts.medium?.length}</span>
          </Button>
          <Button onClick={() => onSelect("hard")} variant="hard">
            Difícil <span className="text-xs">{counts.hard?.length}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
