import React, { useRef } from "react";
import { useSelector } from "react-redux";
import MapLayer from "./MapLayer";

import Tile from "./Tile";
import MapGrid from "./MapGrid";

const AwesomeMap = (props) => {
  const tiles = useSelector((state) => state.awesomeMap);
  const brushSize = useSelector((state) => state.brushSize);
  const mapLayers = useSelector((state) => state.mapLayers);
  const xMapSize = useSelector((state) => state.xMapSize);
  const yMapSize = useSelector((state) => state.yMapSize);
  const coolMap = useSelector((state) => state.coolMap);
  const draggedElement = useSelector((state) => state.draggedElement);

  const canvasRef = useRef(null);

  var mapClass = "awesome-map ";
  if (brushSize === 1) {
    mapClass = mapClass.concat("small-pointer");
  } else if (brushSize === 2) {
    mapClass = mapClass.concat("medium-pointer");
  } else if (brushSize === 4) {
    mapClass = mapClass.concat("big-pointer");
  } else if (brushSize === 0) {
    mapClass = mapClass.concat("fill-pointer");
  }

  const onClickCanvas = (evt) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = roundNumber(evt.clientX - rect.left);
    const y = roundNumber(evt.clientY - rect.top);
    console.log("x: " + x + " y: " + y);
    var imageToPrint = new Image();
    imageToPrint.src = draggedElement;
    imageToPrint.onload = () => {
      ctx.drawImage(imageToPrint, x, y);
    };
  };

  const onMouseDown = () => {
    const canvas = canvasRef.current;
    canvas.addEventListener("mousemove", onMouseMove);
  };

  const onMouseMove = (evt) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = roundNumber(evt.clientX - rect.left);
    const y = roundNumber(evt.clientY - rect.top);
    console.log("x: " + x + " y: " + y);
    var imageToPrint = new Image();
    imageToPrint.src = draggedElement;
    imageToPrint.onload = () => {
      ctx.drawImage(imageToPrint, x, y);
    };
  };

  const onMouseUp = () => {
    const canvas = canvasRef.current;
    canvas.removeEventListener("mousemove", onMouseMove);
  };

  const roundNumber = (coordinate) => {
    const simpleBaseCoordinate = coordinate / 32;
    const floorSimpleBaseCoordinate = Math.floor(simpleBaseCoordinate);
    return floorSimpleBaseCoordinate * 32;
  };

  return (
    <div id="capture">
      <div className={mapClass}>
        <canvas
          onMouseDown={(evt) => onMouseDown(evt)}
          onMouseUp={(evt) => onMouseUp(evt)}
          onClick={(evt) => onClickCanvas(evt)}
          ref={canvasRef}
          id="myCanvas"
          width={xMapSize * 32}
          height={yMapSize * 32}
          style={{ border: "1px solid" }}
        />
      </div>
    </div>
  );
};

const renderMapRow = (tileRow, index) => {
  return (
    <tr key={index} index={index}>
      {tileRow.map((tileType, columnIndex) => {
        return <Tile tileType={tileType} index={columnIndex} isBase={true} />;
      })}
    </tr>
  );
};

export default AwesomeMap;
