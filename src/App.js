import { useState } from 'react';
import { Board } from './components/Board/Board';
import { ScoreBoard } from './components/ScoreBoard/ScoreBoard';
import { TurnBoard } from './components/TurnBoard/TurnBoard';
import { WinningPositions} from './helpers/constants/WinningPostions'
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
    setTimeout(() => reset(), 3000); //cambiar esto por un botón
  } 

  return (
    <div className="container">
      <TurnBoard squares={squares} turn={turn} winningSquares={winningSquares}/>
      <Board squares={squares} turn={turn} winningSquares={winningSquares} onClick={handlerClick}/>
      <ScoreBoard scoreO={score.O} scoreX={score.X} />
    </div>
  );
}

export default App;
