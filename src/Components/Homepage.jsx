import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './homepage.css'

function HomePage() {
  const [roomId, setRoomId] = useState('');

  return (
    <div className='homepage'>
      <h1 className='title'>Welcome to Tic Tac Toe</h1>
      <Link to="/single">
        <button className="btn btn-primary mb-3">Local Play</button>
      </Link>
      <br />
      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <Link to={`/multi/${roomId}`}>
        <button className="btn  btn-secondary mt-3">Join Multiplayer Room</button>
      </Link>
    </div>
  );
}

export default HomePage;
