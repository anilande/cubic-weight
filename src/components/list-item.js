import React, {Component} from 'react';
import ReactDom from 'react-dom';

class ListItem extends Component {
    constructor () {
        super(...arguments);
    }

    cubicWeight(size) {
        const conversion_factor = 250;

        return ((size.width/100) * (size.length/100) * (size.height/100) * conversion_factor).toFixed(2);
    }

    render () {
        const
            item = this.props.item,
            cubicWeight = this.cubicWeight(item.size);

        return (
            <li className="list-item">
                <div>{item.title}</div>
                <table>
                    <tbody>
                        <tr><td>Weight:</td><td>{item.weight}g</td></tr>
                        <tr><td>Category:</td><td>{item.category}</td></tr>
                        <tr><td>Size:</td><td>{(item.size.width + "cm X " + item.size.length + "cm X " + item.size.height + "cm")}</td></tr>
                        <tr><td>Cubic Weight:</td><td>{cubicWeight} kg</td></tr>
                    </tbody>
                </table>
            </li>
        );
    }
}

export default (ListItem);
