import React, { useState } from 'react';
import './AIFeature.css';
import { useNavigate } from 'react-router-dom';

const AIFeature = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [win, setWin] = useState('');
  let [lock, setLock] = useState(false);

  const handleCellClick = (index) => {
    if (!lock && board[index] === '') {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer((currentPlayer) => (currentPlayer === 'X' ? 'O' : 'X'));

      if (checkWinner(newBoard, currentPlayer)) {
        setWin('Congratulations! You win!');
        setLock(true);
      } else if (checkDraw(newBoard)) {
        setWin('Draw!');
        setLock(true);
      } else {
        const aiMove = calculateBestMove(newBoard, currentPlayer === 'X' ? 'O' : 'X');
        newBoard[aiMove.index] = currentPlayer === 'X' ? 'O' : 'X';
        setBoard(newBoard);
        setCurrentPlayer((currentPlayer) => (currentPlayer === 'X' ? 'O' : 'X'));

        if (checkWinner(newBoard, currentPlayer === 'X' ? 'O' : 'X')) {
          setWin('AI wins!');
          setLock(true);
        } else if (checkDraw(newBoard)) {
          setWin('Draw!');
          setLock(true);
        }
      }
    }
  };

  const calculateBestMove = (board, currentPlayer) => {
    // Base case: Check if the game is over
    if (checkWinner(board, 'X')) {
      return { score: -1 };
    } else if (checkWinner(board, 'O')) {
      return { score: 1 };
    } else if (checkDraw(board)) {
      return { score: 0 };
    }

    // Recursive case: Evaluate all possible moves
    const moves = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        const move = {};
        move.index = i;
        board[i] = currentPlayer;

        if (currentPlayer === 'O') {
          const result = calculateBestMove(board, 'X');
          move.score = result.score;
        } else {
          const result = calculateBestMove(board, 'O');
          move.score = result.score;
        }

        board[i] = '';
        moves.push(move);
      }
    }

    // Choose the move with the maximum score
    let bestMove;
    if (currentPlayer === 'O') {
      let bestScore = -Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

    return moves[bestMove];
  };

  const checkWinner = (board, player) => {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let combo of winningCombos) {
      if (
        board[combo[0]] === player &&
        board[combo[1]] === player &&
        board[combo[2]] === player
      ) {
        return true;
      }
    }

    return false;
  };

  const checkDraw = (board) => {
    return board.every((cell) => cell !== '');
  };

  const reset = () => {
    setBoard(Array(9).fill(''));
    setCurrentPlayer('X');
    setWin('');
    setLock(false);
  };

  return (
    <div className="game">
      <h1 className='description'>You: X</h1>
      <h1 className='description'>AI: O</h1>
      <h1 className='result'>{win}</h1>
      <div className="AIboard">
        <div className="row">
          {board.slice(0, 3).map((cell, index) => (
            <div
              key={index}
              className="cell"
              onClick={() => handleCellClick(index)}
            >
              {cell}
            </div>
          ))}
        </div>
        <div className="row">
          {board.slice(3, 6).map((cell, index) => (
            <div
              key={index + 3}
              className="cell"
              onClick={() => handleCellClick(index + 3)}
            >
              {cell}
            </div>
          ))}
        </div>
        <div className="row">
          {board.slice(6, 9).map((cell, index) => (
            <div
              key={index + 6}
              className="cell"
              onClick={() => handleCellClick(index + 6)}
            >
              {cell}
            </div>
          ))}
        </div>
      </div>
      <button onClick={reset}>Restart</button>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default AIFeature;