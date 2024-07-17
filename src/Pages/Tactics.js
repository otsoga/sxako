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
import { Link } from 'react-router-dom';

function Tactics() {
    const gameRef = useRef(new Chess('8/8/8/8/8/8/8/8'));
    const solutionRef = useRef([]);
    const solutionIndexRef = useRef(-1);
    const [fen, setFen] = useState(gameRef.current.fen());
    const [boardOrientation, setBoardOrientation] = useState('white');
    const [modalOpen, setModalOpen] = useState(false);
    const [gameOver, setGameOver] = useState(false);


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
        solutionIndexRef.current++
        setTimeout(checkSolution, 200); // Comment this out for human vs. human

        return true;
    }

    const checkSolution = () => {
        let lastHumanMove = gameRef.current.history().at(-1)
        console.log('human move:', lastHumanMove)
        console.log('solutionIndex:', solutionIndexRef.current)
        console.log('solution:', solutionRef.current[solutionIndexRef.current])
        if (lastHumanMove === solutionRef.current[solutionIndexRef.current]) {
            solutionIndexRef.current++
            let computerResponse = solutionRef.current[solutionIndexRef.current]
            if(computerResponse === '') {
                return
            }
            gameRef.current.move(computerResponse);
            setFen(gameRef.current.fen())
        } else {
            undoPly()
        }
    }

    // const handleEndOfGame = () => {
    //     if (gameRef.current.in_checkmate()) {
    //         console.log(gameRef.current.turn())
    //         let winner = gameRef.current.turn() === 'w' ? 'Black' : 'White'
    //         setGameOver(winner + ' wins by checkmate!')
    //     } else if (gameRef.current.in_stalemate()) {   
    //         setGameOver('Game drawn by stalemate!')
    //     } else if (gameRef.current.in_threefold_repetition()) {
    //         setGameOver('Game drawn by threefold repetition!')
    //     } else if (gameRef.current.insufficient_material()) {
    //         setGameOver('Game drawn by insufficient material!')
    //     } else if (gameRef.current.in_draw()) {
    //         setGameOver('Game drawn by fifty-move rule!')
    //     }

    //     toggleModal()
    // }

    const undoPly = () => {
        let undone = gameRef.current.undo()
        console.log('solutionIndexrefBeforeUndo:', solutionIndexRef.current)
        if (undone) {
            solutionRef.current[solutionIndexRef.current] === '' ? solutionIndexRef.current -= 2 : solutionIndexRef.current--
            setFen(gameRef.current.fen())
        }
        console.log('solutionIndex:', solutionIndexRef.current)   
        console.log('solution:', solutionRef.current[solutionIndexRef.current])   
    }

    const undoMove = () => {
        if (solutionRef.current[solutionIndexRef.current] !== '') { // if the last move was a computer move, undo twice
            undoPly()
        }

        undoPly()
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
            <Box>
                <Link 
                    to='/'
                    color={'white'}
                    underline={'none'}><h1>Ŝako</h1>
                </Link>
            </Box>
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