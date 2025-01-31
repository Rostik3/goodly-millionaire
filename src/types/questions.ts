interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: number;
  question: string;
  money: number;
  answers: Answer[];
}

interface GameState {
  currentIndex: number;
  totalPrize: number;
  isGameOver: boolean;
}

type AnswerCellState = 'inactive' | 'selected' | 'correct' | 'wrong';

type AnswerLadderCellState = 'disabled' | 'highlighted' | 'regular';

export type {
  Answer,
  Question,
  AnswerCellState,
  AnswerLadderCellState,
  GameState,
};
