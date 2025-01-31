import { getAnswerCellThemeByState } from '@/helpers';
import { AnswerCellState } from '@/types/questions';

import styles from './index.module.scss';

interface AnswerOptionProps {
  answer: string;
  answerId: string;
  state: AnswerCellState;
  isLocked: boolean;
  onClick: () => void;
}

const AnswerOption = ({
  answer,
  answerId,
  state,
  isLocked,
  onClick,
}: AnswerOptionProps) => {
  const palette = getAnswerCellThemeByState(state);

  // Disable clicks between new possible answers for the proper transition between answer states
  const handleClick = () => {
    if (!isLocked && state === 'inactive') {
      onClick();
    }
  };

  return (
    <div
      className={`${styles.answerCell} ${styles[palette.state]}`}
      onClick={handleClick}
    >
      <svg
        width={390}
        height={72}
        viewBox="0 0 240 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.4526 4.63788C15.6376 2.01596 18.8742 0.5 22.2872 0.5H217.713C221.126 0.5 224.362 2.01597 226.547 4.63788L239.349 20L226.547 35.3621C224.362 37.984 221.126 39.5 217.713 39.5H22.2872C18.8742 39.5 15.6376 37.984 13.4526 35.3621L0.650853 20L13.4526 4.63788Z"
          fill={palette.fill}
          stroke={palette.stroke}
        />
      </svg>
      <div className={styles.content}>
        <span className={styles.answerId}>{answerId}</span>
        <span className={styles.answer}>{answer}</span>
      </div>
    </div>
  );
};

export default AnswerOption;
