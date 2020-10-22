import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../Actions";

const SaveLoadMap = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const saveFile = {
    mapImages: state.mapImages,
    mapLayers: state.mapLayers,
    mapBase: state.mapBase,
    xMapSize: state.xMapSize,
    yMapSize: state.yMapSize,
    deletedLayers: state.deletedLayers,
    layerNames: state.layerNames,
  };
  const onClickSave = () => {
    var file = new Blob([JSON.stringify(state)], {
      type: "text/plain;charset=utf-8",
    });
    var element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = "map.tilp";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  async function onChangeHandler(event) {
    const file = event.target.files[0];
    event.target.value = null;
    var loadFile = [];
    try {
      loadFile = JSON.parse(await file.text());
      dispatch({
        type: Actions.CREATE_MAP,
        xSize: 16,
        YSize: 10,
        mapBase: 32,
      });
      dispatch({
        type: Actions.START_LOAD,
        loadFile: loadFile,
      });
    } catch (e) {
      alert("The file did not have the correct format");
    }
  }

  return (
    <div className="save-load-map-buttons">
      <button onClick={() => onClickSave()} className="btn btn-light">
        Save Map
      </button>
      <label class="upload-map">
        <input
          id="loadMap"
          type="file"
          name="file"
          onChange={(evt) => onChangeHandler(evt)}
          accept=".tilp"
        />
        <span>Load Map</span>
      </label>
    </div>
  );
};

export default SaveLoadMap;
