import ActionTypes from "../Actions";
const initialState = {
  draggedElement: "",
  mapLayers: 0,
  selectedLayer: 0,
  brushSize: 1,
  xMapSize: 10,
  yMapSize: 10,
  showGrid: false,
  eraseMode: false,
  mapBase: 32,
  clearMode: false,
};
export default function mapReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.CREATE_MAP:
      const xSize = action.xSize;
      const ySize = action.ySize;
      const newMapBase = action.mapBase;
      var newLayers = 0;
      return {
        ...state,
        mapLayers: newLayers,
        xMapSize: xSize,
        yMapSize: ySize,
        selectedLayer: null,
        mapBase: Number(newMapBase),
        showGrid: false,
      };
    case ActionTypes.CHANGE_DRAGGED_ELEMENT:
      return { ...state, draggedElement: action.draggedElement };
    case ActionTypes.SELECT_LAYER:
      return { ...state, selectedLayer: action.selectedLayer };
    case ActionTypes.SET_BRUSH_SIZE:
      return { ...state, brushSize: action.brushSize };
    case ActionTypes.ADD_LAYER:
      var newMapLayers = state.mapLayers + 1;
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
    case ActionTypes.TOGGLE_ERASE_MODE:
      return {
        ...state,
        eraseMode: action.eraseMode,
      };
    case ActionTypes.TOGGLE_CLEAR_MODE:
      return {
        ...state,
        clearMode: !state.clearMode,
      };
    default:
      return state;
  }
}
