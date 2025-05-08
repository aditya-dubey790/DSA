import React, { useEffect, useRef, useState } from 'react';
import './ConvexHullVisualizer.css';

const ConvexHullVisualizer = () => {
  const canvasRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [hull, setHull] = useState([]);
  const [numPoints, setNumPoints] = useState(30);
  const [delay, setDelay] = useState(300);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    generatePoints();
  }, [numPoints]);

  useEffect(() => {
    draw();
  }, [points, hull]);

  const generatePoints = () => {
    const canvas = canvasRef.current;
    const { width, height } = canvas;
    const newPoints = [];

    const set = new Set();
    while (newPoints.length < numPoints) {
      const x = Math.floor(Math.random() * (width - 20) + 10);
      const y = Math.floor(Math.random() * (height - 20) + 10);
      const key = `${x},${y}`;
      if (!set.has(key)) {
        newPoints.push({ x, y });
        set.add(key);
      }
    }

    setPoints(newPoints);
    setHull([]);
    setIsRunning(false);
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const cross = (o, a, b) =>
    (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);

  const grahamScan = async () => {
    if (isRunning || points.length < 3) return;

    setIsRunning(true);
    const sorted = [...points].sort((a, b) => a.x - b.x || a.y - b.y);

    const lower = [];
    for (let p of sorted) {
      while (
        lower.length >= 2 &&
        cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0
      ) {
        lower.pop();
        setHull([...lower]);
        draw([...lower], 'blue', p);
        await sleep(delay);
      }
      lower.push(p);
      setHull([...lower]);
      draw([...lower], 'blue', p);
      await sleep(delay);
    }

    const upper = [];
    for (let i = sorted.length - 1; i >= 0; i--) {
      const p = sorted[i];
      while (
        upper.length >= 2 &&
        cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0
      ) {
        upper.pop();
        setHull([...lower, ...upper]);
        draw([...lower, ...upper], 'blue', p);
        await sleep(delay);
      }
      upper.push(p);
      setHull([...lower, ...upper]);
      draw([...lower, ...upper], 'blue', p);
      await sleep(delay);
    }

    upper.pop();
    lower.pop();
    const finalHull = [...lower, ...upper];
    setHull(finalHull);
    draw(finalHull, 'red');
    setIsRunning(false);
  };

  const draw = (hullPath = hull, color = 'red', highlight = null) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let p of points) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = highlight && p === highlight ? 'blue' : 'black';
      ctx.fill();
    }

    if (hullPath.length > 1) {
      ctx.beginPath();
      ctx.moveTo(hullPath[0].x, hullPath[0].y);
      for (let i = 1; i < hullPath.length; i++) {
        ctx.lineTo(hullPath[i].x, hullPath[i].y);
      }
      ctx.lineTo(hullPath[0].x, hullPath[0].y);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  };

  return (
    <div className="convex-container">
      <h1>Convex Hull Visualizer (Graham Scan)</h1>
      <div className="controls">
        <div className="control">
          <label>Points</label>
          <input
            type="number"
            min="3"
            max="100"
            value={numPoints}
            onChange={(e) => setNumPoints(parseInt(e.target.value))}
          />
        </div>
        <div className="control">
          <label>Delay ({delay}ms)</label>
          <input
            type="range"
            min="0"
            max="1000"
            value={delay}
            onChange={(e) => setDelay(parseInt(e.target.value))}
          />
        </div>
        <button onClick={grahamScan} disabled={isRunning}>
          Start
        </button>
        <button onClick={generatePoints}>Reset</button>
      </div>

      <canvas ref={canvasRef} width={900} height={500}></canvas>

      <div className="info-panel">
        <h2>Pseudo-code & Explanation</h2>
        <pre>
{`function grahamScan(points):
    sort points by x (and y)
    lower = []
    for point in points:
        while lower has ≥2 and right turn:
            pop last
        push point to lower

    upper = []
    for point in reversed(points):
        while upper has ≥2 and right turn:
            pop last
        push point to upper

    remove last of upper/lower (duplicate)
    return lower + upper`}
        </pre>
        <p>
          Graham Scan constructs the convex hull by building two halves: the lower and upper boundary.
          It uses the cross product to determine orientation and maintains only left turns (counter-clockwise)
          to form the correct hull shape. Time complexity is <strong>O(n log n)</strong>.
        </p>
      </div>
    </div>
  );
};

export default ConvexHullVisualizer;
