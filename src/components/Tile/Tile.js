import React from "react";
import "./style.css";

export default function Tile(props) {
  let color;
  props.value === 1
    ? (color = "red")
    : props.value === 2
    ? (color = "yellow")
    : (color = "white");
  return (
    <div className="tile">
      <div className={color} />
    </div>
  );
}
