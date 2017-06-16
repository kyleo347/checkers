import React, {
    Component
}
from 'react';

import redpiece from "../img/red.jpg";
import blackpiece from "../img/black.jpg";

class Square extends Component {
        static red = -1;
        static black = 1;
        static redKing = -2;
        static blackKing = 2;
        static invalid = '-';
        static empty = 0;
        selectable = false;
    // constructor(value) {
    //     super();
    render() {
        let className = 'Square';
        if (this.props.selectable) className += ' selectable';
        if (this.props.value === Square.invalid){
           className += ' black'; 
        }
        if(this.props.value === Square.red){
            return(<img src={redpiece} className={className}/>)
        }
        if(this.props.value === Square.black){
            return(<img src={blackpiece} className={className}/>)
        }
        return (
            <div className={className}>
            </div>
        );
    }
}


class Board extends Component {
    
    findMoves
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
                            <Square value={Square.invalid}></Square>
                        </td>
                        );
                }
                else if (i < 3) { //red piece
                    row.push(
                        <td key={key}>
                            <Square value={Square.red}></Square>
                        </td>);
                }
                else if (i > 4) { //black piece
                    row.push(
                        <td key={key}>
                            <Square value={Square.black}></Square>
                        </td>);
                }
                else { //empty white Square
                    row.push(
                        <td key={key}>
                            <Square value={Square.empty}></Square>
                        </td>);
                }
            }
            this.data.push(row);
        }
    }
    render() {
        let rows = [];
        for (let i = 0; i < this.data.length; i++) {
            let row = this.data[i];
            let squareRow = 
            <tr key={i}>
                {row}
            </tr>;
            rows.push(squareRow);
        }
        return (
            <table className='Board'>
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
