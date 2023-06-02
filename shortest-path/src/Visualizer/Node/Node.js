import React, {Component} from "react";

import './Node.css'

export default class Node extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const {isEnd, isStart, visited, shortestPath} = this.props;
        const extraClassName = isEnd 
            ? 'node-end'
            : isStart
            ? 'node-start'
            : visited
            ? 'node-visited'
            : shortestPath
            ? 'node-shortest'
            : '';
        return <div className={`node ${extraClassName}`}></div>
    }

}

