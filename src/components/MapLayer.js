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

  const mapBase = useSelector((state) => state.mapBase);
  const clearMode = useSelector((state) => state.clearMode);

  const [mouseDown, setMouseDown] = useState(false);
  const [currentX, setCurrentX] = useState(null);
  const [currentY, setCurrentY] = useState(null);

  const canvasRef = useRef(null);

  const onMouseDown = (evt) => {
    if (clearMode) {
      if (
        window.confirm(
          "Are you sure you want to delete the contents of the layer?"
        )
      ) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    } else {
      setMouseDown(true);
      if (eraseMode) {
        removeTile(evt);
      } else {
        addTile(evt);
      }
    }
  };

  const onMouseLeave = () => {
    setMouseDown(false);
    setCurrentX(null);
    setCurrentY(null);
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
    setCurrentX(null);
    setCurrentY(null);
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
    const simpleBaseCoordinate = coordinate / mapBase;
    const floorSimpleBaseCoordinate = Math.floor(simpleBaseCoordinate);
    return floorSimpleBaseCoordinate * mapBase;
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
              ctx.clearRect(x + i * mapBase, y + j * mapBase, mapBase, mapBase);
              ctx.drawImage(imageToPrint, x + i * mapBase, y + j * mapBase);
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
          ctx.clearRect(x + i * mapBase, y + j * mapBase, mapBase, mapBase);
        }
      }
      setCurrentX(x);
      setCurrentY(y);
    }
  };
  console.log("lays " + props.layer);
  console.log(selectedLayer);
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
      id={"myCanvas-" + props.layer}
      width={xMapSize * mapBase}
      height={yMapSize * mapBase}
      style={selectedLayer < props.layer ? { display: "none" } : {}}
    />
  );
};

export default MapLayer;
