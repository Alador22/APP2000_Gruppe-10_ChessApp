import React, { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import './style2.css';
import { Chess } from 'chess.js';

const Practice = () => {
  const [position, setPosition] = useState('start');
  const [chess] = useState(new Chess());

  const handleMove = ({ from, to }) => {
    const move = chess.move({ from, to });

    if (move !== null) {
      setPosition(chess.fen());
    }
  };

  return (
    <div className="main-container">
      <div className="chessboard-container">
        <Chessboard position={position} onMove={handleMove} />
      </div>
    </div>
  );
};

export default Practice;