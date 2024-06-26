import { Button, Box } from '@mui/material';

function BigButton({text}) {

    return (
            <Box
                marginBottom={4}
                text={text}
            >
                <Button 
                    className="menuButton"
                    variant="contained"
                    color="primary"
                    size="large"
                > {text}
                </Button>
            </Box>
    );
}

export default BigButton;