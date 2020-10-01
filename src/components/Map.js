import React from "react";
import Tile from "./Tile";
import { useSelector } from "react-redux";

const AwesomeMap = (props) => {
  const tiles = useSelector((state) => state.awesomeMap);

  return (
    <div>
      <div className="awesome-map">{tiles.map(renderMapRow)}</div>
    </div>
  );
};

const renderMapRow = (tileRow, index) => {
  return (
    <tr key={index}>
      {tileRow.map((tileType) => {
        return <Tile tileType={tileType} />;
      })}
    </tr>
  );
};

export default AwesomeMap;
