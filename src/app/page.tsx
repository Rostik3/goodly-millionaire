'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import HeroSection from '@/components/hero-section';
import Headline from '@/components/ui/headline';
import { STORAGE_KEY } from '@/helpers';

import styles from './page.module.scss';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const activeSession = localStorage.getItem(STORAGE_KEY);
    if (activeSession) {
      router.push('/game');
    }
  }, [router]);

  const handleGameStart = () => {
    router.push('/game');
  };

  return (
    <main className={styles.pageContainer}>
      <HeroSection
        imageSrc="/thumb.svg"
        imageAlt="Thumb illustration"
        buttonText="Start"
        onButtonClick={handleGameStart}
      >
        <Headline>
          Who wants to be <br /> a millionaire?
        </Headline>
      </HeroSection>
    </main>
  );
}
