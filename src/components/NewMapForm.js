import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../Actions";

const NewMapForm = (props) => {
  const dispatch = useDispatch();

  const xMapSize = useSelector((state) => state.xMapSize);
  const yMapSize = useSelector((state) => state.yMapSize);
  const [xTiles, setxTiles] = useState(xMapSize);
  const [yTiles, setyTiles] = useState(yMapSize);

  const handleNewMapSubmit = (e) => {
    e.preventDefault();
    if (xTiles * yTiles >= 400) {
      alert(
        "When you work with big map sizes, be careful while dragging the brush since it may slow down your system. Instead, try just clicking where you want to draw/erase"
      );
    }

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
          min="1"
          max="50"
        />
        <br />
        <label>Y nº of tiles: </label>
        <input
          value={yTiles}
          onChange={(e) => setyTiles(e.target.value)}
          type="number"
          name="yTiles"
          min="1"
          max="50"
        />
        <br />
        <button type="submit">Generate new Map!</button>
      </form>
    </div>
  );
};

export default NewMapForm;
