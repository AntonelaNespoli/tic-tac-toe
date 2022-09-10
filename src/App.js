import { useState, useEffect} from 'react';
import { Board } from './components/Board/Board';
import { ScoreBoard } from './components/ScoreBoard/ScoreBoard';
import { TurnBoard } from './components/TurnBoard/TurnBoard';
import { WinningPositions} from './helpers/constants/WinningPostions'
import { ConfigPanel } from './components/ConfigPanel/ConfigPanel';
import './App.css';

const App = () => {
  const initialTurn = 'X';
  const initialShowResetButon = false;
  const initialActiveMultiplayerMode = false;
  const initialSquares = Array(9).fill(null);
  const initialWinningSquares = [];
  const initialScore = {
    X:0,
    O:0,
  };
  const [turn, setTurn] = useState(initialTurn);
  const [showResetButton, setShowResetButton] = useState(initialShowResetButon);
  const [activeMultiplayerMode, setActiveMultiplayerMode ] = useState(initialActiveMultiplayerMode);
  const [squares, setSquares] = useState(initialSquares);
  const [winningSquares, setWinningSquares] = useState(initialWinningSquares);
  const [score, setScore] = useState(initialScore);

  useEffect(() => {
    getLocalData('turn', turn, setTurn);
    getLocalData('showResetButton', showResetButton, setShowResetButton);
    getLocalData('activeMultiplayerMode', activeMultiplayerMode, setActiveMultiplayerMode);
    getLocalData('squares', squares, setSquares);
    getLocalData('winningSquares', winningSquares, setWinningSquares);
    getLocalData('score', score, setScore);
  }, [])

  useEffect(()=>{
    setTimeout(() => {
      if(!activeMultiplayerMode && turn === 'O'){
        gameEngine();
      }
    }, 2000);

  },[turn]);

  const reset = () => {
    setTimeout(() => {
      setTurn(initialTurn);
      setShowResetButton(initialShowResetButon);
      setSquares(initialSquares);
      setWinningSquares(initialWinningSquares);
      localStorage.setItem('turn', JSON.stringify(initialTurn));
      localStorage.setItem('showResetButton', JSON.stringify(initialShowResetButon));
      localStorage.setItem('squares', JSON.stringify(initialSquares));
      localStorage.setItem('winningSquares', JSON.stringify(initialWinningSquares));
    }, 100);
 
  }

  const gameEngine = () =>{
    let squareChose;
    do{
      squareChose = Math.floor(Math.random() * 9);
    } while (squares[squareChose] !== null);
    addNewSquare(squareChose, turn);
  }

  const checkForWinner = newSquares => {
    for(let i = 0; i < WinningPositions.length; i++){
      const [a,b,c] = WinningPositions[i];
      if(newSquares[a] && newSquares[a] === newSquares[b] && newSquares[a] === newSquares[c]) {
        endGame(newSquares[a], WinningPositions[i]);
        return 
      }
    }
    if(!newSquares.includes(null)){
      endGame(null, Array.from(Array(10).keys()));
      return
    }
    let newTurn = turn === 'X' ? 'O' : 'X';
    setTurn(newTurn);
    localStorage.setItem('turn', JSON.stringify(newTurn));

  }

  const handlerToggle = value => {
    let isActive = value.currentTarget.checked;
    setActiveMultiplayerMode(isActive);
    localStorage.setItem('activeMultiplayerMode', JSON.stringify(isActive));
    setScore(initialScore);
    localStorage.setItem('score', JSON.stringify(initialScore));

    reset();
  }

  const handlerClick = square => {
    if((!activeMultiplayerMode && turn !== 'O') || activeMultiplayerMode){
      addNewSquare(square, turn);
    }
  }

  function addNewSquare(square, turn) {
    let newSquares = [...squares];
    newSquares.splice(square, 1, turn);
    setSquares(newSquares);
    localStorage.setItem('squares', JSON.stringify(newSquares));
    checkForWinner(newSquares);
  }

  const endGame = (result, winningPositions) => {
    setTurn(null);
    localStorage.setItem('turn', JSON.stringify(null));
    setShowResetButton(true);
    localStorage.setItem('showResetButton', JSON.stringify(true));
    if(result !== null) {
      let newScore = {
        ...score,
        [result]: score[result] +1,
      };
      setScore(newScore);
      localStorage.setItem('score', JSON.stringify(newScore));

    }
    setWinningSquares(winningPositions);
    localStorage.setItem('winningSquares', JSON.stringify(winningPositions));
  } 

  function getLocalData(name, val, set) {
    const data = JSON.parse(localStorage.getItem(name));
    if (data) {
      set(data);
    } else {
      localStorage.setItem(name, JSON.stringify(val));
    }
  }
  return (
    <div className="container">
      <ConfigPanel activeMultiplayerMode={activeMultiplayerMode} handlerToggle={handlerToggle} reset={reset} />
      <TurnBoard squares={squares} turn={turn} winningSquares={winningSquares}/>
      <Board squares={squares} turn={turn} winningSquares={winningSquares} onClick={handlerClick}/>
      <ScoreBoard scoreO={score.O} scoreX={score.X} />
    </div>
  );
}

export default App;
