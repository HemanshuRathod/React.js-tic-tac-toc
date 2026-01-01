import { useState } from 'react';
import Log from './Component/Log';
import Player from './Component/Player'
import GameBoard from './Component/GameBoard';

import { WINNING_COMBINATIONS } from './WINNIG_COMBINATIONS';
import GameOver from './Component/GameOver';




const initialGameBoard =[
    [null,null,null],
    [null,null,null],
    [null,null,null],
];

function deriveActivePlayer(gameTurns){
  let currentPlayer='X';

  if(gameTurns.length>0 && gameTurns[0].player==='X'){
    currentPlayer ='0';

  }
  return currentPlayer;
}
function App() {
 
  const[gameTurns,setGameTurns]=useState([]);
  // const [hasWiner,setHasWiner]=useState([false]);
  //const[activePlayer,setActivePlayer]=useState('X');


  const activePlayer=deriveActivePlayer(gameTurns);

   let gameboard=[...initialGameBoard.map(array=>[...array])];

    for (const turn of gameTurns){
        const{square,player }=turn;
        const{row,col}=square;

        gameboard[row][col]=player;
    }
let winner;
const hasDraw=gameTurns.length===9 && !winner;

  for (const combination of WINNING_COMBINATIONS){
      const fristSquareSymbol=gameboard[combination[0].row][combination[0].column];
      const scondSquareSymbol=gameboard[combination[1].row][combination[1].column];
      const thirdSquareSymbol=gameboard[combination[2].row][combination[2].column];

        if(fristSquareSymbol &&
          fristSquareSymbol === scondSquareSymbol &&
           fristSquareSymbol === thirdSquareSymbol
        
          )
          {
        winner=fristSquareSymbol;
        }
      }

  function handelSelectSquare(rowIndex,colIndex){
    //setActivePlayer((curActivePlayer)=>curActivePlayer==='X'?'0':'X');
    setGameTurns((prevTurns) =>{
      const currentPlayer=deriveActivePlayer(prevTurns);
    
      const updatedTurns=[{square:{row:rowIndex,col:colIndex},player:currentPlayer},...prevTurns];
      return updatedTurns;
    })
  }

  function handelRestart()
  {
    setGameTurns([]);
  }
  return (
 

      <main>
   
    <div id="game-container">

     
       
      Players
      <ol id='players' className="highlight-player">
     <Player initialName="Player 1" symbol="X" isActive={activePlayer==='X'}/>
     <Player initialName="Player 2" symbol="0" isActive={activePlayer==='0'}/>
      </ol>
    {(winner || hasDraw)&&<GameOver winner={winner} onRestart={handelRestart}/>}
    
    <GameBoard onSelectSquare={handelSelectSquare} board={gameboard}/>
</div>
         <Log turns={gameTurns}/> 
       
       
         
    </main>

  )
}

export default App
