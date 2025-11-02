export type NodeState = 'unvisited' | 'ready' | 'processing' | 'processed';

export interface GraphNode {
  id: string;
  label: string;
  state: NodeState;
  inDegree: number;
  position: { x: number; y: number };
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
}

export interface AlgorithmStep {
  type: 'select' | 'remove' | 'update' | 'explore' | 'push' | 'pop' | 'complete';
  nodeId?: string;
  edgeId?: string;
  message: string;
  inDegrees?: Record<string, number>;
  queue?: string[];  // For Kahn's algorithm
  stack?: string[];  // For DFS algorithm
  result?: string[];
}

export type Algorithm = 'kahn' | 'dfs';

export interface VisualizerState {
  nodes: GraphNode[];
  edges: GraphEdge[];
  algorithm: Algorithm;
  isPlaying: boolean;
  isPaused: boolean;
  currentStep: number;
  steps: AlgorithmStep[];
  topologicalOrder: string[];
  speed: number;
  showHelp: boolean;
}
