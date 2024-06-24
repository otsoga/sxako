import './App.css';
import { useState } from 'react';
import {Chessboard} from 'react-chessboard'
import {Chess} from 'chess.js'
              
function App() {
  const [game, setGame] = useState(new Chess());
 
function makeMove(modify){
  setGame((game)=>{
    const update = {...game};
    modify(update)
    return update;
  })
}

function makeRandomMove(){
  const possibleMove = game.moves();

  if(game.game_over() || game.in_draw() || possibleMove.length === 0) {
    return;
  }

  const randomIndex = Math.floor(Math.random() * possibleMove.length);
  makeMove((game)=>{
    game.move(possibleMove[randomIndex]);
  })
}
 
  function onDrop(source,target){
    let move = null;
    makeMove((game)=>{
      move = game.move({
        from:source,
        to: target,
        promotion:'q'
      })
  })
    if (move == null) { 
      return false
    }

    // make the computer move
    setTimeout(makeRandomMove, 200);
    return true;
    }

  return (
    <div className="app">
      <Chessboard 
      position={game.fen()}
      onPieceDrop ={onDrop}
      />
    </div>
  );
}

export default App;