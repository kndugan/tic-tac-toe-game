import { useState, useEffect } from "react";
import './App.css';
import Square from './Component/Square';
import {Patterns} from './Patterns'
import WinnerScreen from "./WinnerScreen";

//game sounds initialize
const click = new Audio('./click.mp3')
const gameWinnerSound = new Audio('./win.wav')
const restartSound = new Audio('./restart.wav')

//game sound functions
const clickPlay = () => {
  click.play()
}
const gameWinner = () => {
  gameWinnerSound.play()
}
const gameRestart = () => {
  restartSound.play()
}

function App() {
  //board index for squares
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""])
  //set player to ⭕ or ❌
  const[player, setPlayer] = useState("⭕")
  //next player
  let playerTurn = `Next Player: ${player === '❌' ? 'Player ❌' : 'Player ⭕'}`;
  //result
  const [result, setResult] = useState({ winner: "none", state: "none" });
  // check win
  const [win, setWin] = useState(false);

  useEffect(() => { // use when board changes
    checkWin()
    checkIfTie()

    if (player === "❌") {
      setPlayer("⭕");
    } else {
      setPlayer("❌");
    }
  }, [board]);

  //render winner
  useEffect(() => {
    
    if (result.state !== "none") {
      setWin(true);
      gameWinner();
      // alert(`Game Finished! Winning Player: ${result.winner}`);
    }
  }, [result]);

  //handle click
  const handleClick =(square) => {
    clickPlay()
    setBoard(
      board.map((val, idx) => {
        if (idx === square && val === "") {
          return player; 
        }
        return val; 
      })
    );
  }

  // checking for winner
  const checkWin = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer === "") return; 
      let foundWinningPattern = true;
      currPattern.forEach((idx) => {
        if (board[idx] !== firstPlayer) {
          foundWinningPattern = false;
        }
      });

      if (foundWinningPattern) {
        setResult({ winner: player, state: "Won" });
      }
    });
  };

  //restart
  const restartGame = () => {
    gameRestart()
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("⭕");
    setWin(false)
  };

  //check if tie
  const checkIfTie = () => {
    let filled = true; 
    board.forEach((square) => {
      if (square === "") {
        filled = false; 
      }
    });
    if (filled) {
      setResult({ winner: "No One", state: "Tie" });
    }
  };

  return (
    <div className="App">
     <div className="board">
      <h1 className="title">Let's Play Tic Tac Toe</h1>
       <div className="row">
        <Square 
        chooseSquare={()=>{handleClick(0)}}
        val={board[0]}/>
        <Square 
        chooseSquare={()=>{handleClick(1)}}
        val={board[1]}/>
        <Square 
        chooseSquare={()=>{handleClick(2)}}
        val={board[2]}/>
       </div>
       <div className="row">
       <Square 
        chooseSquare={()=>{handleClick(3)}}
        val={board[3]}/>
        <Square 
        chooseSquare={()=>{handleClick(4)}}
        val={board[4]}/>
        <Square 
        chooseSquare={()=>{handleClick(5)}}
        val={board[5]}/>
       </div>
       <div className="row">
       <Square 
        chooseSquare={()=>{handleClick(6)}}
        val={board[6]}/>
        <Square 
        chooseSquare={()=>{handleClick(7)}}
        val={board[7]}/>
        <Square 
        chooseSquare={()=>{handleClick(8)}}
        val={board[8]}/>
       </div>
       <div>
         <h1 className="title" id="turn">{playerTurn}</h1>
        </div>
     </div>
     {win ? <WinnerScreen restartGame={restartGame} playerWon={result.winner} /> : null }
    </div>
  );
}

export default App;
