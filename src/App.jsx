import { useState } from "react";
import { IoIosRefresh } from "react-icons/io";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  const checkWinner = (currentBoard) =>
    winningPatterns.find(([a, b, c]) =>
      currentBoard[a] &&
      currentBoard[a] === currentBoard[b] &&
      currentBoard[a] === currentBoard[c]
    );

  const handleClick = (index) => {
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const winningPattern = checkWinner(newBoard);

    if (winningPattern) {
      setWinner(currentPlayer);
      setWinningLine(winningPattern);
      setScores((previous) => ({
        ...previous,
        [currentPlayer]: previous[currentPlayer] + 1,
      }));
      return;
    }

    if (newBoard.every(Boolean)) {
      setWinner("Draw");
      return;
    }

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinner(null);
    setWinningLine([]);
  };

  const resetMatch = () => {
    resetGame();
    setScores({ X: 0, O: 0 });
  };

  return (
    <div className="game">
      <div className="Profil">
        <img src="/Zakaria.Ou.png" alt="Zakaria Outaazza" />
        <div className="profile-details">
          <p className="profile-name">Zakaria Outaazza</p>
          <p className="profile-role">Full Stack Developer</p>
        </div>
      </div>
      <main className="game-panel">
        <header className="game-header">
          <p className="eyebrow">TECH GRID</p>
          <div className="title-row">
            <img className="game-logo" src="/XOlogo.jpg" alt="Tic Tac Toe logo" />
            <h1>Tic Tac Toe</h1>
          </div>
        </header>

        <div className="score-board" aria-label="Score board">
          <div className={`score-card player-x ${currentPlayer === "X" && !winner ? "active" : ""}`}>
            <span>Player X</span>
            <strong>{scores.X}</strong>
          </div>
          <div className="score-divider">VS</div>
          <div className={`score-card player-o ${currentPlayer === "O" && !winner ? "active" : ""}`}>
            <span>Player O</span>
            <strong>{scores.O}</strong>
          </div>
        </div>

        <h2 className="game-status" aria-live="polite">
          {winner === "Draw"
            ? "It's a draw"
            : winner
              ? `Player ${winner} wins`
              : `Player ${currentPlayer}'s turn`}
        </h2>

        <div className="board" aria-label="Tic tac toe board">
          {board.map((cell, index) => (
            <button
              className={`cell ${cell ? `mark-${cell.toLowerCase()}` : ""} ${winningLine.includes(index) ? "winning" : ""}`}
              key={index}
              onClick={() => handleClick(index)}
              disabled={Boolean(cell) || Boolean(winner)}
              aria-label={cell ? `Cell ${index + 1}: ${cell}` : `Cell ${index + 1}: empty`}
            >
              {cell}
            </button>
          ))}
        </div>

        <div className="game-actions">
          <button className="reset-button" onClick={resetGame} aria-label="Restart round">
            <IoIosRefresh className="refresh-icon" />
            <span>Restart</span>
          </button>
          <button className="reset-match-button" onClick={resetMatch}>Reset match</button>
        </div>
      </main>
    </div>
  );
}

export default App;