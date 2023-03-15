const nodeFactory = (value, next = null) => {
  return { value, next };
};

// LinkedList class / factory, which will represent the full list.
const linkedListFactory = () => {
  let head = null;
  let tail = null;
  let length = 0;

  return {
    // head returns the first node in the list
    head: () => head,
    // tail returns the last node in the list
    tail: () => tail,
    // size returns the total number of nodes in the list
    size: () => length,

    // append(value) adds a new node containing value to the end of the list
    append(value) {
      if (length === 0) {
        head = nodeFactory(value, head);
        tail = head;
        length++;
        return head;
      }

      let current = tail;
      current.next = nodeFactory(value, null);
      tail = current.next;
      length++;
      return head;
    },

    // prepend(value) adds a new node containing value to the start of the list
    prepend(value) {
      head = nodeFactory(value, head);
      if (!tail) {
        tail = head;
      }
      length++;
      return head;
    },

    // at(index) returns the node at the given index
    at(index) {
      if (index < 0 || index >= length) return null;

      let current = head;
      let currentIndex = 0;

      while (current) {
        if (currentIndex === index) {
          return current;
        }
        current = current.next;
        currentIndex++;
      }
      return;
    },
    // pop removes the last element from the list
    pop() {
      if (length === 0) {
        return null;
      } else if (length === 1) {
        let node = head;
        head = null;
        tail = null;
        length = 0;
        return node;
      } else {
        let current = head;
        let previous = null;

        while (current.next) {
          previous = current;
          current = current.next;
        }

        tail = previous;
        tail.next = null;
        length--;

        return current;
      }
    },
    // contains(value) returns true if the passed in value is in the list and otherwise returns false.
    contains(value) {
      let current = head;

      while (current) {
        if (current.value === value) {
          return true;
        }
        current = current.next;
      }

      return false;
    },
    // find(value) returns the index of the node containing value, or null if not found.
    find(value) {
      // set up an index counter and start the index of head at 0
      let currentIndex = 0;
      let current = head;

      while (current) {
        if (current.value === value) {
          return currentIndex;
        }
        current = current.next;
        currentIndex++;
      }

      return null;
    },
    // toString represents your LinkedList objects as strings, so you can print them out and preview them in the console. The format should be: ( value ) -> ( value ) -> ( value ) -> null
    toString() {
      let current = head;
      let listString = '';

      while (current) {
        listString += ` ( ${current.value} ) -> `;
        current = current.next;
      }

      listString += null;
      return listString;
    },

    // insertAt(value, index) that inserts a new node with the provided value at the given index.
    insertAt(value, index) {
      if (index < 0 || index > length) {
        return null; // or throw an error
      }

      if (index === 0) {
        return this.prepend(value);
      }

      if (index === length) {
        return this.append(value);
      }

      const prevNode = this.at(index - 1);
      const newNode = nodeFactory(value, prevNode.next);
      prevNode.next = newNode;
      length++;

      return newNode;
    },

    // removeAt(index) that removes the node at the given index.
    removeAt(index) {
      if (index < 0 || index > length) {
        return null; // or throw an error
      }

      let current = head;
      let previous = null;

      if (index === 0) {
        head = current.next;
        if (length === 1) {
          tail = null;
        }
      } else {
        let currentIndex = 0;
        while (currentIndex < index) {
          previous = current;
          current = current.next;
          currentIndex++;
        }
        previous.next = current.next;
        if (previous.next === null) {
          tail = previous;
        }
      }

      length--;
      return current;
    },
  };
};

const linkedList = linkedListFactory();

console.log('Append:', linkedList.append(1)); // { value: 1, next: null }
console.log('Append:', linkedList.append(2)); // { value: 2, next: null }
console.log('Append:', linkedList.append(3));
console.log('Append:', linkedList.append(4));

console.log('Prepend:', linkedList.prepend(0)); // { value: 0, next: { value: 1, next: [Object] } }

console.log('At:', linkedList.at(2)); // { value: 2, next: null }

console.log('Pop:', linkedList.pop()); // { value: 2, next: null }

console.log('Contains:', linkedList.contains(0)); // true
console.log('Contains:', linkedList.contains(2)); // false

console.log('Find:', linkedList.find(1)); // 1
console.log('Find:', linkedList.find(2)); // null

console.log('InsertAt:', linkedList.insertAt(2, 1)); // { value: 2, next: { value: 1, next: null } }

console.log('RemoveAt:', linkedList.removeAt(1)); // { value: 1, next: null }

console.log('Size:', linkedList.size()); // 2
console.log('Visual', linkedList.toString());
