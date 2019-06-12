import React from 'react';
import './GameBoard.scss'

import GameCell from './GameCell/GameCell';

class GameBoard extends React.Component {
  static defaultProps = { nColumns: 5, nRows: 5, chanceLightStartsOn: 0.25};
  state = { isWinner: false, board: this.createBoard() };

  createBoard() {
    let board = [];
    for(let y = 0; y < this.props.nRows; y++) {
      let row = [];
      for(let x = 0; x < this.props.nColumns; x++) {
        // Math.random() gives a random between 0 and 1, we compare it with the percentage of ON lights coming from props/defaultProps
        row.push(Math.random() < this.props.chanceLightStartsOn);
      }
      board.push(row);
    }
    return board;
  }

  renderGame = () => {
    const { nColumns, nRows } = this.props;
    let board = [];

    for(let y = 0; y < nRows; y++) {
      let row = [];
      for(let x = 0; x < nColumns; x++) {
        const coordinates = `${y}-${x}`;
        row.push(<GameCell key={coordinates} isOn={this.state.board[y][x]} flipCells={() => this.handleFlipCells(coordinates)}/>)
      }
      board.push(<tr key={y}>{row}</tr>);
    }

    return (
      <table className="Board">
        <tbody>{board}</tbody>
      </table>
    )
  }

  handleFlipCells = coordinates => {
    const {nColumns, nRows} = this.props;
    const board = this.state.board;
    const [y, x] = coordinates.split("-").map(Number);

    function flipCell(y, x) {
      // if this coordinate is actually on board, flip it
      if (x >= 0 && x < nColumns && y >= 0 && y < nRows) {
        board[y][x] = !board[y][x];
      }
    }
    // flip this cell and the cells around it
    flipCell(y, x);
    flipCell(y - 1 , x);
    flipCell(y + 1 , x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);

    const isWinner = board.every(row => row.every(cell => !cell));
    this.setState({board, isWinner});
  }

  handleRestartGame = () => {
    this.setState({ isWinner: false, board: this.createBoard() });
  }

  render() {
    return (
      <div className="GameBoard">
        {this.state.isWinner ?
          <>
            <span className="neon-orange winner">You</span>
            <span className="neon-blue winner">Win</span>
          </>
        :
        <div>
          <span className="neon-orange">Lights</span>
          <span className="neon-blue">Out</span>
          {this.renderGame()}
        </div>
      }
      <button className="restart-button" onClick={this.handleRestartGame}>Restart</button>
    </div>
    )
  }
};

export default GameBoard;
