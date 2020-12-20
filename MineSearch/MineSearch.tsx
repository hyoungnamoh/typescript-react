import * as React from 'react';
import { useState, useCallback, useMemo, useEffect, useReducer, Dispatch } from 'react';

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESITON: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0, // 주변 지뢰 갯수, 0 이상이면 모두 열려있는 상태
} as const; // 값 자체도 바뀔일 없는 코드들 const로 고정

interface ReducerState {
  tableData: number[][],
  data: {
    row: number,
    cell: number,
    mine: number,
  }
  timer: number,
  result: string,
  halted: boolean,
  openedCount: number, // 전체칸수 - 연 칸수
}

const initialState: ReducerState = {
  tableData: [],
  data: {
    row: 0,
    cell: 0,
    mine: 0,
  },
  timer: 0,
  result: '',
  halted: true,
  openedCount: 0,
}

const plantMine = (row: number, cell: number, mine: number): Codes[][] => {
  const candidate = Array(row * cell).fill(undefined).map((arr, i) => {
    return i;
  });
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }
  const data: Codes[][] = [];
  for (let i = 0; i < row; i++) {
    const rowData: Codes[] = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }
  console.log(data);
  return data;
};

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
const startGame = (row: number, cell: number, mine: number): StartGameAction => {
  return {
    type: START_GAME, row, cell, mine,
  }
}

const openCell = (row: number, cell: number, mine: number): OpenCellAction => {
  return {
    type: OPEN_CELL, row, cell
  }
}

const clickMine = (row: number, cell: number, mine: number): ClickMineAction => {
  return {
    type: CLICK_MINE, row, cell
  }
}

const flagMine = (row: number, cell: number, mine: number): FlagMineAction => {
  return {
    type: FLAG_CELL, row, cell
  }
}

const questionCell = (row: number, cell: number, mine: number): QuestionCellAction => {
  return {
    type: QUESTION_CELL, row, cell
  }
}

const normalizeCell = (row: number, cell: number, mine: number): NormalizeCellAction => {
  return {
    type: NORMALIZE_CELL, row, cell
  }
}

const incrementTimer = (row: number, cell: number, mine: number): IncrementTimerAction => {
  return {
    type: INCREMENT_TIMER
  }
}

//리듀서에 한번에 넣기위해 action들을 한 곳에 모아줌
type ReducerActions = StartGameAction | OpenCellAction | ClickMineAction | FlagMineAction | QuestionCellAction | NormalizeCellAction | IncrementTimerAction;

// 예전 state가 있다면, 액션을 dispatch할때 action에 따라서 새로운 state를 리턴함
// 불변성을 지키면서 과거 state와 새로운 action을 통해 새로운 state를 리턴
const reducer = (state = initialState, action: ReducerActions): ReducerState => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        data: {
          row: action.row,
          cell: action.cell,
          mine: action.mine,
        },
        openedCount: 0,
        tableData: plantMine(action.row, action.cell, action.mine),
        halted: false,
        timer: 0,
      }
    case OPEN_CELL:
      return;
    case CLICK_MINE: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.FLAG;
      }
      return {
        ...state,
        tableData,
      }
    }
    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.FLAG;
      }
      return {
        ...state,
        tableData,
      };
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION;
      }
      return {
        ...state,
        tableData,
      };
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
        tableData[action.row][action.cell] = CODE.MINE;
      } else {
        tableData[action.row][action.cell] = CODE.NORMAL;
      }
      return {
        ...state,
        tableData,
      };
    }
    case INCREMENT_TIMER: {
      return {
        ...state,
        timer: state.timer + 1,
      }
    }
    default:
      return state;
  }
    default:
break;
  }
}

const MineSearch = () => {
  return (
    <>
    </>
  )
}

export default MineSearch;