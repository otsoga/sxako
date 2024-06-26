import SolidBoard from '../Components/SolidBoard';
import { Chess } from 'chess.js'
import { useState } from 'react';


function Openings() {
    const [game, setGame] = useState(new Chess());

    const onHumanMove = (source, target) => {
        let move = null;
        makeMove((game) => {
            move = game.move({
                from: source,
                to: target,
                promotion: getRandomElement(['q', 'r', 'b', 'n'])
            })
        })

        if (move == null) {
            return false
        }

        // make the computer move
        setTimeout(makeRandomMove, 200);
        return true;
    }

    const makeMove = (modify) => {
        setGame((game) => {
            const update = { ...game };
            modify(update)
            return update;
        })
    }

    const makeRandomMove = () =>{
        const possibleMoves = game.moves();
        console.log('possibleMoves', possibleMoves)

        if (game.game_over() || game.in_draw() || possibleMoves.length === 0) {
            console.log('Game over');
            console.log(game);
            return;
        }

        makeMove((game) => {
            game.move(getRandomElement(possibleMoves));
        })
    }

    const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

    return (
        <div className='app'>
            <h1>Openings</h1>
            <SolidBoard 
                position={game}
                onDrop={onHumanMove}
            />
        </div>
    );
}

export default Openings;