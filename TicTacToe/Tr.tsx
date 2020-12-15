import * as React from 'react';
import { useMemo, FC, Dispatch } from 'react';
import Td from './Td';

interface Props {
  rowData: string[];
  rowIndex: number;
  dispatch: Dispatch<any>;
}

const Tr: FC<Props> = ({ rowData, rowIndex, dispatch }) => {
  return (
    <tr>
      {
        Array(rowData.length).fill(null).map((td, i) => (
          useMemo(
            () => <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>{''}</Td>, // {''} === props.children 얘도 타입 정해줘야함
            [rowData[i]],
          )
        ))
      }
    </tr>
  );
}

export default Tr;