import React, { useState, useEffect, useRef } from "react";
import BoardMulti from "./BoardMulti";
import ConfettiComponent from "./Confetti";
import 'bootstrap/dist/css/bootstrap.css';
import './TicTacToeMulti.css';
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

function TicTacToeMulti() {
  const { roomId } = useParams();
  console.log(roomId);
  const [turnPlayer, setTurnPlayer] = useState(1);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [playerId, setPlayerId] = useState(localStorage.getItem('playerId') || uuidv4());
  const [board, setBoard] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [winner, setWinner] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [moves, setMoves] = useState(0);
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);

  const navigate = useNavigate();
  const url = process.env.REACT_APP_URL


  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      ws.current.send(JSON.stringify({ type: 'join', room: roomId, playerId }));
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      switch (data.type) {
        case 'playerNumber':
          setCurrentPlayer(data.playerNumber);
          setPlayerId(data.playerId);
          localStorage.setItem('playerId', data.playerId);
          break;
        case 'start':
          console.log(data.message);
          break;
        case 'update':
          setBoard(data.board);
          setTurnPlayer(data.turnPlayer);
          setMoves(data.newMoveCnt)
          break;
        case 'gameOver':
          setBoard(data.board);  // Ensure the final board state is shown
          setGameOver(true);
          setWinner(data.winner);
          setGameWon(data.winner !== 0);  // True if someone won, false if it's a tie
          setShowConfetti(data.winner === currentPlayer);  // Show confetti if the current player won
          break;
        case 'message':
          setMessages((prevMessages) => [...prevMessages, data.text]);
          break;
        case 'reset':
          resetLocalGameState();
          break;
        case 'error':
          alert(data.message);
          navigate('/')

          break;
        case 'syncState':
          console.log(data)
          setBoard(data.board);
          setTurnPlayer(data.turnPlayer);
          setMoves(data.moves)
          setGameOver(data.gameOver)
          setWinner(data.winnerPlayer)
          setGameWon(data.winnerPlayer !== 0)
          break;
        default:
          break;
      }
    };

    return () => {
      ws.current.close();
    };
  }, [roomId, playerId]);

  const getPlayer = () => {
    return currentPlayer;
  };

  const boardMove = (space) => {
    const currPlayer = getPlayer();
    if (currPlayer == null || currPlayer !== turnPlayer) {
      console.log('Move prevented: currentPlayer not set or not player\'s turn');
      return;
    }

    const row = Math.floor(space / 3);
    const col = space % 3;
    let newBoard = [...board];
    newBoard[row][col] = currPlayer;

    setBoard(newBoard);
    
   setTurnPlayer((turnPlayer % 2) + 1)

    ws.current.send(JSON.stringify({
      type: 'move',
      room: roomId,
      board: newBoard,
      turnPlayer: currentPlayer,
      moveCnt:moves
    }));
  };


  const resetGame = () => {
    ws.current.send(JSON.stringify({
      type: 'playAgain',
      room: roomId,
      playerId: playerId,
    }));
  };

  const sendMessage = (playerMessage) => {
    const text = 'Player ' + currentPlayer + ': '  + playerMessage 
    ws.current.send(JSON.stringify({ type: 'message', room: roomId,text }));
  };

  const requestSwitchPlayers = () => {
    ws.current.send(JSON.stringify({
      type: 'switchRequest',
      room: roomId,
      playerId: playerId,
    }));
  };

  const resetLocalGameState = () => {
    setTurnPlayer(1);
    setBoard([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    setGameWon(false);
    setWinner(0);
    setShowConfetti(false);
    setMoves(0);
    setGameOver(false);
  };

  return (
    <div className="TicTacMBG">
      <h1>Welcome To The Game Room Player {currentPlayer}</h1>
      {gameOver ? (
        <div>
          {gameWon ? (
            <h2>Player {winner} won!</h2>
          ) : (
            <h2>It's a tie!</h2>
          )}
          <button className="btn btn-success mb-2" onClick={resetGame}>Play Again</button>
        </div>
      ) : (
        <h2>Player {turnPlayer}'s turn</h2>
      )}
      <BoardMulti
        board={board}
        boardMove={boardMove}
        gameOver={gameOver}
      />
      <Link to="/"> <button className="btn btn-danger mt-2 mb-2">Return</button> </Link>
      <button className="btn btn-secondary mt-2 mb-2" onClick={requestSwitchPlayers}>Switch Player Number</button>
      <ConfettiComponent active={showConfetti} />
      <div className="chat">
        <h3>Chat</h3>
        <div className="messages">
          {messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
        <input type="text" id="chatInput" />
        <button className="btn btn-primary" onClick={() => sendMessage(document.getElementById('chatInput').value)}>Send</button>
      </div>
    </div>
  );
}

export default TicTacToeMulti;
