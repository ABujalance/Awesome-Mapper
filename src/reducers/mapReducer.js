import ActionTypes from "../Actions";
const initialState = {
  awesomeMap: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  draggedElement: "",
  mapLayers: [
    [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
  ],
  selectedLayer: null,
  brushSize: 0,
  xMapSize: 3,
  yMapSize: 3,
};
export default function mapReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.CREATE_MAP:
      const xSize = action.xSize;
      const ySize = action.ySize;
      var newLayers = [];
      newLayers.push(createNewLayer(xSize, ySize));
      return {
        ...state,
        awesomeMap: createNewMap(xSize, ySize),
        mapLayers: newLayers,
        xMapSize: xSize,
        yMapSize: ySize,
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
        mapLayers[selectedLayer] = modifyMap;
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

const createNewLayer = (x, y) => {
  var newLayer = new Array(y);
  for (var i = 0; i < y; i++) {
    var row = [];
    for (var j = 0; j < x; j++) {
      row.push("");
    }
    newLayer[i] = row;
  }

  return newLayer;
};

const insertTiles = (x, y, tileName, map, state) => {
  const brushSize = state.brushSize;
  const xMapSize = state.xMapSize;
  const yMapSize = state.yMapSize;
  var newMap = [...map];
  x = Number(x);
  y = Number(y);

  if (brushSize === 0) {
    newMap[y][x] = tileName;
  } else if (brushSize === 1) {
    newMap[y][x] = tileName;
    if (y + 1 < yMapSize) {
      newMap[y + 1][x] = tileName;
      if (x + 1 < xMapSize) {
        newMap[y + 1][x + 1] = tileName;
      }
    }
    if (x + 1 < xMapSize) {
      newMap[y][x + 1] = tileName;
    }
  } else if (brushSize === 2) {
    const extraTiles = 4;
    for (var i = 0; i < extraTiles; i++) {
      for (var j = 0; j < extraTiles; j++) {
        if (checkInsertTile(x + j, y + i, state)) {
          newMap[y + i][x + j] = tileName;
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
