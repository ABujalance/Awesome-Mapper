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
  mapImages: [[]],
  isLoadingMap: false,
  layersLoaded: -1,
  undoStack: [],
  deletedLayers: [],
  layerNames: [],
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
        selectedLayer: 0,
        mapBase: Number(newMapBase),
        showGrid: false,
        mapImages: [],
        isLoadingMap: false,
        undoStack: [],
        deletedLayers: [],
        layerNames: [],
      };
    case ActionTypes.CHANGE_DRAGGED_ELEMENT:
      return { ...state, draggedElement: action.draggedElement };
    case ActionTypes.SELECT_LAYER:
      var newSelectedLayer = action.selectedLayer;
      const deletedLayers = state.deletedLayers;
      if (deletedLayers.includes(newSelectedLayer - 1)) {
        newSelectedLayer = state.selectedLayer;
      }
      return { ...state, selectedLayer: newSelectedLayer, undoStack: [] };
    case ActionTypes.DELETE_LAYER:
      const deletedLayer = action.deletedLayer;
      var newDeletedLayers = [...state.deletedLayers];
      var newSelectedLayer = state.selectedLayer;
      if (newSelectedLayer === deletedLayer + 1) {
        newSelectedLayer = newSelectedLayer - 1;
      }
      newDeletedLayers.push(deletedLayer);
      return {
        ...state,
        selectedLayer: newSelectedLayer,
        deletedLayers: newDeletedLayers,
      };
    case ActionTypes.SET_BRUSH_SIZE:
      return { ...state, brushSize: action.brushSize };
    case ActionTypes.ADD_LAYER:
      var newMapLayers = state.mapLayers + 1;
      var newMapImages = [...state.mapImages];
      newMapImages.push("");
      var newLayerNames = [...state.layerNames];
      newLayerNames.push("New Layer");
      return {
        ...state,
        mapLayers: newMapLayers,
        mapImages: newMapImages,
        layerNames: newLayerNames,
      };
    case ActionTypes.CHANGE_LAYER_NAMES:
      return {
        ...state,
        layerNames: action.layerNames,
      };
    case ActionTypes.TOGGLE_GRID:
      return { ...state, showGrid: !state.showGrid };
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
    case ActionTypes.UPDATE_MAP_IMAGES:
      return {
        ...state,
        mapImages: action.mapImages,
      };
    case ActionTypes.START_LOAD:
      const loadFile = action.loadFile;
      return {
        ...state,
        mapImages: loadFile.mapImages,
        mapLayers: loadFile.mapLayers,
        selectedLayer: 0,
        isLoadingMap: true,
        mapBase: loadFile.mapBase,
        xMapSize: loadFile.xMapSize,
        yMapSize: loadFile.yMapSize,
        deletedLayers: loadFile.deletedLayers,
        layerNames: loadFile.layerNames,
      };
    case ActionTypes.FINISH_LOAD:
      var layersLoaded = state.layersLoaded;
      layersLoaded++;
      if (layersLoaded > state.mapLayers) {
        return { ...state, isLoadingMap: false, layersLoaded: -1 };
      } else {
        return { ...state, layersLoaded: layersLoaded };
      }
    case ActionTypes.SET_UNDO_STACK:
      return { ...state, undoStack: action.undoStack };

    default:
      return state;
  }
}
