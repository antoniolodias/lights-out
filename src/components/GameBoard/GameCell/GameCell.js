import React from 'react';
import './GameCell.scss'

const GameCell = ({isOn, flipCells}) => {
  const handleClick = () => flipCells();

  let cellStyle = `GameCell ${isOn ? "Cell-On" : ""}`;
  return (
    <td className={cellStyle} onClick={handleClick} />
  )
};

export default GameCell;
