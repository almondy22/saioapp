import React from 'react';
import Inp from './Inp';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectValue: 1 };

        this.isClicked = false;
        this.handler = this.handler.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        
        this.submitHandler = this.submitHandler.bind(this);
    }
    handler(value, id, name) {
        this.props.handler(value, id, name);
    }
    handleSelectChange(event) {
        this.setState({selectValue: event.target.value})
    }
    submitHandler(event) {
        event.preventDefault();
        this.isClicked = true;
        this.props.submitHandler(this.isClicked);
    }
    render() {
        return(
            <form action="#" className="expForm">
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
                            return (
                                <Inp handler={this.handler} id={+(key)} key={+(key)}/>
                            )
                        }
                    })
                }
                <input type="submit" value="Отправить" onClick={this.submitHandler}/>
            </form>
        );
    }
}

export default Form;