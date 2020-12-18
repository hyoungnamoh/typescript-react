import * as React from 'react';
import { useMemo, FC, Dispatch } from 'react';
import { clickCell, CLICK_CELL } from './TicTacToe';

interface Props {
  cellData: string;
  rowIndex: number;
  cellIndex: number;
  dispatch: Dispatch<any>;
  children: string;
}

const Td: FC<Props> = ({ rowIndex, dispatch, cellIndex, cellData  }) => {
  const onClickTd = React.useCallback(() => {
    if(cellData) {
      return;
    }
    dispatch(clickCell(rowIndex, cellIndex));
  }, [cellData]);
  return (
    <td onClick={onClickTd}>{cellData}</td>
  );
}

export default Td;