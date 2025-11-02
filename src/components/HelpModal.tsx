import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-dark-card border border-dark-border rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">
                  📚 TopoVis - Help & Instructions
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6 text-gray-300">
                <section>
                  <h3 className="text-lg font-bold text-blue-400 mb-2">
                    What is Topological Sorting?
                  </h3>
                  <p className="text-sm leading-relaxed">
                    Topological sorting is a linear ordering of vertices in a Directed Acyclic Graph (DAG) 
                    such that for every directed edge (u → v), vertex u comes before v in the ordering. 
                    It's commonly used in task scheduling, build systems, and dependency resolution.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-green-400 mb-2">
                    🟢 Kahn's Algorithm (BFS)
                  </h3>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Find all nodes with in-degree = 0</li>
                    <li>Add them to a queue</li>
                    <li>Process nodes one by one</li>
                    <li>Decrease in-degree of neighbors</li>
                    <li>Add new zero in-degree nodes to queue</li>
                    <li>If not all nodes processed → cycle exists!</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-purple-400 mb-2">
                    🟣 DFS-based Algorithm
                  </h3>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Start DFS from unvisited nodes</li>
                    <li>Explore all neighbors recursively</li>
                    <li>After exploring a node, push it to stack</li>
                    <li>Reverse the stack to get topological order</li>
                    <li>Detect cycles using recursion stack</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-yellow-400 mb-2">
                    🎮 How to Use
                  </h3>
                  <div className="text-sm space-y-2">
                    <p><strong>Add Nodes:</strong> Click "Add Node" button or click on canvas</p>
                    <p><strong>Add Edges:</strong> Drag from one node's handle to another</p>
                    <p><strong>Move Nodes:</strong> Click and drag nodes around</p>
                    <p><strong>Delete:</strong> Select node/edge and press Delete key</p>
                    <p><strong>Run Algorithm:</strong> Select algorithm and click "Play"</p>
                    <p><strong>Step Through:</strong> Use "Step Forward" to go through manually</p>
                    <p><strong>Adjust Speed:</strong> Use the speed slider (0.5x - 3x)</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-orange-400 mb-2">
                    🎨 Node Colors
                  </h3>
                  <div className="text-sm space-y-1">
                    <p><span className="text-gray-400">⚪ Gray:</span> Unvisited node</p>
                    <p><span className="text-green-400">🟢 Green:</span> Ready (in-degree = 0)</p>
                    <p><span className="text-yellow-400">🟡 Yellow:</span> Currently processing</p>
                    <p><span className="text-blue-400">🔵 Blue:</span> Processed/completed</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-red-400 mb-2">
                    ⚠️ Cycle Detection
                  </h3>
                  <p className="text-sm">
                    If you create a cycle (circular dependency), the algorithm will detect it and 
                    show a warning. Topological sorting is only possible for DAGs (Directed Acyclic Graphs).
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-teal-400 mb-2">
                    💡 Tips
                  </h3>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Start with "Generate Random DAG" to see an example</li>
                    <li>Try both algorithms on the same graph to compare</li>
                    <li>Watch the in-degree values update in real-time</li>
                    <li>Use Learning Mode (slower speed) to follow each step</li>
                    <li>Export your graph to save and share it</li>
                  </ul>
                </section>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={onClose}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition-colors"
                >
                  Got it!
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
