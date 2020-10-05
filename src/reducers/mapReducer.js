import ActionTypes from "../Actions";
const initialState = {
  awesomeMap: [
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
  ],
  draggedElement: "",
  mapLayers: [],
  selectedLayer: null,
  brushSize: 1,
  xMapSize: 10,
  yMapSize: 10,
  showGrid: true,
};
export default function mapReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.CREATE_MAP:
      const xSize = action.xSize;
      const ySize = action.ySize;
      var newLayers = [];
      return {
        ...state,
        awesomeMap: createNewMap(xSize, ySize),
        mapLayers: newLayers,
        xMapSize: xSize,
        yMapSize: ySize,
        selectedLayer: null,
      };
    case ActionTypes.CHANGE_DRAGGED_ELEMENT:
      return { ...state, draggedElement: action.draggedElement };
    case ActionTypes.PLACE_TILE:
      const tileName = action.tileName;
      const x = action.x;
      const y = action.y;
      const selectedLayer = state.selectedLayer;

      if (selectedLayer || selectedLayer === 0) {
        var mapLayers = [...state.mapLayers];

        const modifyMap = insertTiles(
          x,
          y,
          tileName,
          state.mapLayers[selectedLayer],
          state
        );
        mapLayers.splice(selectedLayer, 1, modifyMap);

        return {
          ...state,
          mapLayers: mapLayers,
        };
      } else {
        return {
          ...state,
          awesomeMap: insertTiles(x, y, tileName, state.awesomeMap, state),
        };
      }
    case ActionTypes.SELECT_LAYER:
      return { ...state, selectedLayer: action.selectedLayer };
    case ActionTypes.SET_BRUSH_SIZE:
      return { ...state, brushSize: action.brushSize };
    case ActionTypes.ADD_LAYER:
      var newMapLayers = [...state.mapLayers];
      newMapLayers.push(createNewMap(state.xMapSize, state.yMapSize));
      return {
        ...state,
        mapLayers: newMapLayers,
      };
    case ActionTypes.TOGGLE_GRID:
      return { ...state, showGrid: !state.showGrid };
    case ActionTypes.LOAD_MAP:
      const newState = action.newState;

      return {
        ...state,
        xMapSize: newState.xMapSize,
        yMapSize: newState.yMapSize,
        mapLayers: newState.mapLayers,
        awesomeMap: newState.awesomeMap,
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

const insertTiles = (x, y, tileName, map, state) => {
  const brushSize = state.brushSize;
  const xMapSize = state.xMapSize;
  const yMapSize = state.yMapSize;
  var newMap = [...map];
  x = Number(x);
  y = Number(y);

  if (brushSize === 0) {
    for (var i = 0; i < yMapSize; i++) {
      for (var j = 0; j < xMapSize; j++) {
        newMap[i][j] = tileName;
      }
    }
  } else {
    for (var i = 0; i < brushSize; i++) {
      for (var j = 0; j < brushSize; j++) {
        if (checkInsertTile(x + j, y + i, state)) {
          newMap[y + i].splice([x + j], 1, tileName);
        }
      }
    }
  }

  return newMap;
};

const checkInsertTile = (x, y, state) => {
  if (x < state.xMapSize && y < state.yMapSize) {
    return true;
  }
  return false;
};
