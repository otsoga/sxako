import { Button, Box, Dialog } from '@mui/material';

function PawnPromotionModal({open, onClose, gameOver}) {

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <Box>
                <h1>Choose Promotion Piece</h1>
                <Box flexDirection={'column'}>
                    <Box>Q</Box>
                    <Box>R</Box>
                    <Box>B</Box>
                    <Box>N</Box>
                </Box>
            </Box>
        </Dialog>
    );
}

export default PawnPromotionModal;