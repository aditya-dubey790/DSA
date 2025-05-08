import React, { useState } from 'react';
import LinkedList from './LinkedList';
import './LinkedListVisualizer.css';

const LinkedListVisualizer = () => {
  const [linkedList, setLinkedList] = useState(new LinkedList());
  const [inputValue, setInputValue] = useState('');
  const [position, setPosition] = useState(0);
  const [operation, setOperation] = useState('insertHead');

  const handleOperation = () => {
    const value = parseInt(inputValue);

    switch (operation) {
      case 'insertHead':
        linkedList.insertAtHead(value);
        break;
      case 'insertTail':
        linkedList.insertAtTail(value);
        break;
      case 'insertPosition':
        linkedList.insertAtPosition(value, parseInt(position));
        break;
      case 'deleteHead':
        linkedList.deleteAtHead();
        break;
      case 'deleteTail':
        linkedList.deleteAtTail();
        break;
      case 'deletePosition':
        linkedList.deleteAtPosition(parseInt(position));
        break;
      default:
        break;
    }

    setLinkedList(
      Object.assign(Object.create(Object.getPrototypeOf(linkedList)), linkedList)
    );
    setInputValue('');
  };

  const handleChange = (e) => setInputValue(e.target.value);

  return (
    <div className="linked-list-visualizer">
      <h1>Linked List Visualizer</h1>
      <div className="container">
        <input
          type="number"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter value"
        />
        {['insertPosition', 'deletePosition'].includes(operation) && (
          <input
            type="number"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Position"
          />
        )}
        <select
          onChange={(e) => setOperation(e.target.value)}
          value={operation}
        >
          <option value="insertHead">Insert at Head</option>
          <option value="insertTail">Insert at Tail</option>
          <option value="insertPosition">Insert at Position</option>
          <option value="deleteHead">Delete at Head</option>
          <option value="deleteTail">Delete at Tail</option>
          <option value="deletePosition">Delete at Position</option>
        </select>
        <button onClick={handleOperation}>Perform Operation</button>

        <div className="linked-list">
          {linkedList.toArray().map((node, index) => (
            <React.Fragment key={index}>
              <div className="node">
                <div className="data">Data: {node.data}</div>
                <div className="next">
                  Next: {node.next ? node.next : 'null'}
                </div>
              </div>
              {node.next && <div className="arrow">→</div>}
            </React.Fragment>
          ))}
        </div>
        
        {/* Pseudo Code Display */}
        <div className="pseudo-code">
          <h3>Pseudo Code for Linked List Operations</h3>
          <pre>
            {`
              Insert at Head:
              1. Create a new node with the given value.
              2. Set the new node's next pointer to the current head.
              3. Update the head to the new node.

              Insert at Tail:
              1. Create a new node with the given value.
              2. If the list is empty, set head and tail to the new node.
              3. If the list is not empty, find the last node and set its next pointer to the new node.

              Insert at Position:
              1. Create a new node with the given value.
              2. Traverse the list until the specified position is reached.
              3. Set the new node's next pointer to the node at that position.
              4. Update the previous node's next pointer to the new node.

              Delete at Head:
              1. Update the head to the next node of the current head.

              Delete at Tail:
              1. Traverse the list to find the second last node.
              2. Set the second last node's next pointer to null.
              3. Update the tail.

              Delete at Position:
              1. Traverse the list until the specified position is reached.
              2. Update the previous node's next pointer to skip the node to be deleted.
            `}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default LinkedListVisualizer;
