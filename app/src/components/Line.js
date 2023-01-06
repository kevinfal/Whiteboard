import React, { Component } from 'react';
/**
 * Line component represents a 'pixel' or 'dot' on the canvas. 
 * Is generated whenever the user presses down on the mouse.
 */
class Line extends Component {

    /**
     * 
     * @param {*} props - (int) key, (int) x, (int) y
     */
    constructor(props) {
        super(props);
        //set css template to use for 'block'/<line> 
        this.blockStyle = {
            position: 'absolute',
            left: this.props.x,
            top: this.props.y
        };
        this.state = {coordX: this.props.x,
             coordY: this.props.y,
             block: <div className = 'block' style={this.blockStyle}></div>
        };
    }

    render() { 

        return (
            <div>{this.state.block}</div>
        );
    }
}
 
export default Line;