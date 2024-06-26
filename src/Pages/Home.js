import '../App.css';
import BigButtonLink from '../Components/BigButtonLink';

function Home() {

    return (
        <div className='home'>
            <BigButtonLink text="Openings" to='/openings' />
            <BigButtonLink text="Tactics" to={'/tactics'} />
            <BigButtonLink text="Endgames" to={'/endgames'} />
        </div>
    );
}

export default Home;