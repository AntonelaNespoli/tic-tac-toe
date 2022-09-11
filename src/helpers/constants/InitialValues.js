import { TurnValues } from "./TurnValues";

export const InitialValues = {
  initialTurn: TurnValues.X,
  initialShowResetButon: false,
  initialActiveMultiplayerMode: false,
  initialSquares: Array(9).fill(null),
  initialWinningSquares: [],
  initialScore: {
    X: 0,
    O: 0,
  },
};
