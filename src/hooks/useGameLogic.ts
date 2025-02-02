import { useEffect, useRef, useState } from 'react';

import { ANSWER_CELL_STATE, STORAGE_KEY } from '@/helpers';
import { fetchQuestions } from '@/lib/quizApi';
import type { AnswerCellState, GameState, Question } from '@/types/questions';

export function useGameLogic() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalPrize, setTotalPrize] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // For multiple-correct answers
  const [foundCorrectCount, setFoundCorrectCount] = useState(0);

  const [answerStates, setAnswerStates] = useState<
    Record<string, AnswerCellState>
  >({});

  // Locks the UI while we animate selected -> correct/wrong
  const [isLocked, setIsLocked] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [hasRestored, setHasRestored] = useState(false);

  const currentQuestion = questions[currentIndex] || null;
  const correctAnswers = !isLoading
    ? currentQuestion.answers.filter((a) => a.isCorrect)
    : [];
  const currentQuestionId = !isLoading ? currentQuestion.id : null;

  useEffect(() => {
    void (async () => {
      try {
        const data = await fetchQuestions();
        setQuestions(data);
      } catch (e) {
        console.error(
          'useGameLogic.ts: error fetching questions from gql endpoint:',
          e,
        );
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState) as GameState;
        setCurrentIndex(parsed.currentIndex);
        setTotalPrize(parsed.totalPrize);
        setIsGameOver(parsed.isGameOver);
      } catch (err) {
        console.error('useGameLogic.ts: error parsing localStorage:', err);
      }
    }
    setHasRestored(true);
  }, []);

  useEffect(() => {
    if (!hasRestored) return;
    const gameState: GameState = {
      currentIndex,
      totalPrize,
      isGameOver,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  }, [hasRestored, currentIndex, totalPrize, isGameOver]);

  useEffect(() => {
    if (isGameOver) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [isGameOver, totalPrize]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!currentQuestion) return;
    const initStates: Record<string, AnswerCellState> = {};
    currentQuestion.answers.forEach((ans) => {
      initStates[ans.id] = ANSWER_CELL_STATE.INACTIVE;
    });
    setAnswerStates(initStates);
    setFoundCorrectCount(0);
    setIsLocked(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionId, currentIndex]);

  const handleAnswerClick = (answerId: string) => {
    if (isGameOver || isLocked) return;

    const answer = currentQuestion.answers.find((a) => a.id === answerId);

    if (!answer) {
      console.warn('useGameLogic.ts: answer not found by id:', answerId);
      return;
    }

    const currentState = answerStates[answerId];
    if (
      currentState === ANSWER_CELL_STATE.CORRECT ||
      currentState === ANSWER_CELL_STATE.WRONG
    ) {
      return;
    }

    setAnswerStates((prev) => ({
      ...prev,
      [answerId]: ANSWER_CELL_STATE.SELECTED,
    }));
    setIsLocked(true);

    timeoutRef.current = setTimeout(() => {
      if (answer.isCorrect) {
        setAnswerStates((prev) => ({
          ...prev,
          [answerId]: ANSWER_CELL_STATE.CORRECT,
        }));

        const newCount = foundCorrectCount + 1;
        setFoundCorrectCount(newCount);

        timeoutRef.current = setTimeout(() => {
          if (newCount === correctAnswers.length) {
            setTotalPrize(currentQuestion.money);

            if (currentIndex < questions.length - 1) {
              setCurrentIndex((prev) => prev + 1);
              setAnswerStates({});
              setFoundCorrectCount(0);
              setIsLocked(false);
            } else {
              setIsGameOver(true);
            }
          } else {
            setIsLocked(false);
          }
        }, 1000);
      } else {
        setAnswerStates((prev) => {
          const wrongPickStates = { ...prev };

          // Loop through each correct answer to let user know correct answer/answers even on the wrong pick
          correctAnswers.forEach(({ id }) => {
            if (wrongPickStates.hasOwnProperty(id)) {
              wrongPickStates[id] = ANSWER_CELL_STATE.CORRECT;
            }
          });

          wrongPickStates[answerId] = ANSWER_CELL_STATE.WRONG;

          return wrongPickStates;
        });

        timeoutRef.current = setTimeout(() => {
          setIsGameOver(true);
        }, 1000);
      }
    }, 1000);
  };

  return {
    questions,
    currentQuestion,
    currentIndex,
    totalPrize,
    isGameOver,
    answerStates,
    isLocked,
    isLoading,
    handleAnswerClick,
  };
}
