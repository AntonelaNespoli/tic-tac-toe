import { useState } from 'react';
import { Board } from './components/Board/Board';
import { ScoreBoard } from './components/ScoreBoard/ScoreBoard';
import './App.css';

const App = () => {
  //guardar todos estos estados en localStorage, para persistir los datos en caso de reload
  const [turn, setTurn] = useState('X');
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [winningSquares, setWinningSquares] = useState([]);
  const [score, setScore] = useState({
    X:0,
    O:0,
  });

  const reset = () => {
    setTurn('X');
    setSquares(Array(9).fill(null));
    setWinningSquares([]);
  }

  const winningPositions = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
  ]
  const checkForWinner = newSquares => {
    for(let i = 0; i < winningPositions.length; i++){
      const [a,b,c] = winningPositions[i];
      if(newSquares[a] && newSquares[a] === newSquares[b] && newSquares[a] === newSquares[c]) {
        endGame(newSquares[a], winningPositions[i]);
        return 
      }
    }
    if(!newSquares.includes(null)){
      endGame(null, Array.from(Array(10).keys()));
      return
    }
    setTurn(turn === 'X' ? 'O' : 'X');
  }

  const handlerClick = square => {
    let newSquares = [...squares];
    newSquares.splice(square, 1, turn);
    setSquares(newSquares);
    checkForWinner(newSquares);
  }

  const endGame = (result, winningPositions) => {
    setTurn(null);
    if(result !== null) {
      setScore({
        ...score,
        [result]: score[result] +1,
      });
    }
    setWinningSquares(winningPositions);
    setTimeout(() => reset(), 5300); //cambiar esto por un botón
  } 

  return (
    <div className="container">
      <Board squares={squares} turn={turn} winningSquares={winningSquares} onClick={handlerClick}/>
      <ScoreBoard scoreO={score.O} scoreX={score.X} />
    </div>
  );
}

export default App;
