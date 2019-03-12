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
  togglePlayer = () => {
    return this.state.currentMove === this.state.PlayerOne
      ? this.state.PlayerTwo
      : this.state.PlayerOne;
  };
  makeMove = columnID => {
    const gridCopy = this.state.grid.map(arr => {
      return arr.slice();
    });
    // Check if there is no winner and if tile with null value exists
    if (this.state.winner === "" && gridCopy[columnID].indexOf(null) !== -1) {
      // place new tile on the board
      let newMove = gridCopy[columnID].reverse();
      newMove[newMove.indexOf(null)] = this.state.currentMove;
      newMove.reverse();
      this.setState({
        grid: gridCopy,
        currentMove: this.togglePlayer()
      });
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className="grid">
          {this.state.grid.map((_, index) => {
            return (
              <Column
                makeMove={() => this.makeMove(index)}
                tiles={this.state.grid[index]}
                key={index}
              />
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}
