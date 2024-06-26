import { Box, Button } from '@mui/material';
import SolidBoard from '../Components/SolidBoard';
import { Chess } from 'chess.js'
import { useState } from 'react';
import { getRandomElement } from '../utils';

const game = new Chess();

function Openings() {
    const [game, setGame] = useState(new Chess());
    const [fen, setFen] = useState(game.fen());

    const onHumanMove = (source, target) => {
        let move = null;
        makeMove((game) => {
            move = game.move({
                from: source,
                to: target,
                promotion: getRandomElement(['q', 'r', 'b', 'n'])
            })
        })


        if (move == null) {
            return false
        }

        // make the computer move
        // setTimeout(makeRandomMove, 200);
        return true;
    }

    const makeMove = (modify) => {
        console.log(modify)
        setGame((game) => {
            const update = { ...game };
            modify(update)
            return update;
        })

        setFen(game.fen())
    }

    const undoMove = () => {
        game.undo()
        setFen(game.fen())
    }

    const makeRandomMove = () =>{
        const possibleMoves = game.moves();
        console.log('possibleMoves', possibleMoves)

        if (game.game_over() || game.in_draw() || possibleMoves.length === 0) {
            return;
        }

        makeMove((game) => {
            game.move(getRandomElement(possibleMoves));
        })
    }

    const resetGame = () => {
        game.reset();
        setFen(game.fen())
    };

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
                {game.pgn()}
            </Box>
        </div>
    );
}

export default Openings;