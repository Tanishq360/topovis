import { GraphNode, GraphEdge } from '../types';

export function generateRandomDAG(nodeCount: number = 6): { nodes: GraphNode[], edges: GraphEdge[] } {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];

  // Create nodes
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      id: `node-${i}`,
      label: String.fromCharCode(65 + i), // A, B, C, etc.
      state: 'unvisited',
      inDegree: 0,
      position: {
        x: 150 + (i % 3) * 250,
        y: 100 + Math.floor(i / 3) * 200,
      },
    });
  }

  // Create edges ensuring DAG property (only from lower to higher index)
  const edgeCount = Math.floor(nodeCount * 1.5);
  const createdEdges = new Set<string>();

  for (let i = 0; i < edgeCount; i++) {
    const sourceIdx = Math.floor(Math.random() * (nodeCount - 1));
    const targetIdx = sourceIdx + 1 + Math.floor(Math.random() * (nodeCount - sourceIdx - 1));
    
    const edgeKey = `${sourceIdx}-${targetIdx}`;
    
    if (!createdEdges.has(edgeKey)) {
      createdEdges.add(edgeKey);
      edges.push({
        id: `edge-${sourceIdx}-${targetIdx}`,
        source: `node-${sourceIdx}`,
        target: `node-${targetIdx}`,
      });
    }
  }

  return { nodes, edges };
}

export function detectCycle(nodes: GraphNode[], edges: GraphEdge[]): boolean {
  const adjList = new Map<string, string[]>();
  const visited = new Set<string>();
  const recursionStack = new Set<string>();

  // Initialize adjacency list
  nodes.forEach(node => {
    adjList.set(node.id, []);
  });

  edges.forEach(edge => {
    adjList.get(edge.source)?.push(edge.target);
  });

  function hasCycleDFS(nodeId: string): boolean {
    visited.add(nodeId);
    recursionStack.add(nodeId);

    const neighbors = adjList.get(nodeId) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        if (hasCycleDFS(neighbor)) {
          return true;
        }
      } else if (recursionStack.has(neighbor)) {
        return true;
      }
    }

    recursionStack.delete(nodeId);
    return false;
  }

  for (const node of nodes) {
    if (!visited.has(node.id)) {
      if (hasCycleDFS(node.id)) {
        return true;
      }
    }
  }

  return false;
}

export function calculateInDegrees(nodes: GraphNode[], edges: GraphEdge[]): Record<string, number> {
  const inDegrees: Record<string, number> = {};
  
  nodes.forEach(node => {
    inDegrees[node.id] = 0;
  });

  edges.forEach(edge => {
    inDegrees[edge.target] = (inDegrees[edge.target] || 0) + 1;
  });

  return inDegrees;
}

// Removed - not needed as export is handled in App.tsx directly

export function importGraph(jsonString: string): { nodes: GraphNode[], edges: GraphEdge[] } | null {
  try {
    const data = JSON.parse(jsonString);
    if (data.nodes && data.edges && Array.isArray(data.nodes) && Array.isArray(data.edges)) {
      return data;
    }
  } catch (e) {
    console.error('Failed to import graph:', e);
  }
  return null;
}
