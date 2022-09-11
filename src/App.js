/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Board } from "./components/Board/Board";
import { ConfigPanel } from "./components/ConfigPanel/ConfigPanel";
import { TurnBoard } from "./components/TurnBoard/TurnBoard";
import { ScoreBoard } from "./components/ScoreBoard/ScoreBoard";
import { getLocalData, setLocalData } from "./helpers/Data"; 
import { InitialValues } from "./helpers/constants/InitialValues";
import { TurnValues } from "./helpers/constants/TurnValues";
import { WinningPositions } from "./helpers/constants/WinningPostions";
import "./App.css";

const App = () => {
  const {
    initialTurn,
    initialShowResetButon,
    initialActiveMultiplayerMode,
    initialSquares,
    initialWinningSquares,
    initialScore,
  } = InitialValues;

  const [turn, setTurn] = useState(initialTurn);
  const [showResetButton, setShowResetButton] = useState(initialShowResetButon);
  const [activeMultiplayerMode, setActiveMultiplayerMode] = useState(initialActiveMultiplayerMode);
  const [squares, setSquares] = useState(initialSquares);
  const [winningSquares, setWinningSquares] = useState(initialWinningSquares);
  const [score, setScore] = useState(initialScore);

  useEffect(() => {
    getLocalData("turn", turn, setTurn);
    getLocalData("showResetButton", showResetButton, setShowResetButton);
    getLocalData("activeMultiplayerMode", activeMultiplayerMode, setActiveMultiplayerMode);
    getLocalData("squares", squares, setSquares);
    getLocalData("winningSquares", winningSquares, setWinningSquares);
    getLocalData("score", score, setScore);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (!activeMultiplayerMode && turn === TurnValues.O) {
        gameEngine();
      }
    }, 2000);
  }, [turn]);

  const reset = () => {
    setLocalData('turn', initialTurn, setTurn);
    setLocalData('showResetButton', initialShowResetButon, setShowResetButton);
    setLocalData('squares', initialSquares, setSquares);
    setLocalData('winningSquares', initialWinningSquares, setWinningSquares);
  };

  const gameEngine = () => {
    let squareChose;
    do {
      squareChose = Math.floor(Math.random() * 9);
    } while (squares[squareChose] !== null);
    addNewSquare(squareChose, turn);
  };

  const checkForWinner = (newSquares) => {
    for (let i = 0; i < WinningPositions.length; i++) {
      const [a, b, c] = WinningPositions[i];
      if (
        newSquares[a] &&
        newSquares[a] === newSquares[b] &&
        newSquares[a] === newSquares[c]
      ) {
        endGame(newSquares[a], WinningPositions[i]);
        return;
      }
    }
    if (!newSquares.includes(null)) {
      endGame(null, Array.from(Array(10).keys()));
      return;
    }
    let newTurn = turn === TurnValues.X ? TurnValues.O : TurnValues.X;
    setLocalData('turn', newTurn, setTurn);
  };

  const handlerToggle = (value) => {
    let isActive = value.currentTarget.checked;
    setLocalData('activeMultiplayerMode', isActive, setActiveMultiplayerMode);
    setLocalData('score', initialScore, setScore);
    reset();
  };

  const handlerClick = (square) => {
    if ((!activeMultiplayerMode && turn !== TurnValues.O) || activeMultiplayerMode) {
      addNewSquare(square, turn);
    }
  };

  function addNewSquare(square, turn) {
    let newSquares = [...squares];
    newSquares.splice(square, 1, turn);
    setLocalData('squares', newSquares, setSquares);
    checkForWinner(newSquares);
  }

  const endGame = (result, winningPositions) => {
    setLocalData('turn', null, setTurn);
    setLocalData('showResetButton', true, setShowResetButton);
    if (result !== null) {
      let newScore = {
        ...score,
        [result]: score[result] + 1,
      };
      setLocalData('score', newScore, setScore);
    }
    setLocalData('winningSquares', winningPositions, setWinningSquares);
  };

  return (
    <div className="container">
      <ConfigPanel
        activeMultiplayerMode={activeMultiplayerMode}
        handlerToggle={handlerToggle}
        reset={reset}
      />
      <TurnBoard
        squares={squares}
        turn={turn}
        winningSquares={winningSquares}
      />
      <Board
        squares={squares}
        turn={turn}
        winningSquares={winningSquares}
        onClick={handlerClick}
      />
      <ScoreBoard scoreO={score.O} scoreX={score.X} />
    </div>
  );
};

export default App;
