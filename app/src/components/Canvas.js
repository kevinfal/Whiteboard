import React, { Component } from 'react';
import Line from './Line.js';
class Canvas extends Component {
    constructor(props) {
        super(props);
        //bind functions
        this.board = <div></div>
        this.draw = this.draw.bind(this);
        this.up = this.up.bind(this);
        this.move = this.move.bind(this);
        this.down = this.down.bind(this);
        this.connect = this.connect.bind(this);
        this.save = this.save.bind(this);
        this.formatCoords = this.formatCoords.bind(this);


        //set state and variables
        this.mouseDown = false;
        this.nextKey = 1;
        this.state = {lines: [], 
            lineX: [],
            lineY: [],
            respone: ""};
    }
    //Format the X Y Coords of each line into JSON to send to API
    formatCoords(){
        var coords = {};
        for(var i = 0; i < this.nextKey; i++){
            if(this.state.lineX[i] == null)
                break;
            coords[i] = [this.state.lineX[i], this.state.lineY[i]];
        }
        return coords;
    }
    //Connects to api, simple server connection test
    connect(){
        fetch('http://localhost:8080')
          .then(res => res.text())
          .then(res => this.setState({response: res}));
    }
    //Saves the current canvas into a file on the server
    save(){
        var coords = this.formatCoords();
        console.log(coords);
        console.log(JSON.stringify({coords: coords,}));
        fetch('http://localhost:8080/save', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            }, 
            body: JSON.stringify({coords: coords,})
        })
        .then(res => res.text())
        .then(res => this.setState({response: res}));
    }
    /**
     * 
     * @param {event} event - a mouse up/down/move event that triggers function to call this one
     * Places the line visually on the screen/canvas
     */
    draw(event){
        //get coords of the event
        var coordX=event.clientX;
        var coordY=event.clientY;
        //this block is for debug
        document.getElementById("X").value=coordX;
        document.getElementById("Y").value=coordY;
        //Update state, lists of lines and line coordinates to use for rendering and saving
        //Generate line component and add to state
        this.setState({lines: [...this.state.lines, <Line key = {this.nextKey++}x = {coordX} y = {coordY}/>]});
        this.setState({lineX: [...this.state.lineX, coordX]});
        this.setState({lineY: [...this.state.lineY, coordY]});

        
    }
    /**
     * 
     * @param {onMouseDown} event - mouseDown event to trigger function 
     * Called when mouseDown event occurs on the canvas, sets the mouseDown flag to true and calls draw()
     */
    down(event){
        this.mouseDown = true;
        this.draw(event);
    }
    /**
     * 
     * @param {onMouseMove} event - mouseMove event to trigger function
     * Called when mouseMove event occurs on the canvas, if mouseDown is true then calls draw(), does nothing otherwise
     */
    move(event){
        if(this.mouseDown){
            this.draw(event);
        }
    }
    /**
     * 
     * @param {onMouseUp} event - mouseUp event to trigger function
     * Called when mouseUp event occurs on the canvas, sets mouseDown flag to false so we stop drawing on the canvas. 
     */
    up(event){
        this.mouseDown = false;
    }
    render() { 
        this.board = <div className = 'board' 
            onMouseDown={this.down} 
            onMouseMove={this.move}
            onMouseUp={this.up}>{this.state.lines}</div>;
        //this.board.addEventListener("mousedown",this.down)
        return (
            <div>
                {this.board}
                <button onClick={this.connect}>Connected?</button>
                <button onClick={this.save}>save?</button>
                <p>{this.state.response}</p>
            </div>
            
            
        );
    }
}
 
export default Canvas;