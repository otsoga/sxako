import { Box, Button } from '@mui/material';

function GameNavigation({onUndoMove, onResetGame, onFlipBoard, onCopyFen}) {

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

        </Box>
    );
}

export default GameNavigation;