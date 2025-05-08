class Stack {
  constructor() {
    this.stack = [];
  }

  // Push element onto the stack
  push(element) {
    this.stack.push(element);
  }

  // Pop element from the stack
  pop() {
    if (this.isEmpty()) {
      return "Underflow"; // Stack is empty
    }
    return this.stack.pop();
  }

  // Peek the top element of the stack
  peek() {
    if (this.isEmpty()) {
      return "No elements in Stack";
    }
    return this.stack[this.stack.length - 1];
  }

  // Clear the stack
  clear() {
    this.stack = [];
  }

  // Check if the stack is empty
  isEmpty() {
    return this.stack.length === 0;
  }

  // Get the size of the stack
  size() {
    return this.stack.length;
  }

  // Convert the stack to an array (for visualization)
  toArray() {
    return this.stack;
  }
}

export default Stack;
