import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import NewMapForm from "./components/NewMapForm";

import AwesomeMap from "./components/Map";
import TilesGallery from "./components/TilesGallery";
import LayerSelector from "./components/LayerSelector";

var tileTypes = [];

const importAll = (r) => {
  return r.keys();
};

tileTypes = importAll(
  require.context("../public/images/", false, /\.(png|jpe?g|svg)$/)
);
console.log(tileTypes);
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LayerSelector />
        <AwesomeMap />
        <TilesGallery tileTypes={tileTypes} />
        <NewMapForm />
        <p>Welcome to Awesome Mapper!</p>
        This project is being developed by
        <a
          className="App-link"
          href="https://abujalance.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Abujalance
        </a>
      </header>
    </div>
  );
}

export default App;
