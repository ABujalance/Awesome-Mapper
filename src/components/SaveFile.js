import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../Actions";

const SaveFile = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const onClickSave = () => {
    var file = new Blob([JSON.stringify(state)], {
      type: "text/plain;charset=utf-8",
    });
    var element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  async function onChangeHandler(event) {
    const file = event.target.files[0];
    var newState = [];
    try {
      newState = JSON.parse(await file.text());
      console.log(newState.awesomeMap);
      dispatch({
        type: Actions.LOAD_MAP,
        newState: newState,
      });
    } catch (e) {
      alert("The file did not have the correct format");
    }
  }

  return (
    <div>
      <button onClick={() => onClickSave()} className="btn btn-light">
        Save Map
      </button>
      <h2>Load Map</h2>
      <input type="file" name="file" onChange={(evt) => onChangeHandler(evt)} />
    </div>
  );
};

export default SaveFile;
