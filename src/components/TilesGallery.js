import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Actions from "../Actions";
import { Collapse, Button, CardBody, Card } from "reactstrap";

const TilesGallery = (props) => {
  const tileTypes = props.tileTypes;
  const dispatch = useDispatch();
  const structureFolder = props.structureFolder;
  const [openFolder, setOpenFolder] = useState("");
  const toggle = (folder) => {
    if (openFolder === folder) {
      setOpenFolder("");
    } else {
      setOpenFolder(folder);
    }
  };

  const onClick = (event, tileName) => {
    event.preventDefault();
    dispatch({
      type: Actions.CHANGE_DRAGGED_ELEMENT,
      draggedElement: tileName,
    });
  };

  return (
    <div>
      <h2>Tile Selector</h2>

      {structureFolder.map((folder, index) => {
        const name = folder.name;
        if (name != "special") {
          return (
            <div>
              <Button
                color="light"
                onClick={() => toggle(folder.name)}
                style={{ marginBottom: "1rem" }}
              >
                {folder.name}
              </Button>
              <Collapse isOpen={openFolder === name}>
                <Card className="bg-dark">
                  <CardBody className="tiles-gallery">
                    {folder.content.map((tileName) => {
                      var tileType =
                        process.env.PUBLIC_URL + "/images/" + tileName;
                      return (
                        <div
                          className="drag-tile"
                          onClick={(event) => onClick(event, tileName)}
                        >
                          <img src={tileType}></img>
                        </div>
                      );
                    })}
                  </CardBody>
                </Card>
              </Collapse>
            </div>
          );
        } else {
          return <div></div>;
        }
      })}
      <div
        className="drag-tile eraser"
        onClick={(event) => onClick(event, "")}
      ></div>
    </div>
  );
};

export default TilesGallery;
