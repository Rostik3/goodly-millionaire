const STORAGE_KEY = 'activeGameSession';
const GAME_PAGE_URL = '/game';
const RESULT_PAGE_URL = '/result';

enum ANSWER_CELL_STATE {
  WRONG = 'wrong',
  CORRECT = 'correct',
  INACTIVE = 'inactive',
  SELECTED = 'selected',
}

enum ANSWER_LADDER_CELL_STATE {
  DISABLED = 'disabled',
  HIGHLIGHTED = 'highlighted',
  REGULAR = 'regular',
}

export {
  STORAGE_KEY,
  GAME_PAGE_URL,
  RESULT_PAGE_URL,
  ANSWER_CELL_STATE,
  ANSWER_LADDER_CELL_STATE,
};
