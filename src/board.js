import React, {
    Component
}
from 'react';
import redpiece from "../img/red.jpg";
import blackpiece from "../img/black.jpg";

class Square extends Component {
        static red = -1;
        static black = 1;
        // static redKing = -2;
        // static blackKing = 2;
        static invalid = '-';
        static empty = 0;
    constructor(value) {
        super();
        this.onClick = this.onClick.bind(this);   
    }
    onClick(e){
        this.props.onClick(e,this);
    }
    render() {
        let className = 'Square';
        if (this.props.selectable) className += ' selectable';
        if (this.props.value === Square.invalid) className += ' black'; 
        if(this.props.value === Square.red){
            return(<img src={redpiece} className={className} onClick={this.onClick}/>)
        }
        if(this.props.value === Square.black){
            return(<img src={blackpiece} className={className} onClick={this.onClick}/>)
        }
        return (
            <div className={className} onClick={this.onClick}>
            </div>
        );
    }
}


class Board extends Component {
    
    constructor() {
        super();
        //set methods
        this.selectSquare = this.selectSquare.bind(this);
        this.updateSelectable = this.updateSelectable.bind(this);
        this.updateSelectableDirection = this.updateSelectableDirection.bind(this);
        this.movePiece = this.movePiece.bind(this);
        
        //initialize board
        let boardData = [];
        for (let i = 0; i < 8; i++) {
            let row = [];
            // this.selectable.push([]);
            for (let j = 0; j < 8; j++) {
                // this.selectable[i].push(false);
                let value;
                if ((i + j) % 2 === 0) { //black square
                    value = Square.invalid;
                } else if (i < 3) { //red Piece
                    value = Square.black;
                } else if (i > 4) { //black piece
                    value = Square.red;
                } else { //empty white square
                    value = Square.empty;
                }
                // let key = i.toString().concat(j.toString() + value.toString());
                    row.push( {
                        value:value,
                        selectable:false,
                        king:false
                    }
                            // <Square value={value} onClick={this.selectSquare} row={i} column={j}></Square>
                        );
            }
            boardData.push(row);
        }
        this.state = {
            data : boardData,
            activePiece: undefined ,
            turn : Square.red  //red goes first
        };
        
    }
    
    movePiece(square){
        let oldRow = this.state.activePiece.props.row;
        let oldCol = this.state.activePiece.props.column;
        let newRow = square.props.row;
        let newCol = square.props.column;
        let boardData = this.state.data.slice();

        boardData[newRow][newCol] = { //move piece
            value: boardData[oldRow][oldCol].value,
            selectable: false,
            king: boardData[oldRow][oldCol].king
        }

        boardData[oldRow][oldCol] = { //remove piece  from old spot
            value: Square.empty,
            selectable: false,
            king: false
        }
        if (Math.abs(newCol - oldCol) == 2) { //Means a piece was jumped
            boardData[(oldRow + newRow) / 2][(oldCol + newCol) / 2] = {
                value: Square.empty,
                selectable: false,
                king: false
            }
        }
        this.setState({
            turn: this.state.turn * -1,
            data: boardData
        });

        }
            
    selectSquare(e,square){
        if (this.state.activePiece) {
            if (square.props.selectable) {
                if (this.state.data[square.props.row][square.props.column].selectable) {
                    this.movePiece(square);
                    //= this.state.turn * -1;
                    // return;
                }
            }
            //leave selectable mode
            this.setState((state) => {
                for (let row in state.data) {
                    for (let column in state.data[row]) {
                        state.data[row][column].selectable = false;
                    }
                }
            });
            this.state.activePiece = undefined;
        }
        else {
            if (this.state.turn == square.props.value) {
                this.updateSelectable(square);
            }
        }
        }
    
    updateSelectable(square) {
        this.setState({
            activePiece: square
        }, () => {
            this.updateSelectableDirection(this.state.activePiece.props.value);
            if (this.state.activePiece.props.king) {
                this.updateSelectableDirection(this.state.activePiece.props.value * -1);
            }
        });
    }
    
    updateSelectableDirection(direction) {
        let row = this.state.activePiece.props.row;
        let column = this.state.activePiece.props.column;
        let boardData = this.state.data.slice();
        if (boardData[row + direction]) {
            if (boardData[row + direction][column - 1]) {
                if (boardData[row + direction][column - 1].value == Square.empty) { //Target spot is available
                    boardData[row + direction][column - 1].selectable = true;
                }
                else if (boardData[row + direction][column - 1].value == this.state.activePiece.props.value * -1) { //target spot is populated by opposite color
                    if (boardData[row + direction * 2]) {
                        if (boardData[row + direction * 2][column - 2]) {
                            if (boardData[row + direction * 2][column - 2].value == Square.empty) {
                                boardData[row + direction * 2][column - 2].selectable = true;
                            }
                        }
                    }

                }
            }
            if (boardData[row + direction][column + 1]) {
                if (boardData[row + direction][column + 1].value == Square.empty) {
                    boardData[row + direction][column + 1].selectable = true;
                }
                else if (boardData[row + direction][column + 1].value == this.state.activePiece.props.value * -1) {
                    if (boardData[row + direction * 2]) {
                        if (boardData[row + direction * 2][column + 2]) {
                            if (boardData[row + direction * 2][column + 2].value == Square.empty) {
                                boardData[row + direction * 2][column + 2].selectable = true;
                            }
                        }
                    }

                }
            }
        }
        this.setState({
            data: boardData
        });
        }
    
    render() {
        let rows = [];
        for (let i = 0; i < this.state.data.length; i++) {
            let outputRow = [];
            let row = this.state.data[i];
            for (let j = 0; j < row.length; j++) {
                let square = row[j];
                let key = i.toString().concat(j.toString() + square.value.toString());
                outputRow.push(
                    <td key={key}>
                        <Square value={square.value} king={square.king} selectable={square.selectable}
                        row={i} column={j} onClick={this.selectSquare}></Square>
                    </td>
                    );
            }
            let squareRow = 
            <tr key={i}>
                {outputRow}
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
