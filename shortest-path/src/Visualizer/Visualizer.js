import React, {Component} from 'react';
import Node from './Node/Node';
import './Visualizer.css';

export default class Visualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: []
        };
    }

    componentDidMount() {
        // creating grid of 20 by 50 and setting start and end node
        const nodes = []
        for (let row = 0; row < 20; row++) {
            const currentRow = [];
            for (let col = 0; col < 50; col++) {
                const currentNode = {
                    col, 
                    row, 
                    isStart: row === 10 && col === 5,
                    isEnd: row === 10 && col === 45,
                };
                currentRow.push(currentNode);
            }
            nodes.push(currentRow);
        }
        this.setState({nodes})
    }

    render() {
        const {nodes}  = this.state;
        console.log(nodes)

        return (
            <div className='grid'>
                {nodes.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx}>
                            {row.map((node, nodeIdx) => {
                                const {isStart, isEnd} = node;
                                return (
                                    //rendering node
                                    <Node
                                        key = {nodeIdx}
                                        isStart = {isStart}
                                        isEnd = {isEnd}
                                        test={'foo'}></Node>
                                );
                            })}
                    </div>
                    );
                })}
            </div>
        );
    }
}
