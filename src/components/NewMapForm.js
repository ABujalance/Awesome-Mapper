import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Actions from "../Actions";

const NewMapForm = (props) => {
  const dispatch = useDispatch();

  const [xTiles, setxTiles] = useState(0);
  const [yTiles, setyTiles] = useState(0);

  const handleNewMapSubmit = (e) => {
    e.preventDefault();

    dispatch({ type: Actions.CREATE_MAP, xSize: xTiles, ySize: yTiles });
  };

  return (
    <div>
      <form onSubmit={handleNewMapSubmit}>
        <label>X nº of tiles: </label>
        <input
          value={xTiles}
          onChange={(e) => setxTiles(e.target.value)}
          type="number"
          name="xTiles"
        />
        <br />
        <label>Y nº of tiles: </label>
        <input
          value={yTiles}
          onChange={(e) => setyTiles(e.target.value)}
          type="number"
          name="yTiles"
        />
        <br />
        <button type="submit">Generate new Map!</button>
      </form>
    </div>
  );
};

export default NewMapForm;
