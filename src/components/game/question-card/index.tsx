import { AnswerCellState, Question } from '@/types/questions';

import AnswerOption from '../answer-option';

import styles from './index.module.scss';

interface QuestionCardProps {
  question: Question;
  answerStates: Record<string, AnswerCellState>;
  isLocked: boolean;
  onAnswerClick: (answerId: string) => void;
}

export default function QuestionCard({
  question,
  answerStates,
  isLocked,
  onAnswerClick,
}: QuestionCardProps) {
  return (
    <div className={styles.questionCard}>
      <p className={styles.questionText}>{question.question}</p>

      <div className={styles.answers}>
        {question.answers.map((ans) => (
          <AnswerOption
            key={ans.id}
            answerId={ans.id}
            answer={ans.text}
            state={answerStates[ans.id]}
            isLocked={isLocked}
            onClick={() => {
              onAnswerClick(ans.id);
            }}
          />
        ))}
      </div>
    </div>
  );
}
