import React from "react"
import Square from "./Square";
import './board.css'
function Board (props) {
  return (
    <div className="board">
      <Square id={0} {...props}/>
      <Square id={1}{...props}/>
      <Square id={2} {...props}/>
      <Square id={3} {...props}/>
      <Square id={4} {...props}/>
      <Square id={5}{...props}/>
      <Square id={6} {...props}/>
      <Square id={7} {...props}/>
      <Square id={8} {...props}/>
    </div>
  )
};

export default Board;
