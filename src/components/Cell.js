import React from 'react';

export default function Cell(props) {
  let touchOfLife = () => {
    props.touchOfLife(props.row, props.col);
  };
  return (
    <div
      className={props.cellClass}
      onClick={touchOfLife}
    />
  );
}
