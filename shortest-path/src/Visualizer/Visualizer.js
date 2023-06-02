import React, {Component} from 'react';
import Node from './Node/Node';
import './Visualizer.css';
import {dijkstra, getNodesInShortestPath} from '../Algorithms/dijkstra';

const START_NODE_ROW = 8;
const START_NODE_COL = 15;
const END_NODE_ROW = 12;
const END_NODE_COL = 35;

export default class Visualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
        };
    }

    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({grid});
    }

    animateDijkstra(visitedNodes, nodesInShortestPath) {
        for (let i = 0; i < visitedNodes.length; i++) {
            setTimeout(() => {
                const node = visitedNodes[i];
                const newGrid = this.state.grid.slice();
                const newNode = {
                    ...node, 
                    animate: true,
                };
                newGrid[node.row][node.col] = newNode;
                this.setState({grid: newGrid});
            }, 30 * i);
        }

        setTimeout(() => {
            this.animateShortestPath(nodesInShortestPath);
        }, 30 * visitedNodes.length);   
    }

    animateShortestPath(nodesInShortestPath) {
        for (let i = 0; i < nodesInShortestPath.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPath[i];
                const newGrid = this.state.grid.slice();
                const newNode = {
                    ...node,
                    shortestPath: true,
                };
                newGrid[node.row][node.col] = newNode;
                this.setState({grid: newGrid});
            }, 30 * i);
    }
}

    visualizeDijkstra() {
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const endNode = grid[END_NODE_ROW][END_NODE_COL];
        const visitedNodes = dijkstra(grid, startNode, endNode);
        const nodesInShortestPath = getNodesInShortestPath(startNode, endNode);
        console.log(nodesInShortestPath)
        this.animateDijkstra(visitedNodes, nodesInShortestPath);
    }

    render() {
        const {grid, mousIsPressed} = this.state;

        return (
            <>
                <button className='animate-button' onClick={() => this.visualizeDijkstra()}>
                    Visualize Dijkstra
                </button>
    
                <div className='grid'>
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const {isEnd, isStart, animate, shortestPath} = node;
                                    return (
                                        //rendering node
                                        <Node
                                            key = {nodeIdx}
                                            isStart = {isStart}
                                            isEnd = {isEnd}
                                            visited = {animate}
                                            shortestPath = {shortestPath}></Node>
                                    );
                                })}
                        </div>
                        );
                    })}
                </div>
            </>
        );
    }
}


const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
        const currRow = [];
        for (let col = 0; col < 50; col++) {
            currRow.push(createNode(col, row));
        }
        grid.push(currRow);
    }
    return grid;
};

const createNode = (col, row) => {
    return {
        col, 
        row, 
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isEnd: row === END_NODE_ROW && col === END_NODE_COL,
        dist: Infinity,
        visited: false,
        isWall: false,
        prevNode: null,
        animate: false,
        shortestPath: false,
    };
};

