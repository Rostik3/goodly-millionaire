'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import HeroSection from '@/components/hero-section';
import Headline from '@/components/ui/headline';
import { getFormattedMoneyAmount } from '@/helpers';

import styles from './page.module.scss';

export default function ResultPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [earned, setEarned] = useState(0);

  useEffect(() => {
    const activeSession = localStorage.getItem('activeGameSession');
    if (activeSession) {
      router.push('/game');
    } else {
      const earnedParam = searchParams.get('prize');
      const prizeValue = earnedParam ? parseInt(earnedParam, 10) : 0;
      setEarned(prizeValue);
    }
  }, [searchParams, router]);

  const handleGameRestart = () => {
    router.push('/game');
  };

  return (
    <main className={styles.pageContainer}>
      <HeroSection
        imageSrc="/thumb.svg"
        imageAlt="Thumb illustration"
        buttonText="Try again"
        onButtonClick={handleGameRestart}
      >
        <p className={styles.heroSection__totalScore}>Total score:</p>
        <Headline>{`${getFormattedMoneyAmount(earned)} earned`}</Headline>
      </HeroSection>
    </main>
  );
}
