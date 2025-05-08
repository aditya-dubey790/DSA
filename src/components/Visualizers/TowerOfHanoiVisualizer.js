import React, { useState, useEffect } from 'react';
import './TowerOfHanoiVisualizer.css';

const TowerOfHanoiVisualizer = () => {
  const [numDisks, setNumDisks] = useState(0);
  const [towers, setTowers] = useState([[], [], []]);
  const [isSolving, setIsSolving] = useState(false);
  const [delay, setDelay] = useState(150); // Increased speed by reducing delay to 150ms

  useEffect(() => {
    const initialTowers = [[], [], []];
    for (let i = numDisks; i >= 1; i--) {
      initialTowers[0].push(i);
    }
    setTowers(initialTowers);
  }, [numDisks]);

  const solveHanoi = () => {
    if (isSolving || numDisks < 1) return;
    setIsSolving(true);
    const moves = [];
    const moveDisks = (n, from, to, aux) => {
      if (n === 1) {
        moves.push([from, to]);
        return;
      }
      moveDisks(n - 1, from, aux, to);
      moves.push([from, to]);
      moveDisks(n - 1, aux, to, from);
    };

    moveDisks(numDisks, 0, 2, 1);

    let step = 0;
    const interval = setInterval(() => {
      if (step >= moves.length) {
        clearInterval(interval);
        setIsSolving(false);
        return;
      }
      const [from, to] = moves[step];
      setTowers((prev) => {
        const updated = [...prev.map((tower) => [...tower])];
        const disk = updated[from].pop();
        updated[to].push(disk);
        return updated;
      });
      step++;
    }, delay);
  };

  const handleNumDisksChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value <= 10) {
      setNumDisks(value);
    }
  };

  const reset = () => {
    setIsSolving(false);
    setTowers([[], [], []]);
    setNumDisks(0);
  };

  return (
    <div className="hanoi-main-container">
      <h2 className="title">Tower of Hanoi Visualizer</h2>

      <div className="hanoi-controls">
        <label>Number of Disks: </label>
        <input
          type="number"
          value={numDisks}
          onChange={handleNumDisksChange}
          min="1"
          max="10"
        />
        <button onClick={solveHanoi} disabled={isSolving || numDisks < 1}>
          Solve
        </button>
        <button onClick={reset}>Reset</button>
      </div>

      <div className="hanoi-delay-control">
        <label>Delay (ms): {delay}</label>
        <input
          type="range"
          min="50"
          max="200"
          value={delay}
          step="50"
          onChange={(e) => setDelay(parseInt(e.target.value))}
        />
      </div>

      <div className="hanoi-tower-container">
        {towers.map((tower, index) => (
          <div className="hanoi-tower" key={index}>
            <div
              className="hanoi-peg"
              style={{
                height: numDisks > 0 ? `${(numDisks + 1) * 30}px` : '0',
              }}
            ></div>
            {tower.map((disk, i) => (
              <div
                key={i}
                className="hanoi-disk"
                style={{
                  width: `${disk * 20}px`,
                }}
              >
                {disk}
              </div>
            ))}
            <div className="tower-label">
              {index === 0
                ? 'Source'
                : index === 1
                ? 'Auxiliary'
                : 'Destination'}
            </div>
          </div>
        ))}
      </div>

      <div className="hanoi-info-panel">
        <h3>Pseudocode</h3>
        <pre>
{`procedure Hanoi(n, source, target, auxiliary)
  if n == 1:
    move disk from source to target
  else:
    Hanoi(n-1, source, auxiliary, target)
    move disk from source to target
    Hanoi(n-1, auxiliary, target, source)`}
        </pre>
        <h3>Explanation</h3>
        <p>
          The Tower of Hanoi is a mathematical puzzle where you move a stack of
          disks from one rod to another, using an auxiliary rod, following these
          rules:
        </p>
        <ul>
          <li>Only one disk can be moved at a time.</li>
          <li>No disk may be placed on top of a smaller disk.</li>
          <li>Only the top disk of a rod can be moved.</li>
        </ul>
        <p>
          This visualizer demonstrates the recursive solution to the Tower of
          Hanoi problem by animating the disk transfers.
        </p>
      </div>
    </div>
  );
};

export default TowerOfHanoiVisualizer;
