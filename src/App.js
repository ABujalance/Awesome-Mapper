import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import NewMapForm from "./components/NewMapForm";

import AwesomeMap from "./components/Map";
import TilesGallery from "./components/TilesGallery";

const tileTypes = ["grass.png", "water.png"];

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
