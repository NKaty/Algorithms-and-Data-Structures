// Graph

// Implement the following methods on the Graph class

// addVertex
// This function should add a node to the graph and place a new key in
// the adjacency list with the value of an empty array.

// addEdge
// This function should add an edge between two nodes in the graph and place
// each value of the nodes in each array for the value of the node in the adjacency list.

// removeEdge
// This function should accept two nodes and remove the edge between them.
// It should modify the adjacency list to ensure that both values are not
// in each array for the two nodes which no longer contain the edge.

// removeVertex
// This function should remove the node in the array of nodes and also remove
// all edges that the removed node previously contained.

// depthFirstSearch
// This function should return an array of nodes visited using DFS.
// Do this iteratively (using a stack) and recursively.

// breadthFirstSearch
// This function should return an array of vertices visited using BFS.

// dijkstra
// This function should return an object with two properties, the first being
// the total distance and the second an array of nodes which create the shortest path.

// Additionally, the following methods are implemented on the class:
// findShortestDistance - finds shortest path from source to destination,
// returns an object with two properties, the first being the shortest path length
// and the second an array of nodes which create the shortest path.
// Method uses Breath First Search algorithm.

// travelingSalesmanProblemBF - finds the shortest possible route that visits
// every vertex exactly once and returns to the starting point.
// Brute Force approach - Time Complexity O(n!)

// travelingSalesmanProblemDP - finds the shortest possible route that visits
// every vertex exactly once and returns to the starting point.
// Dynamic programming approach (top-down - memoization) - Time complexity O(2^n * n^2)

const Queue = require('../queue/Queue');
const Stack = require('../stack/Stack');
const PriorityQueue = require('../priority-queue/Priority-queue');

class Graph {
  constructor() {
    if (new.target === Graph) {
      throw new TypeError('You cannot instantiate Graph class directly');
    }

    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(vertexOne, vertexTwo, weight) {
    throw new Error('You must implement your own addEdge method for undirected or directed graph.');
  }

  removeEdge(vertexOne, vertexTwo) {
    throw new Error('You must implement your own removeEdge method for undirected or directed graph.');
  }

  removeVertex(vertex) {
    if (this.adjacencyList[vertex]) {
      while (this.adjacencyList[vertex].length) {
        this.removeEdge(vertex, this.adjacencyList[vertex].pop());
      }

      delete this.adjacencyList[vertex];
    }
  }

  depthFirstSearchRecursive(start = Object.keys(this.adjacencyList)[0]) {
    const self = this;
    const result = [];
    const visited = {};

    function traverse(vertex) {
      if (!self.adjacencyList[vertex]) return;

      result.push(vertex);
      visited[vertex] = true;

      for (const linkedVertex of self.adjacencyList[vertex]) {
        if (!visited[linkedVertex.value]) traverse(linkedVertex.value);
      }
    }

    traverse(start);

    return result;
  }

  depthFirstSearchIterative(start = Object.keys(this.adjacencyList)[0]) {
    if (!this.adjacencyList[start]) return [];

    const stack = new Stack();
    const result = [];
    const visited = {};
    stack.push(start);
    visited[start] = true;

    while (stack.size) {
      const vertex = stack.pop();
      result.push(vertex);

      for (const linkedVertex of this.adjacencyList[vertex]) {
        if (!visited[linkedVertex.value]) {
          visited[linkedVertex.value] = true;
          stack.push(linkedVertex.value);
        }
      }
    }

    return result;
  }

  breadthFirstSearchIterative(start = Object.keys(this.adjacencyList)[0]) {
    if (!this.adjacencyList[start]) return [];

    const queue = new Queue();
    const result = [];
    const visited = {};
    queue.enqueue(start);
    visited[start] = true;

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

    return result;
  }

  // a modified version of BFS that stores predecessor of each vertex and its distance from source
  findShortestDistanceUtil(start, end) {
    if (!this.adjacencyList[start]) return [];

    const queue = new Queue();
    const visited = {};
    const prev = {};
    const dist = {};
    queue.enqueue(start);
    visited[start] = true;
    dist[start] = 0;
    prev[start] = -1;

    while (queue.size) {
      const vertex = queue.dequeue();

      for (const linkedVertex of this.adjacencyList[vertex]) {
        if (!visited[linkedVertex.value]) {
          visited[linkedVertex.value] = true;
          dist[linkedVertex.value] = dist[vertex] + 1;
          prev[linkedVertex.value] = vertex;
          queue.enqueue(linkedVertex.value);

          if (linkedVertex.value === end) return { prev, distance: dist[linkedVertex.value] };
        }
      }
    }

    return {};
  }

  findShortestDistance(start, end) {
    const { prev, distance } = this.findShortestDistanceUtil(start, end);

    if (!prev || !distance) return null;

    const path = [];
    let vertex = end;
    while (prev[vertex] !== -1) {
      path.push(vertex);
      vertex = prev[vertex];
    }

    path.push(vertex);

    return { path: path.reverse(), distance };
  }

  dijkstra(start, end) {
    const priorityQueue = new PriorityQueue();
    const prev = { [start]: [null, 0] };
    const visited = {};
    const path = [];
    priorityQueue.enqueue(start, 0);

    while (!priorityQueue.isEmpty()) {
      const { value: vertex, priority: weight } = priorityQueue.dequeue();
      visited[vertex] = true;

      for (const linkedVertex of this.adjacencyList[vertex]) {
        if (!visited[linkedVertex.value]) {
          const newWeight = weight + linkedVertex.weight;

          if (!prev[linkedVertex.value] || prev[linkedVertex.value][1] > newWeight) {
            prev[linkedVertex.value] = [vertex, newWeight];
            priorityQueue.changePriority(linkedVertex.value, newWeight);
          }
        }
      }
    }

    let pathVertex = end;

    while (pathVertex) {
      path.push(pathVertex);
      pathVertex = prev[pathVertex][0];
    }

    return { path: path.reverse(), distance: prev[end][1] };
  }

  buildAdjacencyMatrix(vertices = Object.keys(this.adjacencyList)) {
    const verticesObj = vertices.reduce((obj, vertex, index) => {
      obj[vertex] = index;
      return obj;
    }, {});

    const matrix = Array.from({ length: vertices.length },
      (row, i) => Array.from({ length: vertices.length },
        (elem, j) => i === j ? 0 : Infinity));

    for (let i = 0; i < vertices.length; i++) {
      for (let j = 0; j < this.adjacencyList[vertices[i]].length; j++) {
        matrix[i][verticesObj[this.adjacencyList[vertices[i]][j].value]] =
          this.adjacencyList[vertices[i]][j].weight;
      }
    }

    return { matrix, verticesObj };
  }

  // Traveling Salesman Problem
  // Brute Force approach
  travelingSalesmanProblemBF(vertex) {
    const self = this;
    const paths = [];
    const vertices = Object.keys(this.adjacencyList);
    const numberOfVertices = vertices.length;
    const start = this.adjacencyList[vertex] ? vertex : vertices[0];

    function findPaths(vertex, visited = {}, path = []) {
      const currentPath = [...path];
      const currentVisited = { ...visited };
      currentPath.push(vertex);
      currentVisited[vertex] = true;

      const unvisitedLinkedVertices = self.adjacencyList[vertex].filter((linkedVertex) => {
        return !visited[linkedVertex.value];
      });

      if (!unvisitedLinkedVertices.length &&
        currentPath.length === numberOfVertices &&
        self.adjacencyList[vertex].some((linkedVertex) => linkedVertex.value === start)) {
        currentPath.push(start);
        paths.push(currentPath);
      } else {
        for (const linkedVertex of unvisitedLinkedVertices) {
          findPaths(linkedVertex.value, currentVisited, currentPath);
        }
      }
    }

    findPaths(start);

    if (!paths.length) return { path: [], distance: null };

    let bestPath = [];
    let bestDistance = Infinity;
    const { matrix, verticesObj } = this.buildAdjacencyMatrix(vertices);

    for (const path of paths) {
      let currentDistance = 0;

      for (let i = 0; i < path.length - 1; i++) {
        currentDistance += matrix[verticesObj[path[i]]][verticesObj[path[i + 1]]];
      }

      if (currentDistance && bestDistance > currentDistance) {
        bestDistance = currentDistance;
        bestPath = path;
      }
    }

    return { path: bestPath, distance: bestDistance };
  }

  // Traveling Salesman Problem
  // Dynamic programming approach (top-down approach - memoization)
  travelingSalesmanProblemDP(vertex) {
    const vertices = Object.keys(this.adjacencyList);
    const numberOfVertices = vertices.length;
    const { matrix, verticesObj } = this.buildAdjacencyMatrix(vertices);
    const startIndex = verticesObj[vertex] || 0;
    const startState = 1 << startIndex;
    const VISITED_ALL_VERTICES = (1 << numberOfVertices) - 1;

    const memo = Array.from({ length: numberOfVertices },
      () => Array.from({ length: 1 << numberOfVertices },
        () => null));

    const prev = Array.from({ length: numberOfVertices },
      () => Array.from({ length: 1 << numberOfVertices },
        () => null));

    function findPath (state, position) {
      if (state === VISITED_ALL_VERTICES) return matrix[position][startIndex];

      if (memo[position][state]) return memo[position][state];

      let bestDistance = Infinity;
      let bestIndex = null;

      for (let indexOfVertex = 0; indexOfVertex < numberOfVertices; indexOfVertex++) {
        if ((state & (1 << indexOfVertex)) === 0) {
          const currentDistance = matrix[position][indexOfVertex] +
            findPath(state | (1 << indexOfVertex), indexOfVertex);

          if (currentDistance < bestDistance) {
            bestDistance = currentDistance;
            bestIndex = indexOfVertex;
          }
        }
      }

      memo[position][state] = bestDistance;
      prev[position][state] = bestIndex;

      return bestDistance;
    }

    const distance = findPath(startState, startIndex);

    if (distance === Infinity) return { path: [], distance: null };

    let path = [];
    let currentIndex = startIndex;
    let currentState = startState;

    while (true) {
      path.push(currentIndex);
      currentIndex = prev[currentIndex][currentState];
      if (currentIndex === null) break;
      currentState = currentState | (1 << currentIndex);
    }

    path.push(startIndex);

    path = path.map((item) => vertices[item]);

    return { path, distance };
  }
}

module.exports = Graph;
