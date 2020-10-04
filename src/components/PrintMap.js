import React from "react";
import html2canvas from "html2canvas";
const PrintMap = (props) => {
  return (
    <div>
      <button
        className="btn btn-light"
        onClick={() =>
          html2canvas(document.querySelector("#capture")).then((canvas) => {
            window
              .open()
              .document.write('<img src="' + canvas.toDataURL() + '" />');
          })
        }
      >
        Print Map!
      </button>
    </div>
  );
};

export default PrintMap;
