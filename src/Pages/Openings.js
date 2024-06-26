import { Box, Button } from '@mui/material';
import SolidBoard from '../Components/SolidBoard';
import { Chess } from 'chess.js'
import { useState, useRef } from 'react';
import { getRandomElement } from '../utils';


function Openings() {
    const gameRef = useRef(new Chess());
    const [fen, setFen] = useState(gameRef.current.fen());

    const onHumanMove = (source, target) => {
        let move = null;
        console.log(gameRef.current)
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

    const makeMove = (modify) => {
        console.log(modify)
        gameRef.current = modify(...gameRef.current)
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
            <h1>Openings</h1>
            <Box sx={{flexDirection:'row'}}>
                    <SolidBoard 
                        position={fen}
                        onDrop={onHumanMove}
                    />
            </Box>

            <Button
                variant='contained'
                onClick={resetGame}>Reset Board</Button>
            <Button
                variant='contained'
                onClick={undoMove}
            > {'<'}
            </Button>
            <Button
                variant='contained'
            > {'>'}
            </Button>
            <Box>
                {gameRef.current.pgn()}
            </Box>
        </div>
    );
}

export default Openings;