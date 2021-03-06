import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layer from "./MapLayer";
import MapGrid from "./MapGrid";

const AwesomeMap = (props) => {
  const mapLayers = useSelector((state) => state.mapLayers);
  const showGrid = useSelector((state) => state.showGrid);
  const mapBase = useSelector((state) => state.mapBase);
  const isLoadingMap = useSelector((state) => state.cleaisLoadingMaprMode);
  const brushSize = useSelector((state) => state.brushSize);
  const eraseMode = useSelector((state) => state.eraseMode);
  const clearMode = useSelector((state) => state.clearMode);
  const deletedLayers = useSelector((state) => state.deletedLayers);

  var mapClass = "map-canvas-container";
  if (clearMode) {
    mapClass = mapClass.concat(" clear-pointer");
  } else if (brushSize === 0) {
    mapClass = mapClass.concat(" eraser-pointer");
  } else if (eraseMode) {
    mapClass = mapClass.concat(" bucket-pointer");
  } else {
    mapClass = mapClass.concat(" brush-pointer");
  }
  return (
    <div className={mapClass}>
      <Layer layer={0} isLoadingMap={isLoadingMap} />
      {Array.from(Array(mapLayers), (el, index) => {
        if (!deletedLayers.includes(index)) {
          return <Layer layer={index + 1} isLoadingMap={isLoadingMap} />;
        }
      })}
      {showGrid ? <MapGrid mapBase={mapBase} /> : <div></div>}
    </div>
  );
};

export default AwesomeMap;
