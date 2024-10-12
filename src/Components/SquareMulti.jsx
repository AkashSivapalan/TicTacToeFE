import React, { useEffect } from "react";
import "./Square.css";
import O from "../assets/O.png";
import X from "../assets/X.png";

function SquareMulti({ id, board, boardMove, gameOver }) {
  const row = Math.floor(id / 3);
  const col = id % 3;
  const value = board[row][col];

  const handleClick = () => {
    if (gameOver || value !== 0) {
      return;
    }
    boardMove(id);
  };

  let squareImg = null;
  if (value === 1) {
    squareImg = X;
  } else if (value === 2) {
    squareImg = O;
  }

  return (
    <div className="square" onClick={handleClick}>
      {squareImg && <img src={squareImg} alt="" />}
    </div>
  );
}

export default SquareMulti;
