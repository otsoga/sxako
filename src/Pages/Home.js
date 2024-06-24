import BigButton from '../Components/BigButton';
import Board from '../Components/Board';
import { Button, Box } from '@mui/material';

function Home() {

    return (
        <div className='home'>
            <BigButton text="Human vs. Human" />
            <BigButton text="Human vs. Computer" />
            <BigButton text="Openings" />
            <BigButton text="Tactics" />
            <BigButton text="Endgames" />
        </div>
    );
}

export default Home;