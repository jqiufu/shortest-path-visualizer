import { cloneDeep } from "lodash";

export class CustomGrid {
  constructor(numRows, numCols) {
    this._grid = createGrid(numRows, numCols);
    this._nodes = getAllNodes(this._grid);
  }

  get grid() {
    return cloneDeep(this._grid);
  }

  get nodes() {
    return cloneDeep(this._nodes);
  }
}

// Create an empty 2D array that will be iterated over
// to create several Node components.
const createGrid = (numRows, numCols) => {
  const grid = [];

  for (let row = 0; row < numRows; row++) {
    const currRow = [];

    for (let col = 0; col < numCols; col++) {
      currRow.push(createNode(row, col));
    }

    grid.push(currRow);
  }

  return grid;
};

// Creates a node which is a JavaScript object.
const createNode = (row, col) => {
  return {
    id: `${row}${col}`,
    row,
    col,
    isStart: false,
    isFinish: false,
    isWall: false,
    isVisited: false,
    isShortestPath: false,
    distance: Infinity,
    previous: null,
  };
};

// Get all node objects from a given grid.
const getAllNodes = (grid) => {
  const nodeArray = [];

  grid.forEach((row) => {
    row.forEach((node) => nodeArray.push(node));
  });

  return nodeArray;
};
