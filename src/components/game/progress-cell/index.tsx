import { getFormattedMoneyAmount } from '@/helpers';
import { AnswerLadderCellState } from '@/types/questions';

import styles from './index.module.scss';

interface ProgressCellProps {
  amount: number;
  strokeColor: string;
  state: AnswerLadderCellState;
}

const ProgressCell = ({
  amount,
  strokeColor = '#d0d0d8',
  state,
  ...props
}: ProgressCellProps) => {
  return (
    <div className={`${styles.ladderCell} ${styles[state]}`} {...props}>
      <svg
        width={240}
        height={40}
        viewBox="0 0 240 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.4526 4.63788C15.6376 2.01596 18.8742 0.5 22.2872 0.5H217.713C221.126 0.5 224.362 2.01597 226.547 4.63788L239.349 20L226.547 35.3621C224.362 37.984 221.126 39.5 217.713 39.5H22.2872C18.8742 39.5 15.6376 37.984 13.4526 35.3621L0.650853 20L13.4526 4.63788Z"
          fill="#fff"
          stroke={strokeColor}
        />
      </svg>
      <div className={styles.content}>
        <span className={styles.price}>{getFormattedMoneyAmount(amount)}</span>
      </div>
    </div>
  );
};

export default ProgressCell;
