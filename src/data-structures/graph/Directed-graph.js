// DirectedGraph

// Implement the following methods on the DirectedGraph class

// addEdge
// This function should add an edge between two nodes in the graph and place
// each value of the nodes in each array for the value of the node in the adjacency list.

// removeEdge
// This function should accept two nodes and remove the edge between them.
// It should modify the adjacency list to ensure that both values are not
// in each array for the two nodes which no longer contain the edge.

// hasCycle
// This function should return true if the graph contains a cycle or false if not.

// Additionally, the following methods are implemented on the class:
// breadthFirstSearchForAllVertices - returns an array of all vertices
// visited using BFS regardless of the vertex to start with

// depthFirstSearchForAllVertices - returns an array of all vertices
// visited using DFS regardless of the vertex to start with

// topologicalSort - returns an array of vertices in a specific order, based on
// the interconnectedness of the edges. For two vertices x and y and a directed edge (x, y),
// the vertex x is ordered to come before the vertex y.

const Graph = require('./Graph');
const Queue = require('../queue/Queue');

class DirectedGraph extends Graph {
  addEdge(vertexOne, vertexTwo, weight = 0) {
    if (!this.adjacencyList[vertexOne]) this.adjacencyList[vertexOne] = [];
    if (!this.adjacencyList[vertexTwo]) this.adjacencyList[vertexTwo] = [];

    if (!this.adjacencyList[vertexOne].includes(vertexTwo)) {
      this.adjacencyList[vertexOne].push({ value: vertexTwo, weight });
    }
  }

  removeEdge(vertexOne, vertexTwo) {
    if (this.adjacencyList[vertexOne]) {
      for (let i = 0; i < this.adjacencyList[vertexOne].length; i++) {
        if (this.adjacencyList[vertexOne][i].value === vertexTwo) {
          this.adjacencyList[vertexOne].splice(i, 1);
        }
      }
    }
  }

  breadthFirstSearchForAllVertices() {
    const queue = new Queue();
    const result = [];
    const visited = {};
    const graphVertices = Object.keys(this.adjacencyList);

    for (const vertex of graphVertices) {
      if (!visited[vertex]) {
        queue.enqueue(vertex);
        visited[vertex] = true;

        while (queue.size) {
          const vertex = queue.dequeue();
          result.push(vertex);

          for (const linkedVertex of this.adjacencyList[vertex]) {
            if (!visited[linkedVertex.value]) {
              visited[linkedVertex.value] = true;
              queue.enqueue(linkedVertex.value);
            }
          }
        }
      }
    }

    return result;
  }

  depthFirstSearchForAllVertices() {
    const self = this;
    const result = [];
    const visited = {};
    const graphVertices = Object.keys(this.adjacencyList);

    function traverse(vertex) {
      if (!visited[vertex]) {
        result.push(vertex);
        visited[vertex] = true;

        for (const linkedVertex of self.adjacencyList[vertex]) {
          if (!visited[linkedVertex.value]) traverse(linkedVertex.value);
        }
      }
    }

    for (const vertex of graphVertices) {
      traverse(vertex);
    }

    return result;
  }

  hasCycle() {
    const self = this;
    const graphVertices = Object.keys(this.adjacencyList);
    const recStack = {};
    const visited = {};

    function traverse(vertex) {
      if (!visited[vertex]) {
        visited[vertex] = true;
        recStack[vertex] = true;

        for (const linkedVertex of self.adjacencyList[vertex]) {
          if (recStack[linkedVertex.value]) return true;
          if (!visited[linkedVertex.value] && traverse(linkedVertex.value)) return true;
        }
      }

      recStack[vertex] = false;

      return false;
    }

    for (const vertex of graphVertices) {
      if (traverse(vertex)) return true;
    }

    return false;
  }

  topologicalSort() {
    if (this.hasCycle()) throw new Error('The graph contains a cycle.');

    const self = this;
    const graphVertices = Object.keys(this.adjacencyList);
    const sortedVertices = [];
    const visited = {};

    function traverse(vertex) {
      if (!visited[vertex]) {
        visited[vertex] = true;

        for (const linkedVertex of self.adjacencyList[vertex]) {
          if (!visited[linkedVertex.value]) traverse(linkedVertex.value);
        }

        sortedVertices.push(vertex);
      }
    }

    for (const vertex of graphVertices) {
      traverse(vertex);
    }

    return sortedVertices.reverse();
  }
}

const weightedGraph = new DirectedGraph();

weightedGraph.addEdge('A', 'B', 7);
weightedGraph.addEdge('A', 'C', 3);
weightedGraph.addEdge('C', 'B', 1);
weightedGraph.addEdge('C', 'D', 2);
weightedGraph.addEdge('B', 'D', 2);
weightedGraph.addEdge('B', 'E', 6);
weightedGraph.addEdge('D', 'E', 4);
weightedGraph.addEdge('C', 'F', 3);
weightedGraph.addEdge('F', 'D', 4);
weightedGraph.addEdge('F', 'B', 6);
weightedGraph.addEdge('F', 'E', 3);
weightedGraph.addEdge('A', 'D', 7);
weightedGraph.addEdge('K', 'L', 3);
weightedGraph.addEdge('L', 'M', 5);
weightedGraph.addEdge('M', 'N', 4);
weightedGraph.addEdge('N', 'O', 2);
weightedGraph.addEdge('O', 'P', 6);
weightedGraph.addEdge('P', 'D', 1);

console.log(weightedGraph.hasCycle()); // false
console.log(weightedGraph.depthFirstSearchIterative());
// [ 'A', 'D', 'E', 'C', 'F', 'B' ]
console.log(weightedGraph.depthFirstSearchRecursive());
// [ 'A', 'B', 'D', 'E', 'C', 'F' ]
console.log(weightedGraph.breadthFirstSearchIterative());
// [ 'A', 'B', 'C', 'D', 'E', 'F' ]
console.log(weightedGraph.breadthFirstSearchForAllVertices());
// [ 'A', 'B', 'C', 'D', 'E', 'F', 'K', 'L', 'M', 'N', 'O', 'P' ]
console.log(weightedGraph.depthFirstSearchForAllVertices());
// [ 'A', 'B', 'D', 'E', 'C', 'F', 'K', 'L', 'M', 'N', 'O', 'P' ]
console.log(weightedGraph.topologicalSort());
// [ 'K', 'L', 'M', 'N', 'O', 'P', 'A', 'C', 'F', 'B', 'D', 'E' ]

weightedGraph.addEdge('F', 'K', 4);
weightedGraph.addEdge('E', 'B', 8);
weightedGraph.addEdge('D', 'A', 5);

console.log(weightedGraph.hasCycle()); // true
console.log(weightedGraph.depthFirstSearchIterative());
// [ 'A', 'D', 'E', 'C', 'F', 'K', 'L', 'M', 'N', 'O', 'P', 'B' ]
console.log(weightedGraph.depthFirstSearchRecursive());
// [ 'A', 'B', 'D', 'E', 'C', 'F', 'K', 'L', 'M', 'N', 'O', 'P' ]
console.log(weightedGraph.breadthFirstSearchIterative());
// [ 'A', 'B', 'C', 'D', 'E', 'F', 'K', 'L', 'M', 'N', 'O', 'P' ]
console.log(weightedGraph.findShortestDistance('A', 'P'));
// { path: [ 'A', 'C', 'F', 'K', 'L', 'M', 'N', 'O', 'P' ], distance: 8 }
console.log(weightedGraph.dijkstra('A', 'P'));
// { path: [ 'A', 'C', 'F', 'K', 'L', 'M', 'N', 'O', 'P' ], distance: 30 }
console.log(weightedGraph.travelingSalesmanProblemBF());
// { path: [], distance: null }
console.log(weightedGraph.travelingSalesmanProblemDP());
// { path: [], distance: null }

weightedGraph.addEdge('D', 'C', 4);
weightedGraph.addEdge('C', 'E', 3);
weightedGraph.addEdge('B', 'F', 1);

console.log(weightedGraph.travelingSalesmanProblemBF());
// { path: [ 'A', 'C', 'E', 'B', 'F', 'K', 'L', 'M', 'N', 'O', 'P', 'D', 'A' ], distance: 45 }
console.log(weightedGraph.travelingSalesmanProblemDP());
// { path: [ 'A', 'C', 'E', 'B', 'F', 'K', 'L', 'M', 'N', 'O', 'P', 'D', 'A' ], distance: 45 }
console.log(weightedGraph.topologicalSort()); // Error
