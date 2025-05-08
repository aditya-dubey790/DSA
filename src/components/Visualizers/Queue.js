export default class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(item) {
    this.items.push(item);
  }

  dequeue() {
    return this.items.length === 0 ? "Underflow" : this.items.shift();
  }

  peek() {
    return this.items.length === 0 ? "No elements in Queue" : this.items[0];
  }

  clear() {
    this.items = [];
  }

  toArray() {
    return [...this.items];
  }
}
