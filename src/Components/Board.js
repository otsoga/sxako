import '../App.css';
import { Chessboard } from 'react-chessboard'

function Board({position, onDrop, boardOrientation = 'white'}) {

    return (
        <Chessboard
            position={position}
            onPieceDrop={onDrop}
            boardOrientation={boardOrientation}
        />
    );
}

export default Board;