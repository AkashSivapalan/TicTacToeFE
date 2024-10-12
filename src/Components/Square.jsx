import React, { useState, useEffect } from "react";
import "./Square.css";
import O from "../assets/O.png";
import X from "../assets/X.png";

function Square({ id, getPlayer, boardMove, reset,gameOver }) {
  const [squareImg, setSquareImg] = useState(null);

  // Reset square image when 'reset' prop changes
  useEffect(() => {
    setSquareImg(null); // Reset square image to null
  }, [reset]);

  const handleClick = () => {
    if (gameOver){
        return
    }
    if (!squareImg) {
      const currPlayer = getPlayer(id);
      if (currPlayer === 1) {
        setSquareImg(X);
      } else {
        setSquareImg(O);
      }
      boardMove(id, currPlayer);
    }
  };

  return (
    <div className="square" onClick={handleClick}>
      {squareImg && <img src={squareImg} alt="" />}
    </div>
  );
}

export default Square;
