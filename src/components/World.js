import React from 'react';
import Cell from './Cell';

export default function World(props) {
  const width = props.cols * 11; // 10px + 1px border right
  let rowsArray = [];

  for (let r = 0; r < props.rows; r++) {
    for (let c = 0; c < props.cols; c++) {
      let newKey = r + "-" + c;

      let cellClass = props.fullWorld[r][c]
        ? "cell live"
        : "cell dead";

      rowsArray.push(
        <Cell
          cellClass={cellClass}
          col={c}
          key={newKey}
          row={r}
          touchOfLife={props.touchOfLife}
        />
      );
    }
  }

  return (
    <div className="world" style={{ width: width }}>
      {rowsArray}
    </div>
  );
}
