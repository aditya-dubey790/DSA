import React, { useState, useEffect } from "react";
import "./BSTVisualizer.css";

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.x = 0;
    this.y = 0;
  }
}

function BSTVisualizer() {
  const [root, setRoot] = useState(null);
  const [input, setInput] = useState("");
  const [log, setLog] = useState("All operations will appear here...");

  const insertNode = (node, value) => {
    if (!node) return new TreeNode(value);
    if (value < node.value) node.left = insertNode(node.left, value);
    else if (value > node.value) node.right = insertNode(node.right, value);
    return node;
  };

  const deleteNode = (node, value) => {
    if (!node) return null;
    if (value < node.value) node.left = deleteNode(node.left, value);
    else if (value > node.value) node.right = deleteNode(node.right, value);
    else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      let minLargerNode = node.right;
      while (minLargerNode.left) minLargerNode = minLargerNode.left;
      node.value = minLargerNode.value;
      node.right = deleteNode(node.right, minLargerNode.value);
    }
    return node;
  };

  const searchNode = (node, value) => {
    if (!node) return false;
    if (value === node.value) return true;
    return value < node.value ? searchNode(node.left, value) : searchNode(node.right, value);
  };

  const traverse = (node, type) => {
    if (!node) return [];
    if (type === "inorder")
      return [...traverse(node.left, type), node.value, ...traverse(node.right, type)];
    if (type === "preorder")
      return [node.value, ...traverse(node.left, type), ...traverse(node.right, type)];
    if (type === "postorder")
      return [...traverse(node.left, type), ...traverse(node.right, type), node.value];
    return [];
  };

  const handleInsert = () => {
    if (!input) return;
    const newVal = parseInt(input);
    const updatedRoot = insertNode(root, newVal);
    setRoot(updatedRoot);
    setInput("");
    setLog(`✅ Inserted ${newVal}`);
  };

  const handleDelete = () => {
    if (!input) return;
    const newVal = parseInt(input);
    const updatedRoot = deleteNode(root, newVal);
    setRoot(updatedRoot);
    setInput("");
    setLog(`🗑️ Deleted ${newVal}`);
  };

  const handleSearch = () => {
    const found = searchNode(root, parseInt(input));
    setLog(found ? `🔍 Value ${input} found.` : `❌ Value ${input} not found.`);
  };

  const handleTraverse = (type) => {
    const result = traverse(root, type);
    setLog(`${type.toUpperCase()} Traversal: ${result.join(" → ")}`);
  };

  const getTreeCoordinates = (node, depth = 0, xMin = 0, xMax = 100) => {
    if (!node) return [];
    const x = (xMin + xMax) / 2;
    const y = depth * 150 + 50;
    node.x = x;
    node.y = y;
    return [
      [node, node.left, node.right],
      ...getTreeCoordinates(node.left, depth + 1, xMin, x),
      ...getTreeCoordinates(node.right, depth + 1, x, xMax),
    ];
  };

  const nodes = getTreeCoordinates(root);

  return (
    <div className="bst-container">
      <h1>🌳 Binary Search Tree Visualizer</h1>
      <div className="controls">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a number"
        />
        <button onClick={handleInsert}>Insert</button>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleSearch}>Search</button>
        <button onClick={() => handleTraverse("inorder")}>Inorder</button>
        <button onClick={() => handleTraverse("preorder")}>Preorder</button>
        <button onClick={() => handleTraverse("postorder")}>Postorder</button>
      </div>
      <div className="tree-wrapper">
        <svg className="tree-svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet">
          {nodes.map(([parent, left, right], i) => (
            <g key={i}>
              {left && (
                <line
                  x1={parent.x}
                  y1={parent.y}
                  x2={left.x}
                  y2={left.y}
                  stroke="#bbb"
                  strokeWidth="2"
                />
              )}
              {right && (
                <line
                  x1={parent.x}
                  y1={parent.y}
                  x2={right.x}
                  y2={right.y}
                  stroke="#bbb"
                  strokeWidth="2"
                />
              )}
            </g>
          ))}
          {nodes.map(([node]) => (
            <g key={node.value}>
              <circle cx={node.x} cy={node.y} r="30" className="node" />
              <text x={node.x} y={node.y + 8} className="node-text">
                {node.value}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div className="info-panel">
        <h3>📜 Info Panel</h3>
        <pre>{log}</pre>
        <h4>📜 Pseudocode for Operations</h4>
        <p><strong>Insert:</strong></p>
        <pre>
          {`
function insert(node, value):
  if node is null:
    return new TreeNode(value)
  if value < node.value:
    node.left = insert(node.left, value)
  else if value > node.value:
    node.right = insert(node.right, value)
  return node
          `}
        </pre>

        <p><strong>Delete:</strong></p>
        <pre>
          {`
function delete(node, value):
  if node is null:
    return null
  if value < node.value:
    node.left = delete(node.left, value)
  else if value > node.value:
    node.right = delete(node.right, value)
  else:
    if node.left is null:
      return node.right
    if node.right is null:
      return node.left
    minLargerNode = findMin(node.right)
    node.value = minLargerNode.value
    node.right = delete(node.right, minLargerNode.value)
  return node
          `}
        </pre>

        <p><strong>Search:</strong></p>
        <pre>
          {`
function search(node, value):
  if node is null:
    return false
  if value == node.value:
    return true
  if value < node.value:
    return search(node.left, value)
  return search(node.right, value)
          `}
        </pre>
      </div>
    </div>
  );
}

export default BSTVisualizer;
