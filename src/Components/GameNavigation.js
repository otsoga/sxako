import { Box, Button } from '@mui/material';

function GameNavigation({onUndoMove, onResetGame, onFlipBoard}) {

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
                onClick={onFlipBoard}>Flip Board
            </Button>
        </Box>
    );
}

export default GameNavigation;