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
  const mapImages = useSelector((state) => state.mapImages);
  const undoStack = useSelector((state) => state.undoStack);
  const isLoadingMap = useSelector((state) => state.isLoadingMap);

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

  const handleKeyDown = (evt) => {
    if (evt.ctrlKey) {
      if (evt.keyCode === 90) {
        undo();
      }
    }
  };
  const saveMapState = () => {
    const canvas = canvasRef.current;
    var newMapImages = [...mapImages];

    //Obtain base64 canvas image to save it
    var imgUrl = canvas.toDataURL();

    newMapImages[props.layer] = imgUrl;
    dispatch({
      type: Actions.UPDATE_MAP_IMAGES,
      mapImages: newMapImages,
    });
    var newUndoStack = [...undoStack];
    newUndoStack.push(imgUrl);
    dispatch({
      type: Actions.SET_UNDO_STACK,
      undoStack: newUndoStack,
    });
  };

  const undo = () => {
    var newUndoStack = [...undoStack];
    newUndoStack.pop();
    const undoImage = newUndoStack[newUndoStack.length - 1];
    console.log(undoImage);
    const canvas = canvasRef.current;
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var image = new Image();

    image.src = undoImage;

    image.onload = function () {
      ctx.drawImage(image, 0, 0);
    };
    dispatch({
      type: Actions.SET_UNDO_STACK,
      undoStack: newUndoStack,
    });
  };

  const loadMapState = () => {
    const canvas = canvasRef.current;
    var ctx = canvas.getContext("2d");
    var image = new Image();

    image.src = mapImages[props.layer];

    image.onload = function () {
      ctx.drawImage(image, 0, 0);
    };
  };

  const stopDrawing = () => {
    setMouseDown(false);
    setCurrentX(null);
    setCurrentY(null);
    saveMapState();
  };

  const onMouseLeave = () => {
    if (mouseDown) {
      stopDrawing();
    }
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
    stopDrawing();
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

  if (isLoadingMap && canvasRef.current) {
    console.log("cagando");
    loadMapState();
    dispatch({
      type: Actions.FINISH_LOAD,
    });
  }

  return (
    <canvas
      className="map-canvas"
      onKeyDown={(evt) => handleKeyDown(evt)}
      onMouseDown={(evt) => onMouseDown(evt)}
      onMouseUp={() => onMouseUp()}
      onMouseLeave={() => onMouseLeave()}
      onMouseMove={(evt) => onMouseMove(evt)}
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
