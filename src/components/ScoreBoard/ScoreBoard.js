import React from "react";
import "./ScoreBoard.css";

export const ScoreBoard = ({ scoreX, scoreO }) => (
  <div className="score-board">
    <div>{scoreX}</div>
    <div>{scoreO}</div>
  </div>
);
