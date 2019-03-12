import React, { Component } from "react";
import Column from "../Column/Column";
import "./style.css";
export default class Grid extends Component {
  constructor() {
    super();
    this.state = {
      grid: new Array(7).fill(new Array(6).fill(null)),
      PlayerOne: 1,
      PlayerTwo: 2,
      currentMove: null,
      gameOver: false,
      winner: ""
    };
  }
  initializeBoard = () => {
    // Create our initial game, will use to start new game as well
    this.setState({
      grid: new Array(7).fill(new Array(6).fill(null)),
      currentMove: this.state.PlayerOne,
      gameOver: false,
      winner: ""
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="grid">
          {this.state.grid.map((_, index) => {
            return <Column tiles={this.state.grid[index]} key={index} />;
          })}
        </div>
      </React.Fragment>
    );
  }
}
