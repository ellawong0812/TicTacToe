import React from 'react';
import "./HomePage.css";
import {Route, Routes, useNavigate} from 'react-router-dom';
import AIFeature from './AIFeature';
import TicTacToe from './TicTacToe/TicTacToe'

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className='container'>
        <h1 className='title'>Welcome to Tic Tac Toe!!</h1>
        <h1 className='title'>Choose a mode you want:</h1>
        <button className='mode' onClick={()=>navigate('/TicTacToe')}>Normal Version</button>
        <button className='mode' onClick={()=>navigate('/AIFeature')}>AI Version</button>
        <Routes>
          <Route path='/TicTacToe' element={<TicTacToe/>} />
          <Route path='/AIFeature' element={<AIFeature/>} />
        </Routes>
    </div>

  )
}

export default HomePage
