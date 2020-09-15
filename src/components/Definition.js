import React, { Component } from 'react'
import './Definition.css'

export class Definition extends Component {
    render() {
        return (
            <div className="defBox">
                <h1>{this.props.word}</h1>
                <p>{this.props.desc}</p>
            </div>
        )
    }
}

export default Definition
