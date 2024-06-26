import '../App.css';
import { Chessboard } from 'react-chessboard'

function SolidBoard({position, onDrop}) {

    return (
        <Chessboard
            position={position}
            onPieceDrop={onDrop}
        />
    );
}

export default SolidBoard;