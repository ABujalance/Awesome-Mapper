import React from "react";
import Tile from "./Tile";
import { useSelector } from "react-redux";

const MapLayer = (props) => {
  const layerIndex = props.layerIndex;
  const layerMap = useSelector((state) => state.mapLayers);
  const selectedLayer = useSelector((state) => state.selectedLayer);
  const layer = layerMap[layerIndex];

  if (selectedLayer === layerIndex) {
    return <div className="map-layer">{layer.map(renderMapRowLayer)}</div>;
  } else {
    return <div></div>;
  }
};

export const renderMapRowLayer = (tileRow, index) => {
  return (
    <tr key={index} index={index}>
      {tileRow.map((tileType, columnIndex) => {
        return <Tile tileType={tileType} index={columnIndex} isBase={false} />;
      })}
    </tr>
  );
};

export default MapLayer;
