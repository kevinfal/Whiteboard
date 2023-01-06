import React, { Component } from 'react';
class Line extends Component {

    constructor(props) {
        super(props);
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
    // create_block(x,y){
    //     var this.out = <div class = 'block'></div>;
    //     this.out.style.position = "absolute";
    //     this.out.style.left = x;
    //     this.out.style.top = y;
    //     return this.out;
    // }
    render() { 

        return (
            <div>{this.state.block}</div>
        );
    }
}
 
export default Line;