import '../App.css';
import BigButtonLink from '../Components/BigButtonLink';
import { Box } from '@mui/system';

function Home() {

    return (
        <Box className='home'>
            <h1>Sxako</h1>
            <BigButtonLink text="Play vs. CPU" to='/play-vs-cpu' />
            {/* <BigButtonLink text="Openings" to='/openings' /> */}
            <BigButtonLink text="Tactics Trainer" to={'/tactics'} />
            {/* <BigButtonLink text="Endgames" to={'/endgames'} /> */}
        </Box>
    );
}

export default Home;