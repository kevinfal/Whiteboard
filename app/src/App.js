import './App.css';
import './styles.css';
import Canvas from './components/Canvas.js';
import Button from 'react-bootstrap/Button';
import { Component } from 'react';
class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      canvas: <Canvas/>,
      response: ""};
  }

  render() { 
    
    return ( 
      <div>
        <Button variant="primary">Buddon</Button><br></br>
        X-coordinate
        <input type="text" id="X"></input>
        <br></br>
        Y-coordinate
        <input type="text" id="Y"></input>
        {this.state.canvas}
      </div>
  
    );
  }
}
 
export default App;
