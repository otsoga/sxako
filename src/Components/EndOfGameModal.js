import { Button, Box, Dialog } from '@mui/material';

function EndOfGameModal({open, onClose, gameOver}) {

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <Box>
                <h1>{gameOver}</h1>
                <Button
                    variant='contained'
                    onClick={onClose}
                >Close</Button>
            </Box>
        </Dialog>
    );
}

export default EndOfGameModal;