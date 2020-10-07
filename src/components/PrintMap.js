import React from "react";
import html2canvas from "html2canvas";
import { useSelector } from "react-redux";
const PrintMap = (props) => {
  const mapImages = useSelector((state) => state.mapImages);
  const xMapSize = useSelector((state) => state.xMapSize);
  const yMapSize = useSelector((state) => state.yMapSize);
  const showGrid = useSelector((state) => state.showGrid);
  const mapBase = useSelector((state) => state.mapBase);

  const loadImages = (mapImages, callback) => {
    var images = new Array(mapImages.length);
    var loadedImages = 0;
    var numImages = mapImages.length;

    for (var i = 0; i < mapImages.length; i++) {
      images[i] = new Image();
      images[i].onload = function () {
        if (++loadedImages >= numImages) {
          callback(images);
        }
      };
      images[i].src = mapImages[i];
    }
  };

  const printMap = () => {
    const canvas = document.createElement("CANVAS");
    canvas.width = xMapSize * mapBase;
    canvas.height = yMapSize * mapBase;
    const context = canvas.getContext("2d");

    loadImages(mapImages, function (images) {
      for (var i = 0; i < mapImages.length; i++) {
        context.drawImage(images[i], 0, 0);
      }
    });
    setTimeout(function () {
      if (showGrid) {
        const bw = context.canvas.width;
        const bh = context.canvas.height;
        console.log(bw);
        console.log(bh);
        console.log(mapBase);

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
      }

      const canvasUrl = canvas.toDataURL();
      console.log(canvasUrl);
      window.open().document.write('<img src="' + canvasUrl + '" />');
    }, 200);
  };

  return (
    <div>
      <button className="btn btn-light" onClick={printMap}>
        Print Map!
      </button>
    </div>
  );
};

export default PrintMap;
