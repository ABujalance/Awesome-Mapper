import ActionTypes from "../Actions";

export const createMap = (xSize, ySize) => ({
  type: ActionTypes.CREATE_MAP,
  xSize,
  ySize,
});
