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

export const START_GAME = 'START_GAME' as const;
export const OPEN_CELL = 'OPEN_CELL' as const;
export const CLICK_MINE = 'CLICK_MINE' as const;
export const FLAG_CELL = 'FLAG_CELL' as const;
export const QUESTION_CELL = 'QUESTION_CELL' as const;
export const NORMALIZE_CELL = 'NORMALIZE_CELL' as const;
export const INCREMENT_TIMER = 'INCREMENT_TIMER' as const;

const MineSearch = () => {
  return (
    <>
    </>
  )
}

export default MineSearch;