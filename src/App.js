import { Route, Routes } from 'react-router-dom';
import Endgames from './Pages/Endgames';
import Home from './Pages/Home';
import Openings from './Pages/Openings';
import TacticsTrainer from './Pages/TacticsTrainer';
import PlayVsCpu from './Pages/PlayVsCpu';


function App() {

    return (
        <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route exact path="/endgames" element={<Endgames />}/>
            <Route exact path="/openings" element={<Openings />}/>
            <Route exact path="/play-vs-cpu" element={<PlayVsCpu />}/>
            <Route exact path="/tactics-trainer" element={<TacticsTrainer />}/>
        </Routes>
    );
}

export default App;