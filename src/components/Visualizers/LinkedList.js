class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.address = Node.generateAddress(); // Assign a unique address to each node
  }

  static generateAddress() {
    return `0x${Math.floor(Math.random() * 10000).toString(16)}`;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertAtHead(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }

  insertAtTail(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  insertAtPosition(data, position) {
    if (position === 0) {
      this.insertAtHead(data);
      return;
    }

    const newNode = new Node(data);
    let current = this.head;
    let previous = null;
    let index = 0;

    while (index < position && current) {
      previous = current;
      current = current.next;
      index++;
    }

    if (previous) {
      previous.next = newNode;
      newNode.next = current;
    }
  }

  deleteAtHead() {
    if (this.head) {
      this.head = this.head.next;
    }
  }

  deleteAtTail() {
    if (!this.head) return;

    if (!this.head.next) {
      this.head = null;
      return;
    }

    let current = this.head;
    let previous = null;

    while (current.next) {
      previous = current;
      current = current.next;
    }

    if (previous) {
      previous.next = null;
    }
  }

  deleteAtPosition(position) {
    if (position === 0) {
      this.deleteAtHead();
      return;
    }

    let current = this.head;
    let previous = null;
    let index = 0;

    while (index < position && current) {
      previous = current;
      current = current.next;
      index++;
    }

    if (previous && current) {
      previous.next = current.next;
    }
  }

  toArray() {
    const nodes = [];
    let current = this.head;
    while (current) {
      nodes.push({
        data: current.data,
        address: current.address,
        next: current.next ? current.next.address : null,
      });
      current = current.next;
    }
    return nodes;
  }
}

export default LinkedList;
