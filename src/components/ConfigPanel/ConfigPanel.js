import React from "react";
import { ToggleGameMode } from "../ToggleGameMode/ToggleGameMode";
import "./ConfigPanel.css";

export const ConfigPanel = ({
  activeMultiplayerMode,
  handlerToggle,
  reset,
}) => {
  return (
    <div className="config-panel">
      <button onClick={reset} className="reset-button">
        Reset
      </button>
      <ToggleGameMode
        checked={activeMultiplayerMode}
        onchange={handlerToggle}
      />
    </div>
  );
};
