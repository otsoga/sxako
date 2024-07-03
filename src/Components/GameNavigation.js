import { Box, Button } from '@mui/material';

function GameNavigation({onUndoMove, onResetGame, onFlipBoard, onCopyFen, onToggleModal}) {

    return (
        <Box sx={{marginBottom: '1rem'}}>
            <Button
                variant='contained'
                sx={{marginRight: '1rem'}}
                onClick={onUndoMove}
            > {'<'}
            </Button>
            <Button
                variant='contained'
                sx={{marginRight: '1rem'}}
                onClick={onResetGame}>New Game
            </Button>
            <Button
                variant='contained'
                sx={{marginRight: '1rem'}}
                onClick={onFlipBoard}>Flip Board
            </Button>
            <Button
                variant='contained'
                sx={{marginRight: '1rem'}}
                onClick={onCopyFen}>Copy FEN
            </Button>

            <Button
                variant='contained'
                sx={{marginRight: '1rem'}}
                onClick={onToggleModal}>Toggle Modal
            </Button>

        </Box>
    );
}

export default GameNavigation;