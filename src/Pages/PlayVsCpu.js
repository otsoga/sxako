import { Box } from '@mui/material';
import Board from '../Components/Board';
import { Chess } from 'chess.js'
import { useState, useRef } from 'react';
import { getRandomElement } from '../utils';
import MoveList from '../Components/MoveList';
import GameNavigation from '../Components/GameNavigation';
import EndOfGameModal from '../Components/EndOfGameModal';

function PlayVsCpu() {
    const gameRef = useRef(new Chess());
    // const gameRef = useRef(new Chess('7k/8/8/8/5Q2/4P3/PPPP1PPP/RNB1KBNR w KQ - 5 4')); // For testing checkmate
    // const gameRef = useRef(new Chess('7k/8/8/8/5Q2/4P3/PPPP1PPP/RNB1KBNR w KQ - 5 4')); // For testing stalemate
    // const gameRef = useRef(new Chess('7k/8/8/8/8/8/8/4KBN1 w KQ - 5 4')); // For testing insufficient material


    const [fen, setFen] = useState(gameRef.current.fen());
    const [boardOrientation, setBoardOrientation] = useState('white');
    const [modalOpen, setModalOpen] = useState(false);
    const [gameOver, setGameOver] = useState(false);

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
        setTimeout(makeRandomMove, 200); // Comment this out for human vs. human
        
        if (gameRef.current.game_over()) {
            handleEndOfGame()
            return;
        }

        return true;
    }

    const makeRandomMove = () =>{
        const possibleMoves = gameRef.current.moves();
        gameRef.current.move(getRandomElement(possibleMoves));
        setFen(gameRef.current.fen())

        if (gameRef.current.game_over()) {
            handleEndOfGame()
            return;
        }
    }

    const handleEndOfGame = () => {
        if (gameRef.current.in_checkmate()) {
            console.log(gameRef.current.turn())
            let winner = gameRef.current.turn() === 'w' ? 'Black' : 'White'
            setGameOver(winner + ' wins by checkmate!')
        } else if (gameRef.current.in_stalemate()) {   
            setGameOver('Game drawn by stalemate!')
        } else if (gameRef.current.in_threefold_repetition()) {
            setGameOver('Game drawn by threefold repetition!')
        } else if (gameRef.current.insufficient_material()) {
            setGameOver('Game drawn by insufficient material!')
        } else if (gameRef.current.in_draw()) {
            setGameOver('Game drawn by fifty-move rule!')
        }

        toggleModal()
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

    const copyFen = () => {
        navigator.clipboard.writeText(gameRef.current.fen())
    }

    const toggleModal = () => {
        console.log('trying to toggle modal')
        setModalOpen(!modalOpen)
    }

    return (
        <div className='app'>
            <EndOfGameModal
                open={modalOpen}
                gameOver={gameOver}
                onClose={toggleModal} 
            />
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
                        onCopyFen={copyFen}
                        onToggleModal={toggleModal}
                    />
                </Box>
                <MoveList movesString={gameRef.current.pgn()} />
            </Box>

        </div>
    );
}

export default PlayVsCpu;