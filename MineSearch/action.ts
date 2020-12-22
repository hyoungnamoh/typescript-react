export const START_GAME = 'START_GAME' as const; //게임 시작
export const OPEN_CELL = 'OPEN_CELL' as const; //칸 클릭 
export const CLICK_MINE = 'CLICK_MINE' as const; //지뢰클릭
export const FLAG_CELL = 'FLAG_CELL' as const; //깃발 꼽는
export const QUESTION_CELL = 'QUESTION_CELL' as const; // 물음표 꼽는
export const NORMALIZE_CELL = 'NORMALIZE_CELL' as const; // 물음표나 깃발 정상으로 돌리기
export const INCREMENT_TIMER = 'INCREMENT_TIMER' as const; //타이머 하나씩 올리기

interface StartGameAction {
  type: typeof START_GAME,
  row: number,
  cell: number,
  mine: number,
}

interface OpenCellAction {
  type: typeof OPEN_CELL,
  row: number,
  cell: number,
}

interface ClickMineAction {
  type: typeof CLICK_MINE,
  row: number,
  cell: number,
}

interface FlagMineAction {
  type: typeof FLAG_CELL,
  row: number,
  cell: number,
}

interface QuestionCellAction {
  type: typeof QUESTION_CELL,
  row: number,
  cell: number,
}

interface NormalizeCellAction {
  type: typeof NORMALIZE_CELL,
  row: number,
  cell: number,
}

interface IncrementTimerAction {
  type: typeof INCREMENT_TIMER,
}

// action creator 동적으로 액션 생성해주는 친구
export const startGame = (row: number, cell: number, mine: number): StartGameAction => {
  return {
    type: START_GAME, row, cell, mine,
  }
}

export const openCell = (row: number, cell: number): OpenCellAction => {
  return {
    type: OPEN_CELL, row, cell
  }
}

export const clickMine = (row: number, cell: number): ClickMineAction => {
  return {
    type: CLICK_MINE, row, cell
  }
}

export const flagMine = (row: number, cell: number): FlagMineAction => {
  return {
    type: FLAG_CELL, row, cell
  }
}

export const questionCell = (row: number, cell: number): QuestionCellAction => {
  return {
    type: QUESTION_CELL, row, cell
  }
}

export const normalizeCell = (row: number, cell: number): NormalizeCellAction => {
  return {
    type: NORMALIZE_CELL, row, cell
  }
}

export const incrementTimer = (row: number, cell: number): IncrementTimerAction => {
  return {
    type: INCREMENT_TIMER
  }
}

//리듀서에 한번에 넣기위해 action들을 한 곳에 모아줌
export type ReducerActions = StartGameAction | OpenCellAction | ClickMineAction | FlagMineAction | QuestionCellAction | NormalizeCellAction | IncrementTimerAction;