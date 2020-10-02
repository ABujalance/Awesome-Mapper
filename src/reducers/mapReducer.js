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
      };
    case ActionTypes.CHANGE_DRAGGED_ELEMENT:
      return { ...state, draggedElement: action.draggedElement };
    case ActionTypes.PLACE_TILE:
      const tileName = action.tileName;
      const x = action.x;
      const y = action.y;
      const selectedLayer = state.selectedLayer;
      console.log("👍");
      console.log("Hola Layers");
      console.log(selectedLayer);

      if (selectedLayer || selectedLayer === 0) {
        var mapLayers = [...state.mapLayers];
        const modifyMap = insertTile(
          x,
          y,
          tileName,
          state.mapLayers[selectedLayer]
        );
        mapLayers[selectedLayer] = modifyMap;
        console.log("👍");
        console.log("Adios Layers");
        return {
          ...state,
          mapLayers: mapLayers,
          draggedElement: "",
        };
      } else {
        return {
          ...state,
          awesomeMap: insertTile(x, y, tileName, state.awesomeMap),
          draggedElement: "",
        };
      }
    case ActionTypes.SELECT_LAYER:
      return { ...state, selectedLayer: action.selectedLayer };
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

const insertTile = (x, y, tileName, map) => {
  var newMap = [...map];
  newMap[y][x] = tileName;
  return newMap;
};
