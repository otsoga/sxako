import { Box } from '@mui/material';
import Board from '../Components/Board';
import { Chess } from 'chess.js'
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { getRandomElement } from '../utils';
import MoveList from '../Components/MoveList';
import PawnPromotionModal from '../Components/PawnPromotionModal';
import PuzzleNavigation from '../Components/PuzzleNavigation';
import ContentBox from '../Components/ContentBox';
import { Link } from 'react-router-dom';
import moveSound from '../assets/move.wav';

function TacticsTrainer() {
    const gameRef = useRef(new Chess('8/8/8/8/8/8/8/8'));
    const solutionRef = useRef([]);
    const solutionIndexRef = useRef(-1);
    const nextPuzzleIdRef = useRef(0);
    const [pawnPromotionModalOpen, setPawnPromotionModalOpen] = useState(false);
    const [text, setText] = useState('');
    const [fen, setFen] = useState(gameRef.current.fen());
    const [boardOrientation, setBoardOrientation] = useState('white');
    const [fetchNextPuzzle, setFetchNextPuzzle] = useState(false);
    const setFenToCurrent = () => setFen(gameRef.current.fen())
    const setNewPuzzle = () => {
        setBoardOrientation(getCurrentTurn())
        setFenToCurrent()
        setText('')
    }
    const sound = new Audio(moveSound);

    const playMoveSound = () => {
        sound.play()
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/v1/tactics/puzzles', {
            params: {
              id: nextPuzzleIdRef.current
            }
        })
          .then(response => {
            solutionRef.current = response.data.solution
            solutionIndexRef.current = -1
            gameRef.current = new Chess(response.data.fen);
            nextPuzzleIdRef.current = response.data.next
            setNewPuzzle()
            setFetchNextPuzzle(false)
          })
          .catch(error => {
            console.error(error);
          });
      }, [fetchNextPuzzle]);

      useEffect(() => {
        }, [])

    const getCurrentTurn = () => gameRef.current.turn() === 'w' ? 'white' : 'black'

    const onHumanMove = (source, target) => {
        playMoveSound()
        let move = null;
        move = gameRef.current.move({
            from: source,
            to: target,
            promotion: getRandomElement(['q', 'r', 'b', 'n'])
        })

        if (move == null) {
            return false
        }

        setFenToCurrent()
        solutionIndexRef.current++
        setTimeout(checkSolution, 200); // Comment this out for human vs. human

        return true;
    }

    const checkSolution = () => {
        let lastHumanMove = gameRef.current.history().at(-1)
        if (lastHumanMove === solutionRef.current[solutionIndexRef.current]) {
            solutionIndexRef.current++
            let computerResponse = solutionRef.current[solutionIndexRef.current]
            if (computerResponse === '') {
                    setText('Correct! You solved the puzzle!')
                return
            }
            gameRef.current.move(computerResponse);
            setText('Correct! Find the next move.')

            setFenToCurrent()
        } else {
            undoPly()
            const elipsis = getCurrentTurn === 'black' ? '...' : '...'
            setText(elipsis + lastHumanMove + ' is ncorrect! Try again!')
        }
    }

    const getNextPuzzle = () => {
        if (nextPuzzleIdRef.current === -1) {
            setText('All puzzles completed!')
            return
        }

        setFetchNextPuzzle(true)
    }
    const undoPly = () => {
        let undone = gameRef.current.undo()
        if (undone) {
            solutionRef.current[solutionIndexRef.current] === '' ? solutionIndexRef.current -= 2 : solutionIndexRef.current--
            setFenToCurrent()
        }
    }

    const undoMove = () => {
        if (solutionRef.current[solutionIndexRef.current] !== '') { // if the last move was a computer move, undo twice
            undoPly()
            setTimeout(undoPly, 500)
            return
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
        setPawnPromotionModalOpen(!pawnPromotionModalOpen)
    }

    return (
        <div className='app'>
            <PawnPromotionModal
                open={pawnPromotionModalOpen}
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
                        onNextPuzzle={getNextPuzzle}
                    />
                </Box>
                <MoveList movesString={gameRef.current.pgn()} />
                <ContentBox
                    text={text}
                    title={'Tactics'}
                />
            </Box>

        </div>
    );
}

export default TacticsTrainer;