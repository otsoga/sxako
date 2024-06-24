import '../App.css';
import { useState } from 'react';
import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'

function Board() {
    const [game, setGame] = useState(new Chess());

    const makeMove= (modify) => {
        setGame((game) => {
            const update = { ...game };
            modify(update)
            return update;
        })
    }

    const makeRandomMove = () =>{
        const possibleMoves = game.moves();

        if (game.game_over() || game.in_draw() || possibleMoves.length === 0) {
            console.log('Game over');
            console.log(game);
            return;
        }

        makeMove((game) => {
            game.move(getRandomElement(possibleMoves));
        })
    }

    const onDrop = (source, target) => {
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

    const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

    return (
        <div className="app">
            <Chessboard
                position={game.fen()}
                onPieceDrop={onDrop}
            />
        </div>
    );
}

export default Board;