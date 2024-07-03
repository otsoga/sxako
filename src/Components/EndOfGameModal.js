import { Button, Box, Dialog } from '@mui/material';

function EndOfGameModal({open, onClose}) {

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <Box>
                <h1>This is a modal for ya</h1>
            </Box>
        </Dialog>
    );
}

export default EndOfGameModal;