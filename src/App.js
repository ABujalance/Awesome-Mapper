import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import NewMapForm from "./components/NewMapForm";

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
  return (
    <div>
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
