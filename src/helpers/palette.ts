import { AnswerCellState, AnswerLadderCellState } from '@/types/questions';

const getAnswerCellThemeByState = (state: AnswerCellState) => {
  const palette: { fill: string; stroke: string; state: AnswerCellState } = {
    state,
    fill: '#fff',
    stroke: '#d0d0d8',
  };

  if (state === 'selected') {
    palette.fill = '#fff3eb';
    palette.stroke = '#ff8b37';
  } else if (state === 'correct') {
    palette.fill = '#e6faea';
    palette.stroke = '#47d867';
  } else if (state === 'wrong') {
    palette.fill = '#fdeeed';
    palette.stroke = '#ec6259';
  }

  return palette;
};

const getLadderCellThemeByIndex = (
  currentIndex: number,
  reversedIndex: number,
) => {
  const palette: { stroke: string; state: AnswerLadderCellState } = {
    stroke: '#d0d0d8',
    state: 'regular',
  };

  if (reversedIndex < currentIndex) {
    palette.state = 'disabled';
  }

  if (reversedIndex === currentIndex) {
    palette.stroke = '#ff8b37';
    palette.state = 'highlighted';
  }

  return palette;
};

export { getAnswerCellThemeByState, getLadderCellThemeByIndex };
