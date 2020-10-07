import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const MapGrid = (props) => {
  const map = useSelector((state) => state.awesomeMap);
  const xMapSize = useSelector((state) => state.xMapSize);
  const yMapSize = useSelector((state) => state.yMapSize);
  const showGrid = useSelector((state) => state.showGrid);

  const mapBase = useSelector((state) => state.mapBase);

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const bw = context.canvas.width;
    const bh = context.canvas.height;
    var p = 0;
    var cw = 0;
    var ch = 0;

    for (var x = 0; x <= bw; x += mapBase) {
      context.moveTo(0 + x + p, p);
      context.lineTo(0 + x + p, bh + p);
    }

    for (var x = 0; x <= bh; x += mapBase) {
      context.moveTo(p, 0 + x + p);
      context.lineTo(bw + p, 0 + x + p);
    }

    context.strokeStyle = "black";
    context.stroke();
  }, []);

  console.log(showGrid);

  return (
    <canvas
      className="map-canvas grid"
      ref={canvasRef}
      tabIndex="1000"
      id="gridCanvas"
      width={xMapSize * mapBase}
      height={yMapSize * mapBase}
      style={!showGrid ? { display: "none" } : {}}
    />
  );
};

export default MapGrid;
