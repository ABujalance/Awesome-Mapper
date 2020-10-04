import React from "react";
import { useDispatch } from "react-redux";
import Actions from "../Actions";

const AddLayer = (props) => {
  const dispatch = useDispatch();

  const onClick = (evt) => {
    dispatch({
      type: Actions.ADD_LAYER,
    });
  };

  return (
    <button onClick={(evt) => onClick(evt)} className="btn btn-light">
      +
    </button>
  );
};

export default AddLayer;
