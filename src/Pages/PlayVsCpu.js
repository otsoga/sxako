import { Box, Button } from '@mui/material';
import SolidBoard from '../Components/SolidBoard';
import { Chess } from 'chess.js'
import { useState, useRef } from 'react';
import { getRandomElement } from '../utils';


function PlayVsCpu() {
    const gameRef = useRef(new Chess());
    const [fen, setFen] = useState(gameRef.current.fen());

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

        // make the computer move
        setTimeout(makeRandomMove, 200);
        return true;
    }

    const undoMove = () => {
        gameRef.current.undo()
        setFen(gameRef.current.fen())
    }

    const resetGame = () => {
        gameRef.current.reset();
        setFen(gameRef.current.fen())
    };

    const makeRandomMove = () =>{
        const possibleMoves = gameRef.current.moves();
        console.log('possibleMoves', possibleMoves)

        if (gameRef.current.game_over() || gameRef.current.in_draw() || possibleMoves.length === 0) {
            return;
        }

        gameRef.current.move(getRandomElement(possibleMoves));
        setFen(gameRef.current.fen())
    }

    return (
        <div className='app'>
            <h1>Play vs. CPU</h1>
            <Box sx={{marginBottom: '1rem'}}>
                <SolidBoard 
                    position={fen}
                    onDrop={onHumanMove}
                />
            </Box>
            <Box sx={{marginBottom: '1rem'}}>
                <Button
                    variant='contained'
                    sx={{marginRight: '1rem'}}
                    onClick={undoMove}
                > {'<'}
                </Button>
                <Button
                    variant='contained'
                    onClick={resetGame}>New Game
                </Button>
            </Box>
            <Box>
                {gameRef.current.pgn()}
            </Box>
        </div>
    );
}

export default PlayVsCpu;