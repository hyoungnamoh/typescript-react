import * as React from 'react';
import { useContext } from 'react';
import { TableContext } from './MineSearch';
import Tr from './Tr';

const Table = () => {
  const { tableData } = useContext(TableContext);
  return (
    <table>
      {
        Array(tableData.length).fill(null).map((tr, i) => <Tr rowIndex={i} />)
      }
    </table>
  )

}

export default Table;