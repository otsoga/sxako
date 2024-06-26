import '../App.css';
import { useState } from 'react';
import { Chessboard } from 'react-chessboard'

function SolidBoard({position, onDrop}) {

    return (
        <div className="board">
            <Chessboard
                position={position.fen()}
                onPieceDrop={onDrop}
            />
            <div>Game Started</div>
        </div>
    );
}

export default SolidBoard;