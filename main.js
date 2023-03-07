// LinkedList class / factory, which will represent the full list.
const nodeFactory = (data = null, nextNode = null, previousNode = null) => {
  return { data, nextNode, previousNode };
};

const linkedListFactory = (node = null) => {
  let head = node;
  let tail = null;

  return {
    head,
    tail,

    size() {
      let count = 0;
      let node = head;
      while (node) {
        count++;
        node = node.nextNode;
      }
      return count;
    },
  };
};

let node1 = nodeFactory(1);
let node2 = nodeFactory(2);
let node3 = nodeFactory(3);
node1.nextNode = node2;
node2.nextNode = node3;

let list = linkedListFactory(node1);
let listSize = list.size();
let listHead = list.head;
let listTail = list.tail;
console.log(list);
console.log(listSize);
console.log(listHead);
