import React, { useState } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';
import './style2.css';

const Practice = () => {
  // Oppretter et nytt sjakkobjekt ved hjelp av Chess.js
  const [chess] = useState(new Chess());

  // Definerer et state for posisjonen til brikkene på sjakkbrettet, som starter som null
  const [position, setPosition] = useState(null);

  // Definerer et state for forrige posisjon på sjakkbrettet, som starter som null
  const [prevPosition, setPrevPosition] = useState(null);

  // Definerer et state for aktiverte ruter på sjakkbrettet, som starter som en tom liste
  const [activeSquares, setActiveSquares] = useState([]);

  // Definerer et state for å vise eller skjule startknappen, som starter som sann
  const [showStartButton, setShowStartButton] = useState(true);

  // Funksjon for å utføre et sjakkdrag
  const handleMove = ({ sourceSquare, targetSquare }) => {
    // Henter ut alle gyldige sjakkdrag fra den nåværende posisjonen
    const moves = chess.moves({ verbose: true });

    // Velger det sjakkdraget som samsvarer med de to rutene som er valgt av spilleren
    const move = moves.find(m => m.from === sourceSquare && m.to === targetSquare);

    // Hvis draget ikke er gyldig, avslutter funksjonen uten å oppdatere posisjonen eller aktive ruter
    if (move === undefined) {
      return;
    }

    // Utfører sjakkdraget og oppdaterer posisjonen til sjakkbrettet
    chess.move(move);
    setPosition(chess.fen());

    // Setter forrige posisjon til nåværende posisjon
    setPrevPosition(position);

    // Nullstiller aktive ruter
    setActiveSquares([]);
  };

  // Funksjon for å håndtere klikk på ruter på sjakkbrettet
  const handleSquareClick = square => {
    // Henter ut brikketypen som er plassert på ruten som er klikket på
    const piece = chess.get(square);

    // Hvis det ikke er noen brikke på ruten, eller hvis det ikke er spillerens tur, avslutter funksjonen
    if (!piece || piece.color !== chess.turn()) {
      return;
    }

    // Henter ut alle gyldige sjakkdrag for den valgte brikken
    const moves = chess.moves({ square, verbose: true });

    // Lager en liste med alle ruter som brikken kan flyttes til
    const legalSquares = moves.map(move => move.to);

    // Setter aktiverte ruter til å være den klikkede ruten og alle lovlige ruter for brikken
    setActiveSquares([square, ...legalSquares]);
  };

  // Funksjon for å håndtere klikk på startknappen
  const handleStartGame = () => {
    // Setter posisjonen til startposisjonen
    setPosition('start');

    // Skjuler startknappen
    setShowStartButton(false);
  };

  return (
    // Her defineres hovedcontaineren som skal inneholde sjakkbrettet og knappen for å starte spillet
    <div className="main-container">
      <div className="chessboard-container">
        {/* Hvis showStartButton er satt til true vises knappen for å starte spillet */}
        {showStartButton && (
          <button className="start-game-button" onClick={handleStartGame}>Start Game</button>
        )}
        {/* Hvis position er satt, vises sjakkbrettet med de aktive brikkene */}
        {position && (
          // Her defineres sjakkbrettet som bruker Chessboard-komponenten fra chessboardjsx-pakken
          <Chessboard
            position={position}
            onDrop={({ sourceSquare, targetSquare }) =>
              handleMove({ sourceSquare, targetSquare })
            }
            onMouseOverSquare={handleSquareClick}
            onMouseOutSquare={() => setActiveSquares([])}
            onDragStart={({ sourceSquare }) => {
              setPrevPosition(position);
              const piece = chess.get(sourceSquare);
              if (piece && piece.color !== chess.turn()) {
                return false;
              }
            }}
            // Her settes stilene for sjakkbrettet og de aktive rutene
            boardStyle={{
              borderRadius: '5px',
              boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
            }}
            squareStyles={{
              ...activeSquares.reduce(
                (obj, square) => ({
                  ...obj,
                  [square]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' }
                }),
                {}
              )
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Practice;