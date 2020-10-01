import ActionTypes from "../Actions";
const initialState = {
  awesomeMap: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
};
export default function mapReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.CREATE_MAP:
      const xSize = action.xSize;
      const ySize = action.ySize;
      return { awesomeMap: createNewMap(xSize, ySize) };
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
