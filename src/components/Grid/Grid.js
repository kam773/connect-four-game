import React, { Component } from "react";
import Column from "../Column/Column";
import Button from '../Button/Button'
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
    if (this.state.winner === "") {
      if (gridCopy[columnID].indexOf(null) !== -1) {
        // place new tile on the board
        let newMove = gridCopy[columnID].reverse();
        newMove[newMove.indexOf(null)] = this.state.currentMove;
        newMove.reverse();
        this.setState({
          grid: gridCopy,
          currentMove: this.togglePlayer()
        });
      }
    }
  };

  winningSlice = (a, b, c, d) => {
    // check if tile is not null and if all sequence belongs to the same player
    return a !== null && a === b && a === c && a === d;
  };
  winVertical = board => {
    // check if row is less than 4 index (we start count from index 0)
    for (let c = 0; c < 7; c++)
      for (let r = 0; r < 4; r++)
        if (
          this.winningSlice(
            board[c][r],
            board[c][r + 1],
            board[c][r + 2],
            board[c][r + 3]
          )
        )
          return board[c][r];
  };
  winHorizontal = board => {
    // check if column is less than 4 index (we start count from index 0)
    for (let r = 0; r < 6; r++)
      for (let c = 0; c < 4; c++)
        if (
          this.winningSlice(
            board[c][r],
            board[c + 1][r],
            board[c + 2][r],
            board[c + 3][r]
          )
        )
          return board[c][r];
  };
  winDiagonalLeft = board => {
    // check if column is less than 4 index (we start count from index 0)
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 4; c++)
        if (
          this.winningSlice(
            board[c][r],
            board[c + 1][r + 1],
            board[c + 2][r + 2],
            board[c + 3][r + 3]
          )
        )
          return board[c][r];
  };
  winDiagonaRight = board => {
    // check if row is less than 4 index (we start count from index 0)
    for (let r = 0; r < 4; r++)
      for (let c = 3; c < 6; c++)
        if (
          this.winningSlice(
            board[c][r],
            board[c - 1][r + 1],
            board[c - 2][r + 2],
            board[c - 3][r + 3]
          )
        )
          return board[c][r];
  };
  checkSequence = board => {
    return (
      this.winVertical(board) ||
      this.winHorizontal(board) ||
      this.winDiagonaRight(board) ||
      this.winDiagonalLeft(board)
    );
  };
  componentDidUpdate = () => {
    let winner = this.checkSequence(this.state.grid);
    let message;
    // change winning player number to string message
    winner === 1
      ? (message = "Player red wins!")
      : winner === 2
      ? (message = "Player yellow wins!")
      : (message = "");
    if (message !== this.state.winner) {
      this.setState({
        winner: message,
        gameOver: true
      });
    }
  };

  render() {
    return (
      <React.Fragment>
       <Button initializeBoard={this.initializeBoard}/>
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
        <div className="result">
          <p className="message">{this.state.winner}</p>
        </div>
      </React.Fragment>
    );
  }
}
