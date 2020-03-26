import React from 'react';
import '../App.css'

class Inp extends React.Component {
    constructor(props) {
        super(props);
        this.k1Handler = this.k1Handler.bind(this);
        this.k2Handler = this.k2Handler.bind(this);
        this.valueHandler = this.valueHandler.bind(this);
        this.handleSelectSign = this.handleSelectSign.bind(this);
    }

    k1Handler(event) {
        const id = event.target.id;
        const name = event.target.name;
        this.props.handler(event.target.value, id, name);
    }
    k2Handler(event) {
        const id = event.target.id;
        const name = event.target.name;
        this.props.handler(event.target.value, id, name);
    }
    valueHandler(event) {
        const id = event.target.id;
        const name = event.target.name;
        this.props.handler(event.target.value, id, name);
    }
    handleSelectSign(event) {
        const id = event.target.id;
        const name = event.target.name;
        this.props.handler(event.target.value, id, name);
    }

    render() {
        return(
            <div className="expInput">
                <input type="number" id={this.props.id} name="k1" value={this.props.data} onChange={this.k1Handler} required/>
                <span> X1 +</span>
                <input type="number" id={this.props.id} name="k2" value={this.props.data} onChange={this.k2Handler} required/>
                <span> X2 </span>
                <select name="lessMore" id={this.props.id} onChange={this.handleSelectSign} value={this.props.data}>
                    <option value="<=">&lt;=</option>
                    <option value=">=">&gt;=</option>
                    <option value="=">=</option>
                </select>
                <input type="number" id={this.props.id} name="value" value={this.props.data} onChange={this.valueHandler} required/>
            </div>
        )
    }
}

export default Inp;