import { GraphNode, GraphEdge, AlgorithmStep } from '../types';

export function dfsTopologicalSort(
  nodes: GraphNode[],
  edges: GraphEdge[]
): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const nodeMap = new Map(nodes.map(n => [n.id, { ...n }]));
  const adjList = new Map<string, string[]>();
  const visited = new Set<string>();
  const recursionStack = new Set<string>();
  const stack: string[] = [];
  let hasCycle = false;

  // Initialize adjacency list
  nodes.forEach(node => {
    adjList.set(node.id, []);
  });

  edges.forEach(edge => {
    adjList.get(edge.source)?.push(edge.target);
  });

  steps.push({
    type: 'select',
    message: 'Starting DFS-based Topological Sort. Will explore all nodes and push to stack after visiting neighbors.',
    stack: [],
  });

  function dfs(nodeId: string): void {
    if (hasCycle) return;

    const nodeLabel = nodeMap.get(nodeId)?.label || nodeId;

    if (recursionStack.has(nodeId)) {
      hasCycle = true;
      steps.push({
        type: 'explore',
        nodeId,
        message: `⚠️ Cycle detected! Node ${nodeLabel} is already in recursion stack.`,
        stack: [...stack],
      });
      return;
    }

    if (visited.has(nodeId)) {
      return;
    }

    visited.add(nodeId);
    recursionStack.add(nodeId);

    steps.push({
      type: 'explore',
      nodeId,
      message: `Exploring node ${nodeLabel}...`,
      stack: [...stack],
    });

    const neighbors = adjList.get(nodeId) || [];

    if (neighbors.length > 0) {
      steps.push({
        type: 'select',
        nodeId,
        message: `Node ${nodeLabel} has ${neighbors.length} neighbor(s): ${neighbors.map(id => nodeMap.get(id)?.label).join(', ')}`,
        stack: [...stack],
      });

      for (const neighbor of neighbors) {
        const neighborLabel = nodeMap.get(neighbor)?.label || neighbor;
        
        steps.push({
          type: 'explore',
          nodeId: neighbor,
          message: `Visiting neighbor ${neighborLabel} from ${nodeLabel}`,
          stack: [...stack],
        });

        dfs(neighbor);
        
        if (hasCycle) return;
      }
    } else {
      steps.push({
        type: 'select',
        nodeId,
        message: `Node ${nodeLabel} has no unvisited neighbors.`,
        stack: [...stack],
      });
    }

    recursionStack.delete(nodeId);
    stack.push(nodeId);

    steps.push({
      type: 'push',
      nodeId,
      message: `Finished exploring ${nodeLabel}. Pushed to stack.`,
      stack: [...stack],
    });
  }

  // Visit all nodes
  for (const node of nodes) {
    if (!visited.has(node.id) && !hasCycle) {
      const nodeLabel = nodeMap.get(node.id)?.label || node.id;
      steps.push({
        type: 'select',
        nodeId: node.id,
        message: `Starting DFS from unvisited node ${nodeLabel}`,
        stack: [...stack],
      });
      dfs(node.id);
    }
  }

  if (hasCycle) {
    steps.push({
      type: 'complete',
      message: '⚠️ Cycle detected! Topological sort not possible.',
      result: [],
      stack: [...stack],
    });
  } else {
    // Reverse stack to get topological order
    const result = [...stack].reverse();
    
    steps.push({
      type: 'complete',
      message: `✓ DFS complete! Stack formed: ${stack.map(id => nodeMap.get(id)?.label).join(', ')}`,
      stack: [...stack],
    });

    steps.push({
      type: 'pop',
      message: `Topological Order (reversed stack): ${result.map(id => nodeMap.get(id)?.label).join(' → ')}`,
      result,
      stack: [],
    });
  }

  return steps;
}
