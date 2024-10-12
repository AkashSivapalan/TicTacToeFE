import React, { useState } from "react";
import Board from "./Board";
import ConfettiComponent from "./Confetti";
import 'bootstrap/dist/css/bootstrap.css';
import './TicTacToe.css';
import { Link } from "react-router-dom";
function TicTacToe() {
  const [turnPlayer, setTurnPlayer] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [winner, setWinner] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [reset, setReset] = useState(false);
  const [moves, setMoves] = useState(0);

  const getPlayer = () => {
    return turnPlayer;
  };

  const boardMove = (space, currPlayer) => {
    const row = Math.floor(space / 3);
    const col = space % 3;
    let newBoard = [...board];
    newBoard[row][col] = currPlayer;

    setBoard(newBoard);
    setMoves(moves + 1);

    if (checkWin(newBoard, currPlayer)) {
      setGameWon(true);
      setGameOver(true);
      setWinner(currPlayer);
      setShowConfetti(true);
    } else if (moves + 1 === 9) {
      setGameOver(true);
    } else {
      setTurnPlayer((turnPlayer % 2) + 1);
    }
  };

  const checkWin = (board, currPlayer) => {
    for (let i = 0; i < 3; i++) {
      if (
        (board[i][0] === currPlayer && board[i][1] === currPlayer && board[i][2] === currPlayer) ||
        (board[0][i] === currPlayer && board[1][i] === currPlayer && board[2][i] === currPlayer)
      ) {
        return true;
      }
    }
    if (
      (board[0][0] === currPlayer && board[1][1] === currPlayer && board[2][2] === currPlayer) ||
      (board[0][2] === currPlayer && board[1][1] === currPlayer && board[2][0] === currPlayer)
    ) {
      return true;
    }
    return false;
  };

  const resetGame = () => {
    setTurnPlayer(1);
    setBoard([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    setGameWon(false);
    setWinner(0);
    setShowConfetti(false);
    setReset(!reset);
    setMoves(0);
    setGameOver(false);
  };

  return (
    <div className="TicTacBG">
      <h1>Tic Tac Toe</h1>
      {gameOver ? (
        <div>
          {gameWon ? (
            <h2>Player {winner} won!</h2>
          ) : (
            <h2>Game Over</h2>
          )}
          <button className="btn btn-success mb-2" onClick={resetGame}>Play Again</button>
        </div>
      ) : (
        <h2>Player {turnPlayer}'s turn</h2>
      )}
      <Board getPlayer={getPlayer} boardMove={boardMove} reset={reset} gameOver={gameOver} />
      <Link to="/">      <button className="btn btn-danger mt-2">
        Return
      </button>
          </Link>

      <ConfettiComponent active={showConfetti} />
    </div>
  );
}

export default TicTacToe;
