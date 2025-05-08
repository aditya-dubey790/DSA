import React, { useState } from 'react';
import Queue from './Queue';
import './QueueVisualizer.css';

const QueueVisualizer = () => {
  const [queue, setQueue] = useState(new Queue());
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');

  const handleEnqueue = () => {
    queue.enqueue(parseInt(inputValue));
    setQueue(Object.assign(Object.create(Object.getPrototypeOf(queue)), queue));
    setInputValue('');
  };

  const handleDequeue = () => {
    const removed = queue.dequeue();
    setQueue(Object.assign(Object.create(Object.getPrototypeOf(queue)), queue));
    setMessage(removed === "Underflow" ? "Queue is empty!" : `Dequeued: ${removed}`);
  };

  const handlePeek = () => {
    const front = queue.peek();
    setMessage(front === "No elements in Queue" ? "Queue is empty!" : `Front: ${front}`);
  };

  const handleClear = () => {
    queue.clear();
    setQueue(Object.assign(Object.create(Object.getPrototypeOf(queue)), queue));
    setMessage("Queue cleared!");
  };

  return (
    <div className="queue-visualizer">
      <h1>Queue Visualizer</h1>

      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter value"
      />

      <button onClick={handleEnqueue}>Enqueue</button>
      <button onClick={handleDequeue}>Dequeue</button>
      <button onClick={handlePeek}>Peek</button>
      <button onClick={handleClear}>Clear Queue</button>

      {message && <div className="message">{message}</div>}

      <div className="queue">
        {queue.toArray().map((item, index, arr) => (
          <div key={index} className="queue-item">
            {item}
            {index === arr.length - 1 && <div className="label">Front</div>}
            {index === 0 && <div className="label">Rear</div>}
          </div>
        ))}
      </div>

      <div className="pseudo-code">
        <h3>Pseudo Code for Queue Operations</h3>
        <pre>
{`Enqueue Operation:
1. Parse the input value as an integer.
2. Add the value to the rear of the queue.
3. Update the queue state.
4. Clear the input field.

Dequeue Operation:
1. Remove the front element from the queue.
2. If the queue is empty (underflow), show a message "Queue is empty!".
3. If a value is successfully dequeued, display the dequeued value.

Peek Operation:
1. View the front value of the queue without removing it.
2. If the queue is empty, display "Queue is empty!".
3. Otherwise, display the front value.

Clear Operation:
1. Clear the entire queue.
2. Update the queue state to reflect the cleared queue.
3. Show the message "Queue cleared!".`}
        </pre>
      </div>
    </div>
  );
};

export default QueueVisualizer;
