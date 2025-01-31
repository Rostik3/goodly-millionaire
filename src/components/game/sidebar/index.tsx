import Image from 'next/image';
import React from 'react';

import ProgressCell from '@/components/game/progress-cell';
import { getLadderCellThemeByIndex } from '@/helpers';

import styles from './index.module.scss';

interface MobilePrizeSidebarProps {
  prizes: number[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const MobilePrizeSidebar = ({
  prizes,
  currentIndex,
  isOpen,
  onClose,
}: MobilePrizeSidebarProps) => {
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
      <button className={styles.closeButton} onClick={onClose}>
        <Image alt="close" width={28} height={28} src="/close.svg" />
      </button>

      <div className={styles.prizeList}>
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
    </aside>
  );
};

export default MobilePrizeSidebar;
