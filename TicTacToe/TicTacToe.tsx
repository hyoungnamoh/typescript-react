import * as React from 'react';
import { useState, useCallback, useRef, useReducer, Reducer } from 'react';
import Table from './Table';

interface ReducerState {
  winner: 'O' | 'X' | '',
  turn: 'O' | 'X',
  tableData: string[][],
  recentCell: [number, number],
}

const initialState: ReducerState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  recentCell: [-1, -1],
}

// actions
export const SET_WINNER = 'SET_WINNER' as const;
export const CLICK_CELL = 'CLICK_CELL' as const;
export const CHANGE_TURN = 'CHANGE_TURN' as const;
export const RESET_GAME = 'RESET_GAME' as const;

// Action 객체의 타입 
interface SetWinnerAction {
  type: typeof SET_WINNER;
  winner: 'O' | 'X',
}

interface ClickCellAction {
  type: typeof CLICK_CELL;
  row: number,
  cell: number,
}

interface ChangeTrunAction {
  type: typeof CHANGE_TURN;
}

interface ResetGameAction {
  type: typeof RESET_GAME;
}

// action creator
const setWinner = (winner: 'O' | 'X'): SetWinnerAction => {
  return { type: SET_WINNER, winner }
}

const clickCell = (row: number, cell: number): ClickCellAction => {
  return { type: CLICK_CELL, row, cell }
}

// reducer
type ReducerActions = SetWinnerAction | ClickCellAction | ChangeTrunAction | ResetGameAction;
const reducer = (state: ReducerState, action: ReducerActions): ReducerState => { //매개변수 state를 return되는 RducerState 새로운 state를 반환
  switch (action.type) {
    case SET_WINNER:
      return {
        ...state,
        winner: action.winner,
      }
    case CLICK_CELL:
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]];
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell],
      }
    case CHANGE_TURN:
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      }
    case RESET_GAME:
      return {
        ...state,
        turn: 'O',
        tableData: [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        recentCell: [-1, -1],
      }
    default:
      return state;
  }
}

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state;

  const onClickTable = useCallback(() => {
    dispatch(setWinner('O'));
  }, []);
  return (
    <>
    </>
  );
}

export default TicTacToe;