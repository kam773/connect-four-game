import React from "react";
import Tile from "../Tile/Tile";

export default function Column(props) {
  return (
    <div className="column" onClick={() => props.makeMove()}>
      {props.tiles.map((_, index) => {
        return <Tile key={index} value={props.tiles[index]} />;
      })}
    </div>
  );
}
