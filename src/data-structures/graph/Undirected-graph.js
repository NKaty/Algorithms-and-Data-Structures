// UndirectedGraph

// Implement the following methods on the UndirectedGraph class

// addEdge
// This function should add an edge between two nodes in the graph and place
// each value of the nodes in each array for the value of the node in the adjacency list.

// removeEdge
// This function should accept two nodes and remove the edge between them.
// It should modify the adjacency list to ensure that both values are not
// in each array for the two nodes which no longer contain the edge.

// hasCycle
// This function should return true if the graph contains a cycle or false if not.

const Graph = require('./Graph');

class UndirectedGraph extends Graph {
  addEdge(vertexOne, vertexTwo, weight = 0) {
    if (!this.adjacencyList[vertexOne]) this.adjacencyList[vertexOne] = [];
    if (!this.adjacencyList[vertexTwo]) this.adjacencyList[vertexTwo] = [];

    if (!this.adjacencyList[vertexOne].includes(vertexTwo)) {
      this.adjacencyList[vertexOne].push({ value: vertexTwo, weight });
    }
    if (!this.adjacencyList[vertexTwo].includes(vertexOne)) {
      this.adjacencyList[vertexTwo].push({ value: vertexOne, weight });
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

    if (this.adjacencyList[vertexTwo]) {
      for (let i = 0; i < this.adjacencyList[vertexTwo].length; i++) {
        if (this.adjacencyList[vertexTwo][i].value === vertexOne) {
          this.adjacencyList[vertexTwo].splice(i, 1);
        }
      }
    }
  }

  hasCycle() {
    const self = this;
    const visited = {};
    const start = Object.keys(this.adjacencyList)[0];

    function traverse(vertex, prevVertex) {
      visited[vertex] = true;

      for (const linkedVertex of self.adjacencyList[vertex]) {
        if (visited[linkedVertex.value] && linkedVertex.value !== prevVertex) return true;
        if (!visited[linkedVertex.value] && traverse(linkedVertex.value, vertex)) return true;
      }

      return false;
    }

    return traverse(start, null);
  }
}

const weightedGraph = new UndirectedGraph();

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
weightedGraph.addEdge('F', 'K', 4);
weightedGraph.addEdge('K', 'L', 3);
weightedGraph.addEdge('L', 'M', 5);
weightedGraph.addEdge('M', 'N', 4);
weightedGraph.addEdge('N', 'O', 2);
weightedGraph.addEdge('O', 'P', 6);
weightedGraph.addEdge('P', 'D', 1);

console.log(weightedGraph.depthFirstSearchIterative('A'));
// [ 'A', 'D', 'P', 'O', 'N', 'M', 'L', 'K', 'F', 'E', 'C', 'B' ]
console.log(weightedGraph.depthFirstSearchRecursive('A'));
// [ 'A', 'B', 'C', 'D', 'E', 'F', 'K', 'L', 'M', 'N', 'O', 'P' ]
console.log(weightedGraph.breadthFirstSearchIterative('A'));
// [ 'A', 'B', 'C', 'D', 'E', 'F', 'P', 'K', 'O', 'L', 'N', 'M' ]
console.log(weightedGraph.findShortestDistance('A', 'M'));
// { path: [ 'A', 'B', 'F', 'K', 'L', 'M' ], distance: 5 }
console.log(weightedGraph.dijkstra('A', 'M'));
// { path: [ 'A', 'C', 'F', 'K', 'L', 'M' ], distance: 18 }
console.log(weightedGraph.hasCycle()); // true
console.log(weightedGraph.travelingSalesmanProblemBF());
// { path: [ 'A', 'C', 'B', 'E', 'F', 'K', 'L', 'M', 'N', 'O', 'P', 'D', 'A' ], distance: 45 }
console.log(weightedGraph.travelingSalesmanProblemDP());
// { path: [ 'A', 'C', 'B', 'E', 'F', 'K', 'L', 'M', 'N', 'O', 'P', 'D', 'A' ], distance: 45 }
