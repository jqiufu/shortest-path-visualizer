export const Dijkstras = (grid, sourceNode, targetNode) => {
  const visitedNodes = [];
  sourceNode.distance = 0;
  const unvisitedNodes = _getAllNodes(grid);

  while (unvisitedNodes.length !== 0) {
    unvisitedNodes.sort((a, b) => a.distance - b.distance);
    const minNode = unvisitedNodes.shift();

    minNode.isVisited = true;
    if (minNode === targetNode || minNode.distance === Infinity) {
      return [visitedNodes, _getShortestPath(targetNode)];
    }

    if (minNode.isWall) {
      continue;
    }

    _getUnvisitedNeighbours(minNode, grid).forEach((neighbourNode) => {
      if (minNode.distance + 1 < neighbourNode.distance) {
        neighbourNode.distance = minNode.distance + 1;
        neighbourNode.previous = minNode;
      }
    });

    visitedNodes.push(minNode);
  }
};

// Get all unvisited neighbours of a node.
// Note that it only checks the nodes above, below,
// to the left and to the right of the given node.
const _getUnvisitedNeighbours = (node, grid) => {
  const neighbors = [];
  const row = node.row;
  const col = node.col;
  if (row > 0) {
    neighbors.push(grid[row - 1][col]);
  }
  if (row < grid.length - 1) {
    neighbors.push(grid[row + 1][col]);
  }
  if (col > 0) {
    neighbors.push(grid[row][col - 1]);
  }
  if (col < grid[0].length - 1) {
    neighbors.push(grid[row][col + 1]);
  }

  return neighbors.filter((neighbor) => !neighbor.isVisited);
};

// Get all node objects from a given grid.
const _getAllNodes = (grid) => {
  const nodeArray = [];

  grid.forEach((row) => {
    row.forEach((node) => nodeArray.push(node));
  });

  return nodeArray;
};

// Get the shortest path
const _getShortestPath = (targetNode) => {
  const shortestPath = [];
  let currNode = targetNode.previous;

  while (currNode !== null) {
    shortestPath.unshift(currNode);
    currNode = currNode.previous;
  }

  return shortestPath;
};
