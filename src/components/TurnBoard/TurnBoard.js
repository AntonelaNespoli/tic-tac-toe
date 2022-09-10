import classnames from 'classname';
import React from 'react'
import './TurnBoard.css';
import '../Square/Square.css';

export const TurnBoard = ({squares, turn, winningSquares}) => {
    const winner = winningSquares?.length === 3 ? squares[winningSquares[0]] : null;
    let squareClass = classnames({
        square: turn !== null || winner !== null,
        'square-size': true,
        [`square--${turn}`]: turn !== null,
        [`square--${winner}`]: winner !== null,
    })
    const text = turn !== null ? 'Turn: ' : (winner !== null ? 'Winner: ' : 'Draw');
  return (
    <div className='turn-board'>
        {text}
        <div className={squareClass}/>
    </div>
  )
}
