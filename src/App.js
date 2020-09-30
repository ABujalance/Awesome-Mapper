import React from 'react';
import logo from './logo.svg';
import './App.css';

import AwesomeMap from './components/Map'

const tiles= [
  ['grass.png','grass.png','grass.png','grass.png','grass.png'],
  ['grass.png','water.png','water.png','water.png','water.png'],
  ['grass.png','water.png','grass.png','grass.png','grass.png'],
  ['grass.png','water.png','water.png','water.png','grass.png'],
  ['grass.png','water.png','water.png','water.png','grass.png']      
]

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AwesomeMap tiles={tiles}/>
        <p>
         Welcome to Awesome Mapper!
        </p>
        
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
