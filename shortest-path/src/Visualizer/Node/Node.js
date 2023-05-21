import React, {Component} from "react";

import './Node.css'

export default class Node extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const {isEnd, isStart, visited} = this.props;
        const extraClassName = isEnd 
            ? 'node-end'
            : isStart
            ? 'node-start'
            : visited
            ? 'node-visited'
            : '';
        return <div className={`node ${extraClassName}`}></div>
    }

}

export const DEFAULT_NODE = {
    row: 0,
    col: 0,
}