import './App.css';
import HomePage from './Components/HomePage';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AIFeature from './Components/AIFeature';
import TicTacToe from './Components/TicTacToe/TicTacToe';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/TicTacToe" element={<TicTacToe />} />
          <Route path="/AIFeature" element={<AIFeature />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
