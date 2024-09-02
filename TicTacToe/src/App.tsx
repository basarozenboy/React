import { useState } from 'react';

function Square({value, onSquareClick}: {value: string, onSquareClick: () => void}){

  return <button className="square"
  onClick={onSquareClick}
  >{value}</button>
}

export function Board({xIsNext, squaeres, onPlay}: {xIsNext: boolean, squaeres: Array<string>, onPlay: (x: any)=>void}) {

  function handleClick(i: number){
    if(squaeres[i] || calculateWinner(squaeres)){
      return;
    }
    const nextSquares = squaeres.slice();
    if(xIsNext){
      nextSquares[i] = "x";
    }
    else{
      nextSquares[i] = "o";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squaeres);
  let status;
  if(winner){
    status = "Kazanan: " + winner;
  } else {
    status = "Sıradaki oyuncu: " +(xIsNext ? "x":"o");
  }

  return (
    <>
    <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squaeres[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squaeres[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squaeres[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squaeres[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squaeres[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squaeres[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squaeres[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squaeres[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squaeres[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  );
}

function calculateWinner(squares: Array<string>){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++){
    const [a,b,c]=lines[i];
    if(squares[a] && squares[a] === squares[b] &&
      squares[a] === squares[c]){
        return squares[a];
      }
  }
  return null;
}

export default function Game()
{
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: any){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);    
  }

  function jumpTo(nextMove: any){
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if(move >0){
      description = '# numaralı hamleye git ' + move;
    } else {
      description = 'Oyunun başlangıcına git';
    }
    return(
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squaeres={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}