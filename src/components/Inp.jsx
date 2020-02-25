import React from 'react';

class Inp extends React.Component {
    constructor(props) {
        super(props);
        this.k1Handler = this.k1Handler.bind(this);
        this.k2Handler = this.k2Handler.bind(this);
        this.valueHandler = this.valueHandler.bind(this);
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

    render() {
        return(
            <div className="expInput">
                <input type="number" id={this.props.id} name="k1" value={this.props.data} onChange={this.k1Handler}/>
                <span> X1 +</span>
                <input type="number" id={this.props.id} name="k2" value={this.props.data} onChange={this.k2Handler}/>
                <span> X2 =</span>
                <input type="number" id={this.props.id} name="value" value={this.props.data} onChange={this.valueHandler}/>
            </div>
        )
    }
}

export default Inp;