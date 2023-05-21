// const node = {
//     row, 
//     col,
//     visited,
//     dist,
// };

//Dijkstra's algorithm return the order in which we found the shortesth path
export function dijkstra(grid, startNode, endNode) {
    const visitedNodes = [];

    if (!startNode || !endNode || startNode === endNode) {
        return false;
    }

    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);

    while (!!unvisitedNodes.length) {
        sortNodes(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();

        closestNode.visited = true;
        visitedNodes.push(closestNode);
        if (closestNode === endNode) return visitedNodes;
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

    return neighbors.filter(neighbor => !neighbor.visited);
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}