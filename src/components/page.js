import React, {Component} from 'react';
import ReactDom from 'react-dom';

class Page extends Component {
    constructor () {
        super(...arguments);
    }

    render () {
        return (
            <a onClick={this.props.nextPage}> {this.props.label} </a>
        );
    }
}

export default (Page);
