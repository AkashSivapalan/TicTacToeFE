import React from "react";
import SquareMulti from "./SquareMulti";
import './board.css';

function BoardMulti({ board, boardMove, gameOver }) {
  return (
    <div className="board">
      {board.flat().map((value, index) => (
        <SquareMulti
          key={index}
          id={index}
          board={board}
          boardMove={boardMove}
          gameOver={gameOver}
        />
      ))}
    </div>
  );
}

export default BoardMulti;