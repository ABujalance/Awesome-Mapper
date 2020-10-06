import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Actions from "../Actions";
import Layer from "./MapLayer";
import MapGrid from "./MapGrid";

const AwesomeMap = (props) => {
  const mapLayers = useSelector((state) => state.mapLayers);
  return (
    <div id="capture">
      <div className="map-canvas-container">
        <Layer layer={0} />
        {Array.from(Array(mapLayers), (el, index) => {
          return <Layer layer={index} />;
        })}
        <MapGrid />
      </div>
    </div>
  );
};

export default AwesomeMap;
