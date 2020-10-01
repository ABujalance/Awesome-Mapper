import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import NewMapForm from "./components/NewMapForm";

import AwesomeMap from "./components/Map";

const tileTypes = ["grass.png", "water.png"];

const startingTiles = [
  ["grass.png", "grass.png", "grass.png", "grass.png", "grass.png", ""],
  ["grass.png", "water.png", "water.png", "", "water.png", "water.png"],
  ["grass.png", "water.png", "grass.png", "grass.png", "grass.png", ""],
  ["grass.png", "water.png", "water.png", "water.png", "grass.png", ""],
  ["grass.png", "water.png", "water.png", "water.png", "grass.png", ""],
  ["", "", "", "", "", ""],
];

function App() {
  const clickNewTile = (tileType) => {
    alert(tileType);
  };

  return (
    <div className="App">
      <header className="App-header">
        <AwesomeMap />
        <div className="btn-group" aria-label="Tiles">
          {tileTypes.map((tileName, index) => {
            var tileType = process.env.PUBLIC_URL + "/images/" + tileName;
            return (
              <a onClick={() => clickNewTile(tileName)}>
                <img src={tileType}></img>
              </a>
            );
          })}
        </div>
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
