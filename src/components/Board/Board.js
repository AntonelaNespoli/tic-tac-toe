import { Square } from "../Square/Square";
import "./Board.css";

export const Board = ({ squares, turn, winningSquares, onClick }) => {
  const createSquares = (values) =>
    values.map((value) => (
      <Square
        key={`square_${value}`}
        turn={turn}
        value={squares[value]}
        winner={winningSquares.includes(value)}
        onClick={() => onClick(value)}
      />
    ));

  return (
    <div className="board">
      <div className="row">{createSquares([0, 1, 2])}</div>
      <div className="row">{createSquares([3, 4, 5])}</div>
      <div className="row">{createSquares([6, 7, 8])}</div>
    </div>
  );
};
