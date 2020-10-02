import ActionTypes from "../Actions";
const initialState = {
  awesomeMap: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  draggedElement: "",
};
export default function mapReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.CREATE_MAP:
      const xSize = action.xSize;
      const ySize = action.ySize;
      return { ...state, awesomeMap: createNewMap(xSize, ySize) };
    case ActionTypes.CHANGE_DRAGGED_ELEMENT:
      return { ...state, draggedElement: action.draggedElement };
    case ActionTypes.PLACE_TILE:
      const tileName = action.tileName;
      const x = action.x;
      const y = action.y;
      return {
        ...state,
        awesomeMap: insertTile(x, y, tileName, state.awesomeMap),
      };
    default:
      return state;
  }
}

const createNewMap = (x, y) => {
  var newMap = new Array(y);
  for (var i = 0; i < y; i++) {
    var row = [];
    for (var j = 0; j < x; j++) {
      row.push("");
    }
    newMap[i] = row;
  }

  return newMap;
};

const insertTile = (x, y, tileName, map) => {
  console.log("Inserting");
  console.table(map);
  var newMap = [...map];
  newMap[y][x] = tileName;
  console.table(newMap);
  return newMap;
};
