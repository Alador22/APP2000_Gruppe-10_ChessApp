import React from 'react';

// En liste med ulike sjakkåpninger
const openings = [ 
  { name: 'Sicilian Defense', moves: ['e2e4', 'c7c5', 'd2d4', 'c5d4', 'g1f3', ] },
  { name: 'French Defense', moves: ['e2e4', 'e7e6', 'd2d4', 'd7d5', 'e4d5', 'c8d7'] },
  { name: 'London System', moves: ['d2d4', 'd7d5', 'g2g3', 'e7e6', 'f1g2', 'b8c6'] },
  { name: 'Spanish Game', moves: ['e2e4', 'e7e5', 'g1f3', 'b8c6', 'f1b5', 'a7a6'] },
  { name: 'Italian Game', moves: ['e2e4', 'e7e5', 'g1f3', 'b8c6', 'f1c4', 'g8f6'] },
  { name: 'Ruy Lopez', moves: ['e2e4', 'e7e5', 'g1f3', 'b8c6', 'f1b5', 'a7a6'] },
  { name: 'Caro-Kann Defense', moves: ['e2e4', 'c7c6', 'd2d4', 'd7d5', 'e4d5', 'c6d5'] },
];

const Openings = ({ chess, setPosition, addMoveToList, showOpenings, }) => {
  
  // Funskjon for å bruke en sjakkåpning
  const applyOpening = (moves) => {
    // Tilbakestill sjakkbrettet
    chess.reset();
    // Utfør hvert trekk i sjakkåpningen
    moves.forEach((move) => {
      const result = chess.move(move);
      if (result) {
        addMoveToList(result);
      }
    });
    // Oppdater sjakkbrettets posisjon
    setPosition(chess.fen());
  };

  return (
    // En liste over sjakkåpningene som vises på skjermen
    <ul className="openings-container" style={{ display: showOpenings ? 'block' : 'none' }}>
      {openings.map((opening, index) => (
        <li key={index} onClick={() => applyOpening(opening.moves)}>
          {opening.name}
        </li>
      ))}
    </ul>
  );
};

export default Openings;