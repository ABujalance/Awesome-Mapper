import React from "react";
import Tile from "./Tile";
import { useSelector } from "react-redux";

const MapGrid = (props) => {
  const map = useSelector((state) => state.awesomeMap);

  const showGrid = useSelector((state) => state.showGrid);

  if (showGrid) {
    return <div className="map-layer">{map.map(renderMapRowLayer)}</div>;
  } else {
    return <div></div>;
  }
};

export const renderMapRowLayer = (tileRow, index) => {
  return (
    <tr key={index} index={index}>
      {tileRow.map((tileType, columnIndex) => {
        return (
          <Tile
            tileType="./special/grid.png"
            index={columnIndex}
            isBase={false}
          />
        );
      })}
    </tr>
  );
};

export default MapGrid;
