import { GraphNode, GraphEdge } from '../types';

export interface ExampleGraph {
  name: string;
  description: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  hasCycle: boolean;
}

export const exampleGraphs: ExampleGraph[] = [
  {
    name: 'Simple DAG',
    description: 'A simple directed acyclic graph with 4 nodes',
    hasCycle: false,
    nodes: [
      { id: 'node-0', label: 'A', state: 'unvisited', inDegree: 0, position: { x: 150, y: 100 } },
      { id: 'node-1', label: 'B', state: 'unvisited', inDegree: 0, position: { x: 400, y: 100 } },
      { id: 'node-2', label: 'C', state: 'unvisited', inDegree: 0, position: { x: 150, y: 300 } },
      { id: 'node-3', label: 'D', state: 'unvisited', inDegree: 0, position: { x: 400, y: 300 } },
    ],
    edges: [
      { id: 'edge-0-2', source: 'node-0', target: 'node-2' },
      { id: 'edge-0-3', source: 'node-0', target: 'node-3' },
      { id: 'edge-1-3', source: 'node-1', target: 'node-3' },
    ],
  },
  {
    name: 'Course Prerequisites',
    description: 'University course dependency graph',
    hasCycle: false,
    nodes: [
      { id: 'node-0', label: 'CS101', state: 'unvisited', inDegree: 0, position: { x: 100, y: 100 } },
      { id: 'node-1', label: 'CS102', state: 'unvisited', inDegree: 0, position: { x: 300, y: 100 } },
      { id: 'node-2', label: 'CS201', state: 'unvisited', inDegree: 0, position: { x: 200, y: 250 } },
      { id: 'node-3', label: 'CS301', state: 'unvisited', inDegree: 0, position: { x: 100, y: 400 } },
      { id: 'node-4', label: 'CS302', state: 'unvisited', inDegree: 0, position: { x: 300, y: 400 } },
    ],
    edges: [
      { id: 'edge-0-2', source: 'node-0', target: 'node-2' },
      { id: 'edge-1-2', source: 'node-1', target: 'node-2' },
      { id: 'edge-2-3', source: 'node-2', target: 'node-3' },
      { id: 'edge-2-4', source: 'node-2', target: 'node-4' },
    ],
  },
  {
    name: 'Build Dependencies',
    description: 'Software build order example',
    hasCycle: false,
    nodes: [
      { id: 'node-0', label: 'main', state: 'unvisited', inDegree: 0, position: { x: 250, y: 400 } },
      { id: 'node-1', label: 'util', state: 'unvisited', inDegree: 0, position: { x: 100, y: 100 } },
      { id: 'node-2', label: 'core', state: 'unvisited', inDegree: 0, position: { x: 400, y: 100 } },
      { id: 'node-3', label: 'api', state: 'unvisited', inDegree: 0, position: { x: 100, y: 250 } },
      { id: 'node-4', label: 'db', state: 'unvisited', inDegree: 0, position: { x: 400, y: 250 } },
    ],
    edges: [
      { id: 'edge-1-3', source: 'node-1', target: 'node-3' },
      { id: 'edge-2-4', source: 'node-2', target: 'node-4' },
      { id: 'edge-3-0', source: 'node-3', target: 'node-0' },
      { id: 'edge-4-0', source: 'node-4', target: 'node-0' },
      { id: 'edge-1-2', source: 'node-1', target: 'node-2' },
    ],
  },
  {
    name: 'Linear Chain',
    description: 'Simple sequential dependency chain',
    hasCycle: false,
    nodes: [
      { id: 'node-0', label: 'A', state: 'unvisited', inDegree: 0, position: { x: 100, y: 200 } },
      { id: 'node-1', label: 'B', state: 'unvisited', inDegree: 0, position: { x: 200, y: 200 } },
      { id: 'node-2', label: 'C', state: 'unvisited', inDegree: 0, position: { x: 300, y: 200 } },
      { id: 'node-3', label: 'D', state: 'unvisited', inDegree: 0, position: { x: 400, y: 200 } },
      { id: 'node-4', label: 'E', state: 'unvisited', inDegree: 0, position: { x: 500, y: 200 } },
    ],
    edges: [
      { id: 'edge-0-1', source: 'node-0', target: 'node-1' },
      { id: 'edge-1-2', source: 'node-1', target: 'node-2' },
      { id: 'edge-2-3', source: 'node-2', target: 'node-3' },
      { id: 'edge-3-4', source: 'node-3', target: 'node-4' },
    ],
  },
  {
    name: '⚠️ Cyclic Graph',
    description: 'Graph with a cycle - topological sort impossible!',
    hasCycle: true,
    nodes: [
      { id: 'node-0', label: 'A', state: 'unvisited', inDegree: 0, position: { x: 200, y: 100 } },
      { id: 'node-1', label: 'B', state: 'unvisited', inDegree: 0, position: { x: 350, y: 200 } },
      { id: 'node-2', label: 'C', state: 'unvisited', inDegree: 0, position: { x: 200, y: 300 } },
      { id: 'node-3', label: 'D', state: 'unvisited', inDegree: 0, position: { x: 50, y: 200 } },
    ],
    edges: [
      { id: 'edge-0-1', source: 'node-0', target: 'node-1' },
      { id: 'edge-1-2', source: 'node-1', target: 'node-2' },
      { id: 'edge-2-3', source: 'node-2', target: 'node-3' },
      { id: 'edge-3-0', source: 'node-3', target: 'node-0' }, // Creates cycle!
    ],
  },
];
