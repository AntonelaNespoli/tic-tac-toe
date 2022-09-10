import React from 'react'
import classnames from 'classname';
import './Square.css';

export const Square = ({turn, value, winner, onClick}) => {

    const handleClick = () => {
        turn !== null && value === null && onClick();
    }
    let squareClass = classnames({
        square: true,
        [`square--${value}`]: value !== null,
        winner: winner,
    })

    return (
    <div className={squareClass} onClick={ handleClick }></div>
  )
}
