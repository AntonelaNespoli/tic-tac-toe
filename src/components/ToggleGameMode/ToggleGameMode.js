import React from 'react'
import './ToggleGameMode.css';

export const ToggleGameMode = ({ checked, onchange }) => {
  return (
    <div className='switch-container'>
        <span>Multiplayer</span>
        <label className="switch">
            <input type="checkbox" onChange={onchange} checked={checked}/>
            <span className="slider round"></span>
        </label>
    </div>
  )
}
