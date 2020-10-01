import React from "react";
import Tile from "./Tile";
import { useSelector } from "react-redux";

const AwesomeMap = (props) => {
  const tiles = useSelector((state) => state.awesomeMap);

  console.log("Here are the Tiles");
  console.table(tiles);

  console.log("Hemos venio a bailar");
  console.table(tiles);
  console.log(tiles);

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
