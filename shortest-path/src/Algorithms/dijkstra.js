const node = {
    row, 
    col,
    visited,
    dist,
};

function dijkstra(grid, startNode, endNode) {
    // Edge Case: no start node or end end node or they interlap
    if (!startNode || !endNode || startNode === endNode) {
        return false;
    }

    nodes[startNode].dist = 0;
    const unvisitedNodes = nodes.slice()

    while (!!unvisitedNodes.length) {
        sortNodes(unvisitedNodes);
        const closestNode = unvisitedNodes.unshift();

        closestNode.visited = true;
        if (closestNode === endNode) return 'sucess!';
        updateNeighbors(closestNode, grid);
    }
}

function sortNodes(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.dist - nodeB.dist);
}

function updateNeighbors(node, grid) {
    const neighbors = getNeighbors(node, grid)
    for (const neighbor of neighbors) {
        neighbor.dist = node.dist + 1;
    }
}

function getNeighbors (node, grid) {
    const neighbors = []
    const {col, row} = node

    if (row > 0) neighbors.push(grid[row - 1][col])
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
    if (col > 0) neighbors.push(grid[row][col - 1])
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])

    return neighbors
}