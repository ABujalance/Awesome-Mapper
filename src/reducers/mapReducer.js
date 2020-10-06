import ActionTypes from "../Actions";
const initialState = {
  draggedElement: "",
  mapLayers: 0,
  selectedLayer: null,
  brushSize: 1,
  xMapSize: 10,
  yMapSize: 10,
  showGrid: false,
  eraseMode: false,
};
export default function mapReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.CREATE_MAP:
      const xSize = action.xSize;
      const ySize = action.ySize;
      var newLayers = 0;
      return {
        ...state,
        mapLayers: newLayers,
        xMapSize: xSize,
        yMapSize: ySize,
        selectedLayer: null,
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
    default:
      return state;
  }
}
