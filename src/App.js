import './App.css';
import TicTacToe from './Components/TicTacToeGame';
import TicTacToeMulti from './Components/TicTacToeMulti';
import HomePage from './Components/Homepage';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/single" element={<TicTacToe />} />
          <Route path="/multi" element={<Navigate to="/" />} />
          <Route path="/multi/:roomId" element={<TicTacToeMulti />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
