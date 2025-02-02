'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import ProgressCell from '@/components/game/progress-cell';
import QuestionCard from '@/components/game/question-card';
import MobilePrizeSidebar from '@/components/game/sidebar';
import Loader from '@/components/ui/loader';
import { getLadderCellThemeByIndex, RESULT_PAGE_URL } from '@/helpers';
import { useGameLogic } from '@/hooks/useGameLogic';

import styles from './page.module.scss';

export default function GamePage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const {
    questions,
    currentQuestion,
    currentIndex,
    totalPrize,
    isGameOver,
    answerStates,
    isLocked,
    isLoading,
    handleAnswerClick,
  } = useGameLogic();

  useEffect(() => {
    if (isGameOver) {
      router.push(`${RESULT_PAGE_URL}?prize=${totalPrize.toString()}`);
    }
  }, [isGameOver, totalPrize, router]);

  const prizes = questions.map((q) => q.money);

  if (isLoading) {
    return <Loader />;
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
