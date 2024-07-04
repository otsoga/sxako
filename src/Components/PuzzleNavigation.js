import { Box } from '@mui/material';
import GameNavigationButton from './GameNavigationButton';

function PuzzleNavigation({onUndoMove, onResetGame, onFlipBoard, onCopyFen, onToggleModal}) {

    return (
        <Box>
            <GameNavigationButton
                text={'<'}
                onClick={onUndoMove}>
            </GameNavigationButton>
            <GameNavigationButton
                text={'>'}
                onClick={onUndoMove}>
            </GameNavigationButton>
            {/* <GameNavigationButton
                text={'New Game'}
                onClick={onResetGame}>
            </GameNavigationButton> */}
            <GameNavigationButton
                text={'Flip Board'}
                onClick={onFlipBoard}>
            </GameNavigationButton>
            <GameNavigationButton
                text={'Copy FEN'}
                onClick={onCopyFen}>
            </GameNavigationButton>
            {/* <GameNavigationButton
                text={'Download PGN'}
                onClick={onDownloadPgn}>
            </GameNavigationButton> */}
            <GameNavigationButton
                text={'Toggle Modal'}
                onClick={onToggleModal}>
            </GameNavigationButton>
        </Box>
    );
}

export default PuzzleNavigation;