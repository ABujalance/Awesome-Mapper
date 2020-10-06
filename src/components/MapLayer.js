import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Actions from "../Actions";

const MapLayer = (props) => {
  const dispatch = useDispatch();
  const brushSize = useSelector((state) => state.brushSize);
  const xMapSize = useSelector((state) => state.xMapSize);
  const yMapSize = useSelector((state) => state.yMapSize);
  const draggedElement = useSelector((state) => state.draggedElement);
  const eraseMode = useSelector((state) => state.eraseMode);
  const selectedLayer = useSelector((state) => state.selectedLayer);

  const [mouseDown, setMouseDown] = useState(false);
  const [currentX, setCurrentX] = useState(null);
  const [currentY, setCurrentY] = useState(null);

  const canvasRef = useRef(null);

  const onMouseDown = (evt) => {
    setMouseDown(true);
    if (eraseMode) {
      removeTile(evt);
    } else {
      addTile(evt);
    }
  };

  const onMouseLeave = () => {
    setMouseDown(false);
  };

  const onMouseMove = (evt) => {
    if (mouseDown) {
      if (eraseMode) {
        removeTile(evt);
      } else {
        addTile(evt);
      }
    }
  };

  const onMouseUp = () => {
    setMouseDown(false);
  };

  const handleKeyDown = (evt) => {
    if (evt.key === "Shift") {
      dispatch({
        type: Actions.TOGGLE_ERASE_MODE,
        eraseMode: true,
      });
    }
  };

  const handleKeyUp = (evt) => {
    if (evt.key === "Shift") {
      dispatch({
        type: Actions.TOGGLE_ERASE_MODE,
        eraseMode: false,
      });
    }
  };

  const roundNumber = (coordinate) => {
    const simpleBaseCoordinate = coordinate / 32;
    const floorSimpleBaseCoordinate = Math.floor(simpleBaseCoordinate);
    return floorSimpleBaseCoordinate * 32;
  };

  const addTile = (evt) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = roundNumber(evt.clientX - rect.left);
    const y = roundNumber(evt.clientY - rect.top);
    if (x != currentX || y != currentY) {
      var imageToPrint = new Image();
      imageToPrint.src = draggedElement;
      imageToPrint.onload = () => {
        if (brushSize === 0) {
          var pattern = ctx.createPattern(imageToPrint, "repeat");
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else {
          for (var i = 0; i < brushSize; i++) {
            for (var j = 0; j < brushSize; j++) {
              ctx.clearRect(x + i * 32, y + j * 32, 32, 32);
              ctx.drawImage(imageToPrint, x + i * 32, y + j * 32);
            }
          }
        }
      };
      setCurrentX(x);
      setCurrentY(y);
    }
  };

  const removeTile = (evt) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = roundNumber(evt.clientX - rect.left);
    const y = roundNumber(evt.clientY - rect.top);
    if (x != currentX || y != currentY) {
      for (var i = 0; i < brushSize; i++) {
        for (var j = 0; j < brushSize; j++) {
          ctx.clearRect(x + i * 32, y + j * 32, 32, 32);
        }
      }
      setCurrentX(x);
      setCurrentY(y);
    }
  };
  if (selectedLayer >= props.layer) {
    return (
      <canvas
        className="map-canvas"
        onMouseDown={(evt) => onMouseDown(evt)}
        onMouseUp={() => onMouseUp()}
        onMouseLeave={() => onMouseLeave()}
        onMouseMove={(evt) => onMouseMove(evt)}
        onKeyDown={(evt) => handleKeyDown(evt)}
        onKeyUp={(evt) => handleKeyUp(evt)}
        ref={canvasRef}
        tabIndex="1000"
        id="myCanvas"
        width={xMapSize * 32}
        height={yMapSize * 32}
      />
    );
  } else {
    return <div></div>;
  }
};

export default MapLayer;
