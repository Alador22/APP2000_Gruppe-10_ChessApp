import { Chessboard } from 'react-chessboard';
import React from 'react';
import './style2.css';

const Practice = () => {
  return (
    <div>
      <h1>Practice</h1>
      <Chessboard position="start" onMove={handleMove} />
    </div>
  );
};

const handleMove = (from, to) => {
  console.log(`Moving piece from ${from} to ${to}`);
};

export default Practice;