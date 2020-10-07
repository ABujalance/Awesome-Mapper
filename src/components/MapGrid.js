import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MapGrid = (props) => {
  const xMapSize = useSelector((state) => state.xMapSize);
  const yMapSize = useSelector((state) => state.yMapSize);

  const mapBase = props.mapBase;

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const bw = context.canvas.width;
    const bh = context.canvas.height;
    console.log(bw);
    console.log(bh);
    console.log(mapBase);
    context.clearRect(0, 0, bw, bh);

    var p = 0;
    console.log(p);

    for (var x = 0; x <= bw; x += mapBase) {
      context.moveTo(x + p, p);
      context.lineTo(x + p, bh + p);
    }

    for (var x = 0; x <= bh; x += mapBase) {
      context.moveTo(p, x + p);
      context.lineTo(bw + p, x + p);
    }

    context.strokeStyle = "black";
    context.stroke();
    context.beginPath();
  }, []);

  return (
    <canvas
      className="map-canvas grid"
      ref={canvasRef}
      tabIndex="1000"
      id="gridCanvas"
      width={xMapSize * mapBase}
      height={yMapSize * mapBase}
    />
  );
};

export default MapGrid;
