import React from 'react';
import Inp from './Inp';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectValue: 1 }
        this.handler = this.handler.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }
    handler(value, id, name) {
        this.props.handler(value, id, name);
    }
    handleSelectChange(event) {
        this.setState({selectValue: event.target.value})
    }
    render() {
        return(
            <div className="expForm">
                <select value={this.state.selectValue} onChange={this.handleSelectChange} name="numberOfExp">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>

                {
                    Object.keys(this.props.data).map((key) => {                        
                        if (+(key) <= +(this.state["selectValue"])) {
                            // console.log(key);
                            return (
                                <Inp handler={this.handler} id={key} key={key}/>
                            )
                        }
                    })
                }
                {/* <Inp data={this.props.data[`value${this.id}`]} handler={this.handler} id="1"/> */}
                {/* <Inp data={this.props.data[`value${this.id}`]} handler={this.handler} id="2"/> */}
            </div>
        );
    }
}

export default Form;