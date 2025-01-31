'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import ProgressCell from '@/components/game/progress-cell';
import QuestionCard from '@/components/game/question-card';
import MobilePrizeSidebar from '@/components/game/sidebar';
import { getLadderCellThemeByIndex } from '@/helpers/palette';
import { useGameLogic } from '@/hooks/useGameLogic';
import { fetchQuestions } from '@/lib/quizApi';
import { Question } from '@/types/questions';

import styles from './page.module.scss';

export default function GamePage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    void (async () => {
      try {
        const data = await fetchQuestions();
        setQuestions(data);
      } catch (e) {
        console.error('GamePage: error fetching GraphQL data:', e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const {
    currentQuestion,
    currentIndex,
    totalPrize,
    isGameOver,
    answerStates,
    isLocked,
    handleAnswerClick,
  } = useGameLogic({ questions });

  useEffect(() => {
    if (isGameOver) {
      router.push(`/result?prize=${totalPrize.toString()}`);
    }
  }, [isGameOver, totalPrize, router]);

  const prizes = questions.map((q) => q.money);

  if (isLoading) {
    return <div>Loading questions...</div>;
  }

  if (!questions.length) {
    return <div>No questions returned!</div>;
  }

  return (
    <main className={styles.gamePage}>
      <MobilePrizeSidebar
        prizes={prizes}
        currentIndex={currentIndex}
        isOpen={isSidebarOpen}
        onClose={() => {
          setIsSidebarOpen(false);
        }}
      />

      <div className={styles.questionSection}>
        <button
          className={styles.hamburger}
          onClick={() => {
            setIsSidebarOpen(true);
          }}
        >
          <Image alt="menu" width={28} height={28} src="/menu.svg" />
        </button>

        <QuestionCard
          question={currentQuestion}
          answerStates={answerStates}
          isLocked={isLocked}
          onAnswerClick={handleAnswerClick}
        />
      </div>

      <div className={styles.prizeSection}>
        {prizes
          .slice()
          .reverse()
          .map((prize, i) => {
            const reversedIndex = prizes.length - 1 - i;
            const palette = getLadderCellThemeByIndex(
              currentIndex,
              reversedIndex,
            );

            return (
              <ProgressCell
                key={i}
                amount={prize}
                strokeColor={palette.stroke}
                state={palette.state}
              />
            );
          })}
      </div>
    </main>
  );
}
