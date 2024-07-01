import '../App.css';
import { Chessboard } from 'react-chessboard'

function Board({position, onDrop}) {

    return (
        <Chessboard
            position={position}
            onPieceDrop={onDrop}
        />
    );
}

export default Board;