import { Box } from '@mui/material';
import Board from '../Components/Board';
import { Chess } from 'chess.js'
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { getRandomElement } from '../utils';
import MoveList from '../Components/MoveList';
import EndOfGameModal from '../Components/EndOfGameModal';
import PuzzleNavigation from '../Components/PuzzleNavigation';
import ContentBox from '../Components/ContentBox';

function Tactics() {
    const gameRef = useRef(new Chess('8/8/8/8/8/8/8/8'));
    const solutionRef = useRef('');
    const [fen, setFen] = useState(gameRef.current.fen());

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/v1/tactics/puzzles')
          .then(response => {
            solutionRef.current = response.data.solution
            gameRef.current = new Chess(response.data.fen);
            setFen(gameRef.current.fen())
          })
          .catch(error => {
            console.error(error);
          });
      }, []);

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
        setTimeout(checkSolution, 200); // Comment this out for human vs. human

        return true;
    }

    const checkSolution = () => {
        console.log('human move:', gameRef.current.history().at(-1))
        console.log('solution:', solutionRef.current)
        let lastHumanMove = gameRef.current.history().at(-1)
        if (lastHumanMove === solutionRef.current[0]) {
            solutionRef.current = solutionRef.current.slice(1, solutionRef.current.length - 1)
            console.log('comp will move', solutionRef.current[0])
            gameRef.current.move(solutionRef.current[0]);
            solutionRef.current = solutionRef.current.slice(1, solutionRef.current.length - 1)
            setFen(gameRef.current.fen())
        } else {
            undoMove()
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
            <h1>Tactics</h1>
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Box id='boardView' sx={{width: '560px'}} >
                    <Box sx={{marginBottom: '1rem'}}>
                        <Board 
                            position={fen}
                            onDrop={onHumanMove}
                            boardOrientation={boardOrientation}
                        />
                    </Box>
                    <PuzzleNavigation 
                        onUndoMove={undoMove}
                        onResetGame={resetGame}
                        onFlipBoard={flipBoard}
                        onCopyFen={copyFen}
                        onToggleModal={toggleModal}
                    />
                </Box>
                <MoveList movesString={gameRef.current.pgn()} />
                <ContentBox
                    text={''}
                    title={'Tactics'}
                />

    
            </Box>

        </div>
    );
}

export default Tactics;