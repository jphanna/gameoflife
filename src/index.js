import React from 'react';
import ReactDOM from 'react-dom';
import Buttons from './components/Buttons';
import World from './components/World';

function deepClone(array) {
  return JSON.parse(JSON.stringify(array));
}

class Life extends React.Component {
  constructor(props) {
    super(props);
    this.cols = 70;
    this.rows = 40;
    this.speed = 90;

    this.state = {
      fullWorld: this.createWorld(),
      generation: 0
    };
  }

  createWorld = () =>
    Array(this.rows)
    .fill()
    .map(() => Array(this.cols).fill(false));

  touchOfLife = (row, col) => {
    let worldCopy = deepClone(this.state.fullWorld);
    worldCopy[row][col] = !worldCopy[row][col];
    this.setState({ fullWorld: worldCopy });
  };

  play = () => {
    // world is used to compare current state
    const world = deepClone(this.state.fullWorld);
    // world2 is for changing and setting state
    let world2 = deepClone(this.state.fullWorld);

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        let neighbors = 0; // neighbors suck sometimes

        /* When r (row) is > 0 (not top row)
        *  check cell directly above current cell
        */
        if (r > 0) {
          if (world[r - 1][c]) {
            neighbors++;
          }
        }
        /* When r (row) is not top row
        *  and c (col) is not totally left side
        *  then check cell on top left of current
        */
        if (r > 0 && c > 0) {
          if (world[r - 1][c - 1]) {
            neighbors++;
          }
        }
        /* When r (row) is not top row
        *  and c (col) is not fully right side
        *  check cell at top right of current cell
        */
        if (r > 0 && c < this.cols - 1) {
          if (world[r - 1][c + 1]) {
            neighbors++;
          }
        }
        /* When c (col) is not fully right
        *  but r (row) can be ANY row (even top)
        *  check cell at direct right of current cell
        */
        if (c < this.cols - 1) {
          if (world[r][c + 1]) {
            neighbors++;
          }
        }
        /* When c (col) is not fully left side
        *  and r (row can be ANY row (even top/bottom)
        *  check cell directly left of current cell
        */
        if (c > 0) {
          if (world[r][c - 1]) {
            neighbors++;
          }
        }
        /* When r (row) is not bottom row
        *  and c can be ANY column
        *  check cell directly below
        *  current cell
        */
        if (r < this.rows - 1) {
          if (world[r + 1][c]) {
            neighbors++;
          }
        }
        /* When r (row) is not bottom
        *  and c (col) is not fully left side
        *  check cell at bottom left of
        * current cell
        */
        if (r < this.rows - 1 && c > 0) {
          if (world[r + 1][c - 1]) {
            neighbors++;
          }
        }
        /* When r (row) is not bottom
        * and c (col) is not fully right side
        * check cell at bottom right of current cell
        */
        if (r < this.rows - 1 && c < this.cols - 1) {
          if (world[r + 1][c + 1]) {
            neighbors++;
          }
        }
        /* If cell is alive AND has less than 2
        *  neighbors OR more than 3
        *  The cell dies
        */
        if (world[r][c] && (neighbors < 2 || neighbors > 3)) {
          world2[r][c] = false;
        }
        /* If cell is dead AND has exactly 3
        *  neighbors, the cell becomes alive
        */
        if (!world[r][c] && neighbors === 3) {
          world2[r][c] = true;
        }
      }
    }
    this.setState({
      fullWorld: world2,
      generation: this.state.generation + 1
    });
  };

  playButton = () => {
    clearInterval(this.genTimer); //in-case play pushed twice
    this.genTimer = setInterval(this.play, this.speed);
  };

  pauseButton = () => {
    clearInterval(this.genTimer);
  };

  clearButton = () => {
    clearInterval(this.genTimer);
    const world = this.createWorld();
    this.setState({
      fullWorld: world,
      generation: 0
    });
  };

  seedButton = () => {
    let worldCopy = deepClone(this.state.fullWorld);
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (Math.floor(Math.random() * 3) === 1) {
          worldCopy[r][c] = true;
        }
      }
    }
    this.setState({ fullWorld: worldCopy });
  };

  slowButton = () => {
    this.speed = 1200;
    this.playButton();
  };

  medButton = () => {
    this.speed = 600;
    this.playButton();
  };

  fastButton = () => {
    this.speed = 90;
    this.playButton();
  };

  lightweightSpaceShip = () => {
    let world = this.createWorld();

    world = world.map((row, r) =>
      row.map((col, c) => {
        if (
          (r === 2 && c === 0) ||
          (r === 2 && c === 3) ||
          (r === 3 && c === 4) ||
          (r === 4 && c === 0) ||
          (r === 4 && c === 4) ||
          (r === 5 && c === 1) ||
          (r === 5 && c === 2) ||
          (r === 5 && c === 3) ||
          (r === 5 && c === 4)
        ) {
          return true;
        } else {
          return false;
        }
      })
    );

    this.setState({ fullWorld: world });
  };

  gosperGliderGun = () => {
    let world = this.createWorld();

    world = world.map((row, r) =>
      row.map((col, c) => {
        if (
          (r === 1 && c === 25) ||
          (r === 2 && c === 23) ||
          (r === 2 && c === 25) ||
          (r === 3 && c === 13) ||
          (r === 3 && c === 14) ||
          (r === 3 && c === 21) ||
          (r === 3 && c === 22) ||
          (r === 3 && c === 35) ||
          (r === 3 && c === 36) ||
          (r === 4 && c === 12) ||
          (r === 4 && c === 16) ||
          (r === 4 && c === 21) ||
          (r === 4 && c === 22) ||
          (r === 4 && c === 35) ||
          (r === 4 && c === 36) ||
          (r === 5 && c === 1) ||
          (r === 5 && c === 2) ||
          (r === 5 && c === 11) ||
          (r === 5 && c === 17) ||
          (r === 5 && c === 21) ||
          (r === 5 && c === 22) ||
          (r === 6 && c === 1) ||
          (r === 6 && c === 2) ||
          (r === 6 && c === 11) ||
          (r === 6 && c === 15) ||
          (r === 6 && c === 17) ||
          (r === 6 && c === 18) ||
          (r === 6 && c === 23) ||
          (r === 6 && c === 25) ||
          (r === 7 && c === 11) ||
          (r === 7 && c === 17) ||
          (r === 7 && c === 25) ||
          (r === 8 && c === 12) ||
          (r === 8 && c === 16) ||
          (r === 9 && c === 13) ||
          (r === 9 && c === 14)
        ) {
          return true;
        } else {
          return false;
        }
      })
    );
    this.setState({ fullWorld: world });
  };

  componentDidMount() {
    this.seedButton();
    this.playButton();
  }

  componentWillUnmount() {
    clearInterval(this.genTimer);
  }

  render() {
    return (
      <div>
        <h1>Conway&apos;s Game of Life</h1>
        <Buttons
          playButton={this.playButton}
          pauseButton={this.pauseButton}
          clearButton={this.clearButton}
          seedButton={this.seedButton}
          slowButton={this.slowButton}
          medButton={this.medButton}
          fastButton={this.fastButton}
          lightweightSpaceShip={this.lightweightSpaceShip}
          gosperGliderGun={this.gosperGliderGun}
        />
        <p>Generation #{this.state.generation}</p>
        <World
          fullWorld={this.state.fullWorld}
          rows={this.rows}
          cols={this.cols}
          touchOfLife={this.touchOfLife}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <Life />,
  document.getElementById("life")
);
