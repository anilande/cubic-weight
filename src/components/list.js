import React, {Component} from 'react';
import ReactDom from 'react-dom';
import ListItem from './list-item';

class List extends Component {
    constructor () {
        super(...arguments);
        this.state = {
            'itemsList': this.props.itemsList || []
        };
    }

    render () {
        const itemsList = this.props.itemsList;
        return (
            <ul>
                { itemsList.map(function(item, index) {
                   return <ListItem key={index} item={item} />;
                })}
            </ul>
        );
    }
}

export default (List);
