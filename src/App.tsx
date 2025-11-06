import { useState, useCallback, useEffect, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { CustomNode } from './components/CustomNode';
import { ControlPanel } from './components/ControlPanel';
import { LogPanel } from './components/LogPanel';
import { HelpModal } from './components/HelpModal';
import { TopologicalOrderDisplay } from './components/TopologicalOrderDisplay';
import { DataStructurePanel } from './components/DataStructurePanel';
import { AlgorithmInfo } from './components/AlgorithmInfo';
import { Algorithm, AlgorithmStep, GraphNode, GraphEdge } from './types';
import { kahnsAlgorithm } from './algorithms/kahn';
import { dfsTopologicalSort } from './algorithms/dfs';
import { generateRandomDAG, detectCycle, calculateInDegrees, importGraph } from './utils/graphUtils';
import { exampleGraphs } from './utils/exampleGraphs';

const nodeTypes = {
  custom: CustomNode,
};

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [algorithm, setAlgorithm] = useState<Algorithm>('kahn');
  const [steps, setSteps] = useState<AlgorithmStep[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [showHelp, setShowHelp] = useState(false);
  const [topologicalOrder, setTopologicalOrder] = useState<string[]>([]);
  const [nodeCounter, setNodeCounter] = useState(0);
  const [deleteMode, setDeleteMode] = useState(false);

  const nodeLabels = useMemo(() => {
    const map = new Map<string, string>();
    nodes.forEach((node) => {
      if (node.data.label) {
        map.set(node.id, node.data.label);
      }
    });
    return map;
  }, [nodes]);

  // Reset to initial state
  const handleReset = useCallback(() => {
    setIsPlaying(false);
    setCurrentStep(-1);
    setSteps([]);
    setTopologicalOrder([]);
    
    // Reset all nodes to unvisited state
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          state: 'unvisited',
          showInDegree: true,
        },
      }))
    );

    // Calculate and set in-degrees
    const inDegrees = calculateInDegrees(
      nodes.map(n => ({ 
        id: n.id, 
        label: n.data.label, 
        state: 'unvisited', 
        inDegree: 0,
        position: n.position 
      })),
      edges.map(e => ({ id: e.id, source: e.source, target: e.target }))
    );

    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          inDegree: inDegrees[node.id] || 0,
        },
      }))
    );
  }, [nodes, edges, setNodes]);

  // Run the selected algorithm
  const runAlgorithm = useCallback(() => {
    // Check for cycle
    const graphNodes: GraphNode[] = nodes.map(n => ({
      id: n.id,
      label: n.data.label,
      state: 'unvisited',
      inDegree: 0,
      position: n.position,
    }));

    const graphEdges: GraphEdge[] = edges.map(e => ({
      id: e.id,
      source: e.source,
      target: e.target,
    }));

    const hasCycle = detectCycle(graphNodes, graphEdges);
    
    if (hasCycle) {
      alert('⚠️ The graph contains a cycle. Topological Sort not possible for graphs with cycles!');
      return;
    }

    // Run the algorithm
    const algorithmSteps = algorithm === 'kahn' 
      ? kahnsAlgorithm(graphNodes, graphEdges)
      : dfsTopologicalSort(graphNodes, graphEdges);

    setSteps(algorithmSteps);
    setCurrentStep(-1);
    setIsPlaying(true);
  }, [nodes, edges, algorithm]);

  // Apply animation step
  const applyStep = useCallback((step: AlgorithmStep) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (step.nodeId === node.id) {
          const newState = 
            step.type === 'select' || step.type === 'explore' ? 'processing' :
            step.type === 'remove' || step.type === 'push' ? 'processed' :
            node.data.state;

          return {
            ...node,
            data: {
              ...node.data,
              state: newState,
              inDegree: step.inDegrees?.[node.id] ?? node.data.inDegree,
            },
          };
        }

        // Update in-degrees for all nodes
        if (step.inDegrees && step.inDegrees[node.id] !== undefined) {
          return {
            ...node,
            data: {
              ...node.data,
              inDegree: step.inDegrees[node.id],
              state: step.inDegrees[node.id] === 0 && node.data.state === 'unvisited' ? 'ready' : node.data.state,
            },
          };
        }

        return node;
      })
    );

    if (step.result) {
      setTopologicalOrder(step.result);
    }
  }, [setNodes]);

  // Step forward
  const stepForward = useCallback(() => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      applyStep(steps[nextStep]);
    } else if (currentStep === -1 && steps.length === 0) {
      runAlgorithm();
    }
  }, [currentStep, steps, applyStep, runAlgorithm]);

  // Handle node click in delete mode
  const handleNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    if (deleteMode) {
      event.stopPropagation();
      setNodes((nds) => nds.filter((n) => n.id !== node.id));
      setEdges((eds) => eds.filter((e) => e.source !== node.id && e.target !== node.id));
    }
  }, [deleteMode, setNodes, setEdges]);

  // Handle edge click in delete mode
  const handleEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    if (deleteMode) {
      event.stopPropagation();
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }
  }, [deleteMode, setEdges]);

  // Toggle delete mode
  const toggleDeleteMode = useCallback(() => {
    setDeleteMode((prev) => !prev);
  }, []);

  // Step backward
  const stepBackward = useCallback(() => {
    if (currentStep > 0) {
      // Reset to initial state first
      setNodes((nds) =>
        nds.map((node) => ({
          ...node,
          data: {
            ...node.data,
            state: 'unvisited',
          },
        }))
      );

      // Calculate and set in-degrees
      const inDegrees = calculateInDegrees(
        nodes.map(n => ({ 
          id: n.id, 
          label: n.data.label, 
          state: 'unvisited', 
          inDegree: 0,
          position: n.position 
        })),
        edges.map(e => ({ id: e.id!, source: e.source!, target: e.target! }))
      );

      setNodes((nds) =>
        nds.map((node) => ({
          ...node,
          data: {
            ...node.data,
            inDegree: inDegrees[node.id] || 0,
          },
        }))
      );

      // Replay steps up to previous step
      for (let i = 0; i < currentStep - 1; i++) {
        applyStep(steps[i]);
      }
      
      setCurrentStep(currentStep - 1);
    } else if (currentStep === 0) {
      // Just reset to initial state
      setCurrentStep(-1);
      setNodes((nds) =>
        nds.map((node) => ({
          ...node,
          data: {
            ...node.data,
            state: 'unvisited',
          },
        }))
      );
    }
  }, [currentStep, steps, applyStep, nodes, edges, setNodes]);

  // Auto-play effect
  useEffect(() => {
    if (!isPlaying || currentStep >= steps.length - 1) {
      if (currentStep >= steps.length - 1 && steps.length > 0) {
        setIsPlaying(false);
      }
      return;
    }

    const delay = 1000 / speed;
    const timer = setTimeout(() => {
      stepForward();
    }, delay);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps, speed, stepForward]);

  // Add node
  const handleAddNode = useCallback(() => {
    const newNode: Node = {
      id: `node-${nodeCounter}`,
      type: 'custom',
      position: {
        x: Math.random() * 500 + 100,
        y: Math.random() * 300 + 100,
      },
      data: {
        label: String.fromCharCode(65 + (nodeCounter % 26)),
        state: 'unvisited',
        inDegree: 0,
        showInDegree: true,
      },
    };

    setNodes((nds) => [...nds, newNode]);
    setNodeCounter(nodeCounter + 1);
  }, [nodeCounter, setNodes]);

  // Load example graph
  const handleLoadExample = useCallback((index: number) => {
    const example = exampleGraphs[index];
    if (!example) return;

    const inDegrees = calculateInDegrees(example.nodes, example.edges);

    const flowNodes: Node[] = example.nodes.map((node) => ({
      id: node.id,
      type: 'custom',
      position: node.position,
      data: {
        label: node.label,
        state: 'unvisited',
        inDegree: inDegrees[node.id] || 0,
        showInDegree: true,
      },
    }));

    const flowEdges: Edge[] = example.edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      animated: false,
      style: { stroke: '#64748b' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#64748b' },
    }));

    setNodes(flowNodes);
    setEdges(flowEdges);
    setNodeCounter(example.nodes.length);
    
    // Reset animation state
    setIsPlaying(false);
    setCurrentStep(-1);
    setSteps([]);
    setTopologicalOrder([]);
  }, [setNodes, setEdges]);

  // Generate random DAG
  const handleGenerateRandom = useCallback(() => {
    const { nodes: randomNodes, edges: randomEdges } = generateRandomDAG(6);
    
    const inDegrees = calculateInDegrees(randomNodes, randomEdges);

    const flowNodes: Node[] = randomNodes.map((node) => ({
      id: node.id,
      type: 'custom',
      position: node.position,
      data: {
        label: node.label,
        state: 'unvisited',
        inDegree: inDegrees[node.id] || 0,
        showInDegree: true,
      },
    }));

    const flowEdges: Edge[] = randomEdges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      animated: false,
      style: { stroke: '#64748b' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#64748b' },
    }));

    setNodes(flowNodes);
    setEdges(flowEdges);
    setNodeCounter(randomNodes.length);
    
    // Reset animation state
    setIsPlaying(false);
    setCurrentStep(-1);
    setSteps([]);
    setTopologicalOrder([]);
  }, [setNodes, setEdges]);

  // Handle edge connection
  const onConnect = useCallback(
    (connection: Connection) => {
      if (deleteMode) return; // Don't add edges in delete mode
      setEdges((eds) => {
        const newEdge: Edge = {
          ...connection,
          id: `e${connection.source}-${connection.target}`,
          animated: false,
          style: { stroke: '#64748b' },
          markerEnd: { type: MarkerType.ArrowClosed, color: '#64748b' },
        } as Edge;
        
        // Update in-degrees after adding edge
        setTimeout(() => {
          const inDegrees = calculateInDegrees(
            nodes.map(n => ({
              id: n.id,
              label: n.data.label,
              state: 'unvisited',
              inDegree: 0,
              position: n.position,
            })),
            [...eds, newEdge].map(e => ({ id: e.id!, source: e.source!, target: e.target! }))
          );

          setNodes((nds) =>
            nds.map((node) => ({
              ...node,
              data: {
                ...node.data,
                inDegree: inDegrees[node.id] || 0,
              },
            }))
          );
        }, 0);
        
        return addEdge(newEdge, eds);
      });
    },
    [setEdges, nodes, edges, setNodes, deleteMode]
  );

  // Handle export
  const handleExport = useCallback(() => {
    const graphData = {
      nodes: nodes.map(n => ({
        id: n.id,
        label: n.data.label,
        state: 'unvisited',
        inDegree: 0,
        position: n.position,
      })),
      edges: edges.map(e => ({
        id: e.id,
        source: e.source,
        target: e.target,
      })),
    };

    const json = JSON.stringify(graphData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'topovis-graph.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [nodes, edges]);

  // Handle import
  const handleImport = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = event.target?.result as string;
          const data = importGraph(json);
          
          if (data) {
            const inDegrees = calculateInDegrees(data.nodes, data.edges);

            const flowNodes: Node[] = data.nodes.map((node) => ({
              id: node.id,
              type: 'custom',
              position: node.position,
              data: {
                label: node.label,
                state: 'unvisited',
                inDegree: inDegrees[node.id] || 0,
                showInDegree: true,
              },
            }));

            const flowEdges: Edge[] = data.edges.map((edge) => ({
              id: edge.id,
              source: edge.source,
              target: edge.target,
              animated: false,
              style: { stroke: '#64748b' },
              markerEnd: { type: MarkerType.ArrowClosed, color: '#64748b' },
            }));

            setNodes(flowNodes);
            setEdges(flowEdges);
            handleReset();
          } else {
            alert('Invalid graph file format');
          }
        } catch (error) {
          alert('Failed to import graph');
        }
      };
      reader.readAsText(file);
    };
    
    input.click();
  }, [setNodes, setEdges, handleReset]);

  return (
    <div className="h-screen flex flex-col bg-dark-bg">
      {/* Header */}
      <header className="bg-dark-card border-b border-dark-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              🎓 TopoVis <span className="text-sm text-gray-400 font-normal ml-2">Interactive Topological Sorting Visualizer</span>
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex gap-3 p-3 overflow-hidden">
        {/* Left Panel - Controls */}
        <div className="w-72 flex-shrink-0 overflow-y-auto">
          <ControlPanel
            algorithm={algorithm}
            isPlaying={isPlaying}
            speed={speed}
            deleteMode={deleteMode}
            onAlgorithmChange={setAlgorithm}
            onPlay={() => {
              if (steps.length === 0) {
                runAlgorithm();
              } else {
                setIsPlaying(true);
              }
            }}
            onPause={() => setIsPlaying(false)}
            onReset={handleReset}
            onStepForward={stepForward}
            onStepBackward={stepBackward}
            onSpeedChange={setSpeed}
            onAddNode={handleAddNode}
            onGenerateRandom={handleGenerateRandom}
            onLoadExample={handleLoadExample}
            onExport={handleExport}
            onImport={handleImport}
            onHelp={() => setShowHelp(true)}
            onToggleDeleteMode={toggleDeleteMode}
            disabled={nodes.length === 0}
            canStepBack={currentStep > -1}
          />
        </div>

        {/* Center Panel - Graph Canvas */}
        <div className="flex-1 flex flex-col gap-3 min-w-0">
          <div className="flex-1 bg-dark-card border border-dark-border rounded-lg overflow-hidden min-h-0">
            <ReactFlow
              nodes={nodes.map(node => ({
                ...node,
                data: {
                  ...node.data,
                  deleteMode,
                },
              }))}
              edges={edges.map(edge => ({
                ...edge,
                style: {
                  ...edge.style,
                  cursor: deleteMode ? 'pointer' : 'default',
                },
                className: deleteMode ? 'hover:!stroke-red-500 hover:!stroke-[3px] transition-all' : '',
              }))}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={handleNodeClick}
              onEdgeClick={handleEdgeClick}
              nodeTypes={nodeTypes}
              fitView
              minZoom={0.5}
              maxZoom={2}
            >
              <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#334155" />
              <Controls />
            </ReactFlow>
          </div>

          {/* Bottom - Topological Order Display */}
          <TopologicalOrderDisplay order={topologicalOrder} nodeLabels={nodeLabels} />
        </div>

        {/* Right Panel - Data Structure, Log & Algorithm Info - SCROLLABLE */}
        <div className="w-80 flex-shrink-0 overflow-y-auto">
          <div className="flex flex-col gap-3">
            {/* Data Structure Visualization */}
            <div className="h-52">
              <DataStructurePanel
                algorithm={algorithm}
                queue={currentStep >= 0 && steps[currentStep]?.queue ? steps[currentStep].queue : []}
                stack={currentStep >= 0 && steps[currentStep]?.stack ? steps[currentStep].stack : []}
                nodeLabels={nodeLabels}
              />
            </div>

            {/* Log Panel - Fixed height */}
            <div className="h-96">
              <LogPanel
                steps={steps}
                currentStep={currentStep}
              />
            </div>

            {/* Algorithm Info - Fixed height */}
            <div className="h-80">
              <AlgorithmInfo algorithm={algorithm} />
            </div>
          </div>
        </div>
      </div>

      {/* Help Modal */}
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </div>
  );
}

export default App;
