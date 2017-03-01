import React, {Component} from 'react';
import ReactDom from 'react-dom';

class Filter extends Component {
    constructor () {
        super(...arguments);
        this.handelChange = this.handelChange.bind(this);
    }

    handelChange(e) {
    	this.props.onChange(e.target.value);
    }

    render () {
        return (
            <select onChange={this.handelChange}>
            	{ this.props.options.map(function(item, index) {
                   return <option key={index}>{item}</option>;
                })}
            </select>
        );
    }
}

export default (Filter);
