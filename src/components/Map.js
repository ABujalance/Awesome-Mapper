import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layer from "./MapLayer";
import MapGrid from "./MapGrid";

const AwesomeMap = (props) => {
  const mapLayers = useSelector((state) => state.mapLayers);
  const showGrid = useSelector((state) => state.showGrid);
  const mapBase = useSelector((state) => state.mapBase);
  return (
    <div className="map-canvas-container">
      <Layer layer={0} />
      {Array.from(Array(mapLayers), (el, index) => {
        return <Layer layer={index + 1} />;
      })}
      {showGrid ? <MapGrid mapBase={mapBase} /> : <div></div>}
    </div>
  );
};

export default AwesomeMap;
