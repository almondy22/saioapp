import React from 'react';
import Form from './components/Form';
import LineGraph from './components/Diagram';
import Graph, { Line } from 'react-chartjs-2';
import { dataHandler } from './logic/dataHandler';
import { fieldDetect } from './logic/fieldDetect'
// import graphData from './graphData'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
        1: { k1: "", k2: "", value: "" },
        2: { k1: "", k2: "", value: "" },
        3: { k1: "", k2: "", value: "" },
        4: { k1: "", k2: "", value: "" },
        5: { k1: "", k2: "", value: "" },
        6: { k1: "", k2: "", value: "" },
        7: { k1: "", k2: "", value: "" },
        8: { k1: "", k2: "", value: "" },
        9: { k1: "", k2: "", value: "" },
        10: { k1: "", k2: "", value: "" },
        isClicked: false
    };
    // this.isClicked = false;
    this.data = {};   
    this.stateUpdate = this.stateUpdate.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

stateUpdate = (data, id, name) => {
  if (name === "k1") {
    this.setState(
      {[`${id}`]:{ k1 : data, k2 : this.state[`${id}`].k2, value : this.state[`${id}`].value }}
      );
  } else if (name === "k2") {
    this.setState(
      {[`${id}`]:{ k1 : this.state[`${id}`].k1, k2 : data, value : this.state[`${id}`].value }}
      );
  } else if (name === "value") {
    this.setState(
      {[`${id}`]:{ k1 : this.state[`${id}`].k1, k2 : this.state[`${id}`].k2, value : data }}
      );
  }
}

submitHandler(isClicked) {
    this.data = dataHandler(this.state);
    this.setState({isClicked: true});
    console.log(this.data);    
    fieldDetect(this.state);
}

  render() {
    let graph;
    this.data = dataHandler(this.state);  
    if (this.state.isClicked) graph = <LineGraph data={this.data}/>
    else graph = null;

    return (
      <div className="App">
        <Form handler={this.stateUpdate} data={this.state} submitHandler={this.submitHandler}/> 
        {graph}
      </div>
    );
  }
}

export default App;
