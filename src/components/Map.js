import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layer from "./MapLayer";
import MapGrid from "./MapGrid";

const AwesomeMap = (props) => {
  const mapLayers = useSelector((state) => state.mapLayers);
  return (
    <div className="map-canvas-container">
      <Layer layer={0} />
      {Array.from(Array(mapLayers), (el, index) => {
        return <Layer layer={index} />;
      })}
      <MapGrid />
    </div>
  );
};

export default AwesomeMap;
