import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../Actions";

const NewMapForm = (props) => {
  const dispatch = useDispatch();

  const xMapSize = useSelector((state) => state.xMapSize);
  const yMapSize = useSelector((state) => state.yMapSize);
  const mapBase = useSelector((state) => state.mapBase);
  const [xTiles, setxTiles] = useState(xMapSize);
  const [yTiles, setyTiles] = useState(yMapSize);
  const [formMapBase, setFormMapBase] = useState(mapBase);

  const handleNewMapSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: Actions.CREATE_MAP,
      xSize: xTiles,
      ySize: yTiles,
      mapBase: formMapBase,
    });
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
          min="1"
        />
        <br />
        <label>Y nº of tiles: </label>
        <input
          value={yTiles}
          onChange={(e) => setyTiles(e.target.value)}
          type="number"
          name="yTiles"
          min="1"
        />
        <br />
        <label>Pixels per Tile </label>
        <input
          value={formMapBase}
          onChange={(e) => setFormMapBase(e.target.value)}
          type="number"
          name="formMapBase"
          min="1"
        />
        <br />
        <button type="submit">Generate new Map!</button>
      </form>
    </div>
  );
};

export default NewMapForm;
