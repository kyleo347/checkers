import React, {
    Component
}
from 'react';

class Square extends Component {
    // constructor(value) {
    //     super();
    //     this.value = value;
    //     this.red = -1;
    //     this.black = 1;
    //     this.redKing = -2;
    //     this.blackKing = 2;
    //     this.invalid = '-';
    //     this.empty = 0;
    // }
    render() {
        return (
            <span>
                {this.props.value}
            </span>
        );
    }
}


class Board extends Component {
    constructor() {
        super();
        this.data = [];
        for (let i = 0; i < 8; i++) {
            let row = [];
            for (let j = 0; j < 8; j++) {
                let key = i.toString().concat(j.toString());
                if ((i + j) % 2 === 0) { //black square
                    row.push(
                        <td key={key}>
                            <Square value={'-'}></Square>
                        </td>
                        );
                    // row.push('-');
                }
                else if (i < 3) { //red piece
                    row.push(
                        <td key={key}>
                            <Square value={-1}></Square>
                        </td>);
                    // row.push(-1);
                }
                else if (i > 4) { //black piece
                    row.push(
                        <td key={key}>
                            <Square value={1}></Square>
                        </td>);
                    // row.push(1);
                }
                else { //empty white Square
                    row.push(
                        <td key={key}>
                            <Square value={0}></Square>
                        </td>);
                    // row.push(0);
                }
            }
            this.data.push(row);
        }
    }
    render() {
        let rows = [];
        let rowString = '';
        for (let i = 0; i < this.data.length; i++) {
            // rowString = '<tr>';
            let row = this.data[i];
            let squareRow = 
            <tr key={i}>
                {row}
            </tr>;
            // for (let j = 0; j < row.length; j++) {
                // rowString += row[j].render();
            // }
            // rowString += '</tr>';
            rows.push(squareRow);
        }
        return (
            <table>
                <tbody>
                    {rows}
                </tbody>
        </table>
        );
    }
}


export {
    Board,
    Square
};
