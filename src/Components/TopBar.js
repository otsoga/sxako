import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

function TopBar() {

    return (
        <Box>
        <Link 
            to='/'
            id='logo'>
                <h1>Ŝako</h1>
        </Link>
        </Box>   
    );

    // return (
    //     <Box component={Link} to='/' color='white'>
    //         <h1 textDecoration='none'>Ŝako</h1>
    //     </Box>   
    // );
}

export default TopBar;