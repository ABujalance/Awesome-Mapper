import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import NewMapForm from "./components/NewMapForm";
import { useSelector, useDispatch } from "react-redux";
import Actions from "./Actions";

import AwesomeMap from "./components/Map";
import TilesGallery from "./components/TilesGallery";
import LayerSelector from "./components/LayerSelector";
import SelectedTileDisplay from "./components/SelectedTileDisplay";
import SelectBrushSize from "./components/SelectBrushSize.js";
import PrintMap from "./components/PrintMap";
import ToggleGrid from "./components/ToggleGrid";
import SaveLoadMap from "./components/SaveLoadMap";
var tileTypes = [];

const importAll = (r) => {
  return r.keys();
};

tileTypes = importAll(require.context("../public/images/", true));
console.log(require.context("../public/images/", false));
console.log(tileTypes);
function App() {
  const dispatch = useDispatch();

  const handleKeyDown = (evt) => {
    if (evt.altKey) {
      if (evt.keyCode === 49) {
        dispatch({
          type: Actions.SET_BRUSH_SIZE,
          brushSize: 1,
        });
      }
      if (evt.keyCode === 50) {
        dispatch({
          type: Actions.SET_BRUSH_SIZE,
          brushSize: 2,
        });
      }
      if (evt.keyCode === 51) {
        dispatch({
          type: Actions.SET_BRUSH_SIZE,
          brushSize: 4,
        });
      }
      if (evt.ctrlKey) {
        dispatch({
          type: Actions.SET_BRUSH_SIZE,
          brushSize: 0,
        });
      }
    }
    if (evt.key === "Shift") {
      dispatch({
        type: Actions.TOGGLE_ERASE_MODE,
        eraseMode: true,
      });
    }
  };

  const handleKeyUp = (evt) => {
    if (evt.key === "Shift") {
      dispatch({
        type: Actions.TOGGLE_ERASE_MODE,
        eraseMode: false,
      });
    }
  };

  return (
    <div
      tabIndex="2000"
      onKeyDown={(evt) => handleKeyDown(evt)}
      onKeyUp={(evt) => handleKeyUp(evt)}
    >
      <header></header>
      <body className="App-body">
        <div className="App-controls">
          <div className="App-left-controls">
            <SelectBrushSize />
            <ToggleGrid />
          </div>
          <div className="App-map">
            <LayerSelector />
            <AwesomeMap />
            <SelectedTileDisplay />
            <TilesGallery />
          </div>
          <div className="App-right-controls">
            <SaveLoadMap />
            <PrintMap />
            <NewMapForm />
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;
