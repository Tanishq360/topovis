import { GraphNode, GraphEdge, AlgorithmStep } from '../types';

export function kahnsAlgorithm(
  nodes: GraphNode[],
  edges: GraphEdge[]
): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const nodeMap = new Map(nodes.map(n => [n.id, { ...n }]));
  const adjList = new Map<string, string[]>();
  const inDegree = new Map<string, number>();

  // Initialize adjacency list and in-degrees
  nodes.forEach(node => {
    adjList.set(node.id, []);
    inDegree.set(node.id, 0);
  });

  edges.forEach(edge => {
    adjList.get(edge.source)?.push(edge.target);
    inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1);
  });

  const queue: string[] = [];
  const result: string[] = [];

  // Find all nodes with in-degree 0
  nodes.forEach(node => {
    if (inDegree.get(node.id) === 0) {
      queue.push(node.id);
    }
  });

  steps.push({
    type: 'select',
    message: `Starting Kahn's Algorithm. Found ${queue.length} node(s) with in-degree 0: ${queue.map(id => nodeMap.get(id)?.label).join(', ')}`,
    inDegrees: Object.fromEntries(inDegree),
    queue: [...queue],
    codeLine: 6, // if in-degree[v] == 0: enqueue v
  });

  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    const nodeLabel = nodeMap.get(currentNode)?.label || currentNode;

    steps.push({
      type: 'select',
      nodeId: currentNode,
      message: `Processing node ${nodeLabel} (in-degree: 0)`,
      inDegrees: Object.fromEntries(inDegree),
      queue: [...queue],
      codeLine: 8, // u = dequeue from Q
    });

    result.push(currentNode);

    // Get neighbors and decrease their in-degrees
    const neighbors = adjList.get(currentNode) || [];
    
    neighbors.forEach(neighbor => {
      const currentInDegree = inDegree.get(neighbor)!;
      inDegree.set(neighbor, currentInDegree - 1);
      
      const neighborLabel = nodeMap.get(neighbor)?.label || neighbor;
      steps.push({
        type: 'update',
        nodeId: neighbor,
        message: `Updated in-degree of ${neighborLabel}: ${currentInDegree} → ${currentInDegree - 1}`,
        inDegrees: Object.fromEntries(inDegree),
        queue: [...queue],
        codeLine: 11, // decrease in-degree[v] by 1
      });

      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
        steps.push({
          type: 'select',
          nodeId: neighbor,
          message: `Added ${neighborLabel} to queue (in-degree now 0)`,
          inDegrees: Object.fromEntries(inDegree),
          queue: [...queue],
          codeLine: 13, // enqueue v to Q
        });
      }
    });

    steps.push({
      type: 'remove',
      nodeId: currentNode,
      message: `Removed node ${nodeLabel} from graph. Added to topological order.`,
      result: [...result],
      inDegrees: Object.fromEntries(inDegree),
      queue: [...queue],
      codeLine: 9, // add u to result
    });
  }

  // Check for cycle
  if (result.length !== nodes.length) {
    steps.push({
      type: 'complete',
      message: `⚠️ Cycle detected! Only processed ${result.length} out of ${nodes.length} nodes. Topological sort not possible.`,
      result,
      codeLine: 17, // return error (cycle detected)
    });
  } else {
    steps.push({
      type: 'complete',
      message: `✓ Topological sort complete! Order: ${result.map(id => nodeMap.get(id)?.label).join(' → ')}`,
      result,
      codeLine: 15, // return result (success)
    });
  }

  return steps;
}
