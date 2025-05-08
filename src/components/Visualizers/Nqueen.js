import React, { useState, useEffect, useRef } from 'react';
import './NQueenVisualizer.css';

const NQueenVisualizer = () => {
  const [size, setSize] = useState(8);
  const [delay, setDelay] = useState(300);
  const [board, setBoard] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const isRunningRef = useRef(false);

  useEffect(() => {
    resetBoard(size);
  }, [size]);

  const resetBoard = (n) => {
    const empty = Array.from({ length: n }, () => Array(n).fill(''));
    setBoard(empty);
    isRunningRef.current = false;
    setIsRunning(false);
  };

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  const isSafe = (b, row, col) => {
    for (let i = 0; i < col; i++) if (b[row][i] === 'Q') return false;
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) if (b[i][j] === 'Q') return false;
    for (let i = row, j = col; i < size && j >= 0; i++, j--) if (b[i][j] === 'Q') return false;
    return true;
  };

  const solve = async (b, col) => {
    if (!isRunningRef.current) return false;
    if (col >= size) return true;
    for (let row = 0; row < size; row++) {
      if (!isRunningRef.current) return false;
      if (isSafe(b, row, col)) {
        b[row][col] = 'Q';
        setBoard(b.map(r => [...r]));
        await sleep(delay);
        if (await solve(b, col + 1)) return true;
        b[row][col] = '';
        setBoard(b.map(r => [...r]));
        await sleep(delay);
      }
    }
    return false;
  };

  const handleStart = async () => {
    if (isRunning) return;
    isRunningRef.current = true;
    setIsRunning(true);
    const tempBoard = Array.from({ length: size }, () => Array(size).fill(''));
    setBoard(tempBoard);
    await sleep(10);
    await solve(tempBoard, 0);
    setIsRunning(false);
  };

  const handleReset = () => {
    isRunningRef.current = false;
    setIsRunning(false);
    resetBoard(size);
  };

  const handleSizeChange = (e) => {
    const val = Math.max(1, Math.min(10, parseInt(e.target.value)));
    setSize(val);
    resetBoard(val);
  };

  return (
    <div className="nqueen-container">
      <h1>N-Queen Visualizer</h1>
      <div className="controls">
        <div className="control">
          <label>Board Size (max 10)</label>
          <input type="number" value={size} min="1" max="10" onChange={handleSizeChange} />
        </div>
        <div className="control">
          <label>Delay: {delay}ms</label>
          <input type="range" min="50" max="1000" step="50" value={delay} onChange={(e) => setDelay(parseInt(e.target.value))} />
        </div>
        <button onClick={handleStart} disabled={isRunning}>Start</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div
        className="board"
        style={{
          gridTemplateColumns: `repeat(${size}, 1fr)`,
          gridTemplateRows: `repeat(${size}, 1fr)`,
        }}
      >
        {board.map((row, i) =>
          row.map((cell, j) => (
            <div key={`${i}-${j}`} className={`cell ${(i + j) % 2 === 0 ? 'light' : 'dark'}`}>
              {cell === 'Q' ? '♛' : ''}
            </div>
          ))
        )}
      </div>

      <div className="info-panel">
        <h2>Pseudo-code & Explanation</h2>
        <pre>
{`function solveNQueens(board, col):
    if col >= N:
        return true

    for row from 0 to N-1:
        if isSafe(board, row, col):
            place queen at (row, col)
            if solveNQueens(board, col + 1):
                return true
            remove queen (backtrack)

    return false

function isSafe(board, row, col):
    check row on left
    check upper diagonal on left
    check lower diagonal on left
`}
        </pre>
        <p>
          This algorithm uses **backtracking** to place queens one column at a time. If it finds a
          safe spot, it places a queen and moves to the next column. If a conflict arises later, it
          backtracks to try a different position.
        </p>
      </div>
    </div>
  );
};

export default NQueenVisualizer;
