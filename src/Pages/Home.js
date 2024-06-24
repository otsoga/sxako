import '../App.css';
import { Link } from 'react-router-dom';
import BigButtonLink from '../Components/BigButtonLink';
import BigButton from '../Components/BigButton';

function Home() {

    return (
        <div className='home'>
            <BigButtonLink text="Home" to={'/'} />
            <BigButtonLink text="Openings" to='/openings' />
            <BigButtonLink text="Tactics" to={'/tactics'} />
            <BigButtonLink text="Endgames" to={'/endgames'} />
        </div>
    );
}

export default Home;