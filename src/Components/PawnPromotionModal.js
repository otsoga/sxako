import { Button, Box, Dialog } from '@mui/material';
import PromotionIconBox from './PromotionIconBox';

function PawnPromotionModal({open, onClose, gameOver}) {

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <Box padding='1rem' bgcolor={'#111111'} color={'white'} borderColor='white' border='3px'>
                <h1>Choose Promotion Piece</h1>
                <Box sx ={{display: 'flex', justifyContent: 'space-around'}}>
                    <PromotionIconBox piece='Q'/>
                    <PromotionIconBox piece='R'/>
                    <PromotionIconBox piece='N'/>
                    <PromotionIconBox piece='B'/>
                </Box>
            </Box>
        </Dialog>
    );
}

export default PawnPromotionModal;