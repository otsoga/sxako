import { Button } from '@mui/material';

function GameNavigationButton({text, onClick}) {

    return (
        <Button
            variant='contained'
            sx={{marginRight: '1rem', marginBottom: '1rem'}}
            onClick={onClick}>{text}
        </Button>
    );
}

export default GameNavigationButton;