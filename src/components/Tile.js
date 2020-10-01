import React from "react";

const Tile = (props) => {
  const tileType = props.tileType;
  const imgUrl = tileType
    ? process.env.PUBLIC_URL + "/images/" + tileType
    : process.env.PUBLIC_URL + "/images/empty.png";
  return (
    <td>
      <img src={imgUrl} />
    </td>
  );
};

export default Tile;
