import React from "react";
import { useSelector } from "react-redux";
import MapLayer from "./MapLayer";

import Tile from "../components/Tile";

const AwesomeMap = (props) => {
  const tiles = useSelector((state) => state.awesomeMap);
  const brushSize = useSelector((state) => state.brushSize);

  var mapClass = "awesome-map ";
  if (brushSize === 0) {
    mapClass = mapClass.concat("small-pointer");
  } else if (brushSize === 1) {
    mapClass = mapClass.concat("medium-pointer");
  } else if (brushSize === 2) {
    mapClass = mapClass.concat("big-pointer");
  }

  return (
    <div>
      <div className={mapClass}>
        <div>{tiles.map(renderMapRow)}</div>
        <MapLayer layerIndex={0} />
      </div>
    </div>
  );
};

export const renderMapRow = (tileRow, index) => {
  return (
    <tr key={index} index={index}>
      {tileRow.map((tileType, columnIndex) => {
        return <Tile tileType={tileType} index={columnIndex} isBase={true} />;
      })}
    </tr>
  );
};

export default AwesomeMap;
