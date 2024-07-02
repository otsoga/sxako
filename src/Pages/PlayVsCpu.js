import { Box } from '@mui/material';
import Board from '../Components/Board';
import { Chess } from 'chess.js'
import { useState, useRef } from 'react';
import { getRandomElement } from '../utils';
import MoveList from '../Components/MoveList';
import GameNavigation from '../Components/GameNavigation';

function PlayVsCpu() {
    const gameRef = useRef(new Chess());
    const [fen, setFen] = useState(gameRef.current.fen());
    const [boardOrientation, setBoardOrientation] = useState('white');

    const onHumanMove = (source, target) => {
        let move = null;
        move = gameRef.current.move({
            from: source,
            to: target,
            promotion: getRandomElement(['q', 'r', 'b', 'n'])
        })

        if (move == null) {
            return false
        }

        setFen(gameRef.current.fen())
        setTimeout(makeRandomMove, 200);
        
        return true;
    }

    const makeRandomMove = () =>{
        const possibleMoves = gameRef.current.moves();

        if (gameRef.current.game_over() || gameRef.current.in_draw() || possibleMoves.length === 0) {
            return;
        }

        gameRef.current.move(getRandomElement(possibleMoves));
        setFen(gameRef.current.fen())
    }

    const undoMove = () => {
        gameRef.current.undo()
        setFen(gameRef.current.fen())
    }

    const resetGame = () => {
        gameRef.current.reset();
        setFen(gameRef.current.fen())
    };

    const flipBoard = () => {
        boardOrientation === 'white' ? setBoardOrientation('black') : setBoardOrientation('white')
    }

    return (
        <div className='app'>
            <h1>Play vs. CPU</h1>
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Box id='boardView' sx={{minWidth: '560px', width:'50%'}} >
                    <Box sx={{marginBottom: '1rem'}}>
                        <Board 
                            position={fen}
                            onDrop={onHumanMove}
                            boardOrientation={boardOrientation}
                        />
                    </Box>
                    <GameNavigation 
                        onUndoMove={undoMove}
                        onResetGame={resetGame}
                        onFlipBoard={flipBoard}
                    />
                </Box>
                <MoveList movesString={gameRef.current.pgn()} />
            </Box>

        </div>
    );
}

export default PlayVsCpu;