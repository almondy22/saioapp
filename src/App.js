import React from 'react';
import Form from './components/Form';
import LineGraph from './components/Diagram';
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
    }
    const isFilled = false;
    this.inpHandler = this.inpHandler.bind(this);
  }
  
inpHandler(data, id, name) {
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

  let k1 = this.state[`${id}`].k1;
  let k2 = this.state[`${id}`].k2;
  let value = this.state[`${id}`].value;
  console.log(k1,k2,value);

}

  render() {
    return (
      <div className="App">
        <Form handler={this.inpHandler} data={this.state}/>
        <LineGraph data={this.state}/>
      </div>
    );
  }
}

export default App;
