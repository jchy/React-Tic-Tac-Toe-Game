import React, { useState } from "react";
import { calculateWinner } from "./Winner";
import Grid from "./Grid";

const Game = () => {
  var count =0;
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);
  const xO = xIsNext ? "X" : "O";

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    // return if won or occupied
    if (winner || squares[i]) return;
    // select square
    squares[i] = xO;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Goto move : ${move}` : "RESET";
      return (
        <li key={move} className="goto-btn">
          <button onClick={() => jumpTo(move)} style = {{fontSize:"16px", backgroundColor:"black"}}>{destination}</button>
        </li>
      );
    });

  return (
    <>
      <h1>Welcome to Tic Tac Toe Game</h1>
      <Grid squares={history[stepNumber]} onClick={handleClick} />
      <div className="info-wrapper">
        <div>
          <h3>History</h3>
          {renderMoves()}
        </div>
        <h3>{ winner? "Winner: " + winner : stepNumber<9 ? "Next Player: " + xO : "Draw"}</h3>
      </div>
    </>
  );
};

export default Game;