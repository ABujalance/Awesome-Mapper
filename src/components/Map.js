import React from "react";
import { useSelector } from "react-redux";
import MapLayer from "./MapLayer";

import Tile from "../components/Tile";

const AwesomeMap = (props) => {
  const tiles = useSelector((state) => state.awesomeMap);

  return (
    <div>
      <div className="awesome-map">
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
