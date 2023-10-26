import React from 'react';
import Form from './components/Form';
import LineGraph from './components/Diagram';
import { dataHandler } from './logic/dataHandler';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
        1: { k1: "0", k2: "0", value: "0", sign: "<=" },
        2: { k1: "0", k2: "0", value: "0", sign: "<=" },
        3: { k1: "0", k2: "0", value: "0", sign: "<=" },
        4: { k1: "0", k2: "0", value: "0", sign: "<=" },
        5: { k1: "0", k2: "0", value: "0", sign: "<=" },
        6: { k1: "0", k2: "0", value: "0", sign: "<=" },
        7: { k1: "0", k2: "0", value: "0", sign: "<=" },
        8: { k1: "0", k2: "0", value: "0", sign: "<=" },
        9: { k1: "0", k2: "0", value: "0", sign: "<=" },
        10: { k1: "0", k2: "0", value: "0", sign: "<=" },
        isClicked: false,
        selectValue: 1
    };
    this.data = {};   
    this.stateUpdate = this.stateUpdate.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.selectHandler = this.selectHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
  }
// test commit 1
  // test commit 3
  //test 4
stateUpdate = (data, id, name) => {
  if (name === "k1") {
    this.setState(
      {[`${id}`]:{ k1 : data, k2 : this.state[`${id}`].k2, value : this.state[`${id}`].value, sign : this.state[`${id}`].sign }}
      );
  } else if (name === "k2") {
    this.setState(
      {[`${id}`]:{ k1 : this.state[`${id}`].k1, k2 : data, value : this.state[`${id}`].value, sign : this.state[`${id}`].sign }}
      );
  } else if (name === "value") {
    this.setState(
      {[`${id}`]:{ k1 : this.state[`${id}`].k1, k2 : this.state[`${id}`].k2, value : data, sign : this.state[`${id}`].sign }}
      );
  } else if (name === "lessMore") {
    this.setState(
      {[`${id}`]:{ k1 : this.state[`${id}`].k1, k2 : this.state[`${id}`].k2, value : this.state[`${id}`].value, sign : data }}
      );
  }
}

submitHandler() {
    this.data = dataHandler(this.state);
    this.setState({isClicked: true});   
}
selectHandler(selectValue) {
  this.setState({"selectValue": selectValue});
}
deleteHandler(id) {
  this.setState({[`${id}`]:{ k1 : "", k2 : "", value : "" }});
}

  render() {
    let graph;
    this.data = dataHandler(this.state);  
    if (this.state.isClicked) graph = <LineGraph data={this.data} state={this.state} deleteHandler={this.deleteHandler}/>
    else graph = null;

    return (
      <div className="App">
        <Form 
          handler={this.stateUpdate} 
          data={this.state} 
          submitHandler={this.submitHandler}
          selectHandler={this.selectHandler}
        /> 
        {graph}
      </div>
    );
  }
}

export default App;
