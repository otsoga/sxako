import { Box } from '@mui/material';

function PromotionIconBox({piece}) {

    return (
        <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            fontSize={'3.5rem'}
            padding={'1rem'}
            width='100px'
            height='100px'
            backgroundColor={'#222222'}
            color={'white'}
            borderColor={'white'}
            border={4}
            margin={1}>
            <p>{piece}</p>
        </Box>
    );
}

export default PromotionIconBox;