import React, { useState } from 'react';
import Stack from './Stack';
import './StackVisualizer.css';

const StackVisualizer = () => {
  const [stack, setStack] = useState(new Stack());
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');

  // Handle Push operation
  const handlePush = () => {
    stack.push(parseInt(inputValue));
    setStack(Object.assign(Object.create(Object.getPrototypeOf(stack)), stack));  // Re-trigger component update
    setInputValue('');
  };

  // Handle Pop operation
  const handlePop = () => {
    const poppedValue = stack.pop();
    setStack(Object.assign(Object.create(Object.getPrototypeOf(stack)), stack));  // Re-trigger component update
    setMessage(poppedValue === "Underflow" ? "Stack is empty!" : `Popped: ${poppedValue}`);
  };

  // Handle Peek operation
  const handlePeek = () => {
    const peekValue = stack.peek();
    setMessage(peekValue === "No elements in Stack" ? "Stack is empty!" : `Top: ${peekValue}`);
  };

  // Handle Clear operation
  const handleClear = () => {
    stack.clear();
    setStack(Object.assign(Object.create(Object.getPrototypeOf(stack)), stack));  // Re-trigger component update
    setMessage('Stack cleared!');
  };

  return (
    <div className="stack-visualizer">
      <h1>Stack Visualizer</h1>

      {/* Input for stack operations */}
      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter value"
      />

      {/* Buttons for stack operations */}
      <div className="buttons-container">
        <button onClick={handlePush}>Push</button>
        <button onClick={handlePop}>Pop</button>
        <button onClick={handlePeek}>Peek</button>
        <button onClick={handleClear}>Clear Stack</button>
      </div>

      {/* Display message based on operation */}
      {message && <div className="message">{message}</div>}

      {/* Display the stack */}
      <div className="stack">
        {stack.toArray().map((item, index) => (
          <div key={index} className={`stack-item ${index === stack.size() - 1 ? 'top' : ''}`}>
            {item}
            {index === stack.size() - 1 && <div className="top-label">Top</div>}
          </div>
        ))}
      </div>

      {/* Display Pseudo Code */}
      <div className="pseudo-code">
        <h3>Pseudo Code for Stack Operations</h3>
        <pre>
{`Push Operation:
1. Parse the input value as an integer.
2. Push the value onto the stack.
3. Update the stack state.
4. Clear the input field.

Pop Operation:
1. Pop the top value from the stack.
2. If the stack is empty (underflow), show a message "Stack is empty!".
3. If a value is successfully popped, display the popped value.

Peek Operation:
1. Peek the top value of the stack without removing it.
2. If the stack is empty, display "Stack is empty!".
3. Otherwise, display the top value.

Clear Operation:
1. Clear the entire stack.
2. Update the stack state to reflect the cleared stack.
3. Show the message "Stack cleared!".
`}
        </pre>
      </div>
    </div>
  );
};

export default StackVisualizer;
