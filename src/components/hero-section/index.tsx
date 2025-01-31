import Image from 'next/image';
import { ReactNode } from 'react';

import Button from '@/components/ui/button';

import styles from './index.module.scss';

interface HeroSectionProps {
  imageSrc: string;
  imageAlt: string;
  buttonText: string;
  onButtonClick: () => void;
  children?: ReactNode;
}

const HeroSection = ({
  imageSrc,
  imageAlt,
  buttonText,
  onButtonClick,
  children,
}: HeroSectionProps) => {
  return (
    <section className={styles.heroSection}>
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={624}
        height={367}
        className={styles.heroSection__image}
        priority
      />

      <div className={styles.heroSection__content}>
        <div>{children}</div>
        <Button onClick={onButtonClick}>{buttonText}</Button>
      </div>
    </section>
  );
};

export default HeroSection;
