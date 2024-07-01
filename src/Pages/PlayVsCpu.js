import { Box, Button } from '@mui/material';
import Board from '../Components/Board';
import { Chess } from 'chess.js'
import { useState, useRef } from 'react';
import { getRandomElement } from '../utils';
import MoveList from '../Components/MoveList';


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

        if (gameRef.current.game_over() || gameRef.current.in_draw() || possibleMoves.length === 0) {
            return;
        }

        gameRef.current.move(getRandomElement(possibleMoves));
        setFen(gameRef.current.fen())
    }

    // const convertPgnMovesToArray = (pgnMoves) => {
    //     const moves = pgnMoves.split(' ').reverse();
    //     let movesArray = [];
    //     console.log('moves', moves);
    //     console.log('moves before popping', moves.slice().reverse());
    //     while (moves[0] !== '') {
    //             // console.log('in while loop')
    //     let moveLine = []
    //         moveLine.push(moves.pop());
    //         moveLine.push(moves.pop());
    //         moveLine.push(moves.pop());
    //     }
    // }

    return (
        <div className='app'>
            <h1>Play vs. CPU</h1>
            <Box style={{ display: 'flex', gap: '1rem' }}>
                <Box id='boardView' sx={{width:'50%'}} >
                    <Box sx={{marginBottom: '1rem'}}>
                        <Board 
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
                </Box>
                <Box>
                    {gameRef.current.pgn()}
                </Box>
                {/* <MoveList movesString={convertPgnMovesToArray(gameRef.current.fen())} /> */}
                <MoveList movesString={gameRef.current.pgn()} />
            </Box>

        </div>
    );
}

export default PlayVsCpu;