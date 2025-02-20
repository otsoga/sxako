import { Box } from '@mui/material';

function ContentBox({title, text}) {

    return (
        <Box
        padding={'1rem'}
        width={'100%'}
        backgroundColor={'#222222'}>
        <h2>{title}</h2>
        <p>{text}</p>
    </Box>
    );
}

export default ContentBox;