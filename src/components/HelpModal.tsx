import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Code, Lightbulb, Play, HelpCircle } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'theory' | 'algorithms' | 'features' | 'understanding' | 'tips';

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('theory');

  const tabs = [
    { id: 'theory' as TabType, icon: BookOpen, label: 'Theory' },
    { id: 'algorithms' as TabType, icon: Code, label: 'Algorithms' },
    { id: 'features' as TabType, icon: Play, label: 'How to Use' },
    { id: 'understanding' as TabType, icon: HelpCircle, label: 'Understanding' },
    { id: 'tips' as TabType, icon: Lightbulb, label: 'Tips & FAQs' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-dark-card border border-dark-border rounded-lg max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-dark-border flex items-center justify-between bg-gradient-to-r from-blue-900/20 to-purple-900/20">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  📚 TopoVis - Complete Guide
                </h2>
                <p className="text-sm text-gray-400 mt-1">Interactive Topological Sorting Visualizer for Students & Teachers</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-dark-border bg-dark-bg overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-900/10'
                        : 'text-gray-400 hover:text-gray-300 hover:bg-dark-card'
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* THEORY TAB */}
              {activeTab === 'theory' && (
                <div className="space-y-6 text-gray-300">
                  <section>
                    <h3 className="text-xl font-bold text-blue-400 mb-3">📖 What is Topological Sorting?</h3>
                    <div className="space-y-3 text-sm leading-relaxed">
                      <p><strong className="text-white">Topological sorting</strong> is a linear ordering of vertices in a <strong className="text-blue-300">Directed Acyclic Graph (DAG)</strong> where for every edge u → v, vertex u comes before v.</p>
                      <p>Think of it as arranging tasks where some must be completed before others. The topological order ensures all dependencies are respected.</p>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-green-400 mb-2">🎯 Real-World Applications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="bg-dark-bg p-3 rounded-lg"><p className="font-semibold text-white mb-1">📚 Course Prerequisites</p><p className="text-gray-400">Must take Calculus I before Calculus II</p></div>
                      <div className="bg-dark-bg p-3 rounded-lg"><p className="font-semibold text-white mb-1">🏗️ Build Systems</p><p className="text-gray-400">Compile dependencies before main program</p></div>
                      <div className="bg-dark-bg p-3 rounded-lg"><p className="font-semibold text-white mb-1">👕 Getting Dressed</p><p className="text-gray-400">Put on socks before shoes!</p></div>
                      <div className="bg-dark-bg p-3 rounded-lg"><p className="font-semibold text-white mb-1">📦 Package Management</p><p className="text-gray-400">Install dependencies in correct order</p></div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-purple-400 mb-2">🔑 Key Concepts</h3>
                    <div className="space-y-2 text-sm">
                      <div className="bg-purple-900/20 p-3 rounded-lg border-l-4 border-purple-400"><p className="font-semibold text-white">Directed Graph</p><p className="text-gray-400 mt-1">Edges have direction (A → B is different from B → A)</p></div>
                      <div className="bg-blue-900/20 p-3 rounded-lg border-l-4 border-blue-400"><p className="font-semibold text-white">Acyclic Graph (DAG)</p><p className="text-gray-400 mt-1">No cycles - you can't follow edges and return to starting node</p></div>
                      <div className="bg-green-900/20 p-3 rounded-lg border-l-4 border-green-400"><p className="font-semibold text-white">In-Degree</p><p className="text-gray-400 mt-1">Number of incoming edges to a node (dependencies)</p></div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-red-400 mb-2">⚠️ Why DAG Only?</h3>
                    <div className="bg-red-900/20 p-4 rounded-lg border-l-4 border-red-400 text-sm space-y-2">
                      <p className="text-white font-semibold">Topological sorting only works on Directed Acyclic Graphs!</p>
                      <p className="text-gray-300">If your graph has a cycle (A → B → C → A), there's no valid ordering. Both algorithms detect cycles and alert you.</p>
                    </div>
                  </section>
                </div>
              )}

              {/* ALGORITHMS TAB */}
              {activeTab === 'algorithms' && (
                <div className="space-y-6 text-gray-300">
                  <section>
                    <h3 className="text-xl font-bold text-green-400 mb-3">🟢 Kahn's Algorithm (BFS)</h3>
                    <div className="space-y-4 text-sm">
                      <div className="bg-green-900/10 p-4 rounded-lg border border-green-800">
                        <p className="font-semibold text-white mb-2">Steps:</p>
                        <ol className="space-y-1 list-decimal list-inside text-gray-300">
                          <li>Calculate in-degrees for all nodes</li>
                          <li>Add nodes with in-degree = 0 to queue</li>
                          <li>While queue not empty: Remove node, add to result, decrease neighbors' in-degrees</li>
                          <li>If neighbor's in-degree becomes 0, add to queue</li>
                          <li>If all nodes processed → Success! Otherwise → Cycle detected</li>
                        </ol>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div><p className="font-semibold text-white mb-2">✅ Advantages:</p><ul className="space-y-1 text-gray-400 text-xs"><li>• Intuitive and easy to understand</li><li>• Natural cycle detection</li><li>• Uses simple queue (FIFO)</li></ul></div>
                        <div><p className="font-semibold text-white mb-2">📊 Complexity:</p><ul className="space-y-1 text-gray-400 text-xs"><li>• Time: O(V + E)</li><li>• Space: O(V)</li><li>• Very efficient!</li></ul></div>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xl font-bold text-purple-400 mb-3">🟣 DFS-Based Algorithm</h3>
                    <div className="space-y-4 text-sm">
                      <div className="bg-purple-900/10 p-4 rounded-lg border border-purple-800">
                        <p className="font-semibold text-white mb-2">Steps:</p>
                        <ol className="space-y-1 list-decimal list-inside text-gray-300">
                          <li>Initialize visited, visiting sets, and stack</li>
                          <li>For each unvisited node, start DFS</li>
                          <li>Mark node as visiting, explore neighbors recursively</li>
                          <li>After exploring all neighbors, mark as visited and push to stack</li>
                          <li>Reverse stack for topological order</li>
                        </ol>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div><p className="font-semibold text-white mb-2">✅ Advantages:</p><ul className="space-y-1 text-gray-400 text-xs"><li>• Natural for recursive thinking</li><li>• Elegant cycle detection</li><li>• Post-order traversal</li></ul></div>
                        <div><p className="font-semibold text-white mb-2">📊 Complexity:</p><ul className="space-y-1 text-gray-400 text-xs"><li>• Time: O(V + E)</li><li>• Space: O(V)</li><li>• Same efficiency!</li></ul></div>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-orange-400 mb-2">🔄 Comparison</h3>
                    <div className="bg-dark-bg p-4 rounded-lg text-xs">
                      <div className="grid grid-cols-3 gap-2">
                        <div className="font-semibold text-white">Aspect</div><div className="font-semibold text-green-400">Kahn's</div><div className="font-semibold text-purple-400">DFS</div>
                        <div className="text-gray-400">Data Structure</div><div>Queue</div><div>Stack</div>
                        <div className="text-gray-400">Approach</div><div>Process ready first</div><div>Go deep</div>
                        <div className="text-gray-400">Best For</div><div>Beginners</div><div>Recursion fans</div>
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {/* FEATURES TAB */}
              {activeTab === 'features' && (
                <div className="space-y-6 text-gray-300">
                  <section>
                    <h3 className="text-xl font-bold text-blue-400 mb-3">🚀 Quick Start</h3>
                    <div className="bg-blue-900/10 p-4 rounded-lg border-l-4 border-blue-400 text-sm">
                      <ol className="space-y-2 list-decimal list-inside">
                        <li>Select <strong>"Example Graphs"</strong> → "Course Prerequisites"</li>
                        <li>Choose <strong>"Kahn's Algorithm"</strong></li>
                        <li>Click <strong>Play ▶️</strong> button</li>
                        <li>Watch queue, node colors, and execution log!</li>
                        <li>Try DFS on same graph to compare</li>
                      </ol>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-green-400 mb-2">🎨 Building Graphs</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-dark-bg p-3 rounded-lg"><p className="font-semibold text-white mb-2">➕ Add Nodes:</p><ul className="space-y-1 text-gray-400 text-xs"><li>• Click "Add Node" button</li><li>• Labeled A, B, C...</li><li>• Drag to move</li></ul></div>
                      <div className="bg-dark-bg p-3 rounded-lg"><p className="font-semibold text-white mb-2">🔗 Add Edges:</p><ul className="space-y-1 text-gray-400 text-xs"><li>• Drag from bottom circle</li><li>• Drop on top circle</li><li>• Arrow shows direction</li></ul></div>
                      <div className="bg-dark-bg p-3 rounded-lg"><p className="font-semibold text-white mb-2">🗑️ Delete Mode:</p><ul className="space-y-1 text-gray-400 text-xs"><li>• Click "Delete Mode"</li><li>• Hover (red highlight)</li><li>• Click to delete</li></ul></div>
                      <div className="bg-dark-bg p-3 rounded-lg"><p className="font-semibold text-white mb-2">🎲 Random:</p><ul className="space-y-1 text-gray-400 text-xs"><li>• "Generate Random DAG"</li><li>• Creates 6 nodes</li><li>• Guaranteed valid!</li></ul></div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-purple-400 mb-2">🎮 Controls</h3>
                    <div className="bg-purple-900/10 p-3 rounded-lg text-sm">
                      <div className="grid grid-cols-2 gap-2 text-gray-300">
                        <div>▶️ <strong>Play:</strong> Start algorithm</div><div>⏸️ <strong>Pause:</strong> Pause execution</div>
                        <div>⏮️ <strong>Back:</strong> Previous step</div><div>⏭️ <strong>Next:</strong> Next step</div>
                        <div>🔄 <strong>Reset:</strong> Clear all</div><div>🎚️ <strong>Speed:</strong> 0.5x - 3x</div>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-yellow-400 mb-2">📊 Panel Guide</h3>
                    <div className="space-y-2 text-sm">
                      <div className="bg-dark-bg p-3 rounded-lg border-l-4 border-green-400"><p className="font-semibold text-white">🔄 Data Structure (Top Right)</p><p className="text-gray-400 text-xs">Queue (Kahn's) or Stack (DFS) updates live</p></div>
                      <div className="bg-dark-bg p-3 rounded-lg border-l-4 border-blue-400"><p className="font-semibold text-white">📝 Log / 💻 Pseudocode (Middle Right)</p><p className="text-gray-400 text-xs">Toggle: human steps OR code with line highlighting!</p></div>
                      <div className="bg-dark-bg p-3 rounded-lg border-l-4 border-purple-400"><p className="font-semibold text-white">📖 Algorithm Info (Bottom Right)</p><p className="text-gray-400 text-xs">Complexity and details</p></div>
                    </div>
                  </section>
                </div>
              )}

              {/* UNDERSTANDING TAB */}
              {activeTab === 'understanding' && (
                <div className="space-y-6 text-gray-300">
                  <section>
                    <h3 className="text-xl font-bold text-blue-400 mb-3">🎨 Node Colors</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-3 bg-gray-700/30 p-3 rounded"><div className="w-8 h-8 rounded-full bg-slate-600 border-4 border-slate-500"></div><div><p className="text-white font-semibold">Gray - Unvisited</p><p className="text-gray-400 text-xs">Not processed yet</p></div></div>
                      <div className="flex items-center gap-3 bg-green-900/20 p-3 rounded"><div className="w-8 h-8 rounded-full bg-green-500 border-4 border-green-400"></div><div><p className="text-white font-semibold">Green - Ready</p><p className="text-gray-400 text-xs">In-degree = 0, ready to process!</p></div></div>
                      <div className="flex items-center gap-3 bg-yellow-900/20 p-3 rounded"><div className="w-8 h-8 rounded-full bg-yellow-500 border-4 border-yellow-400"></div><div><p className="text-white font-semibold">Yellow - Processing</p><p className="text-gray-400 text-xs">Currently active - watch this node!</p></div></div>
                      <div className="flex items-center gap-3 bg-blue-900/20 p-3 rounded"><div className="w-8 h-8 rounded-full bg-blue-500 border-4 border-blue-400"></div><div><p className="text-white font-semibold">Blue - Processed</p><p className="text-gray-400 text-xs">Done! Added to result</p></div></div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-purple-400 mb-2">🔢 In-Degree Badge</h3>
                    <div className="bg-purple-900/20 p-4 rounded-lg text-sm">
                      <p className="text-gray-300 mb-2">The small purple circle (top-right of node) shows <strong>in-degree</strong> = number of dependencies.</p>
                      <ul className="space-y-1 text-gray-400 text-xs ml-4">
                        <li>• In-degree 0 = No dependencies (ready!)</li>
                        <li>• In-degree 2 = Needs 2 nodes first</li>
                        <li>• Decreases as dependencies are processed</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-green-400 mb-2">📝 Log vs 💻 Pseudocode</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-dark-bg p-3 rounded-lg"><p className="font-semibold text-white mb-2">📝 Execution Log:</p><p className="text-gray-400 text-xs">Human-readable steps. See what's happening in plain English.</p></div>
                      <div className="bg-dark-bg p-3 rounded-lg"><p className="font-semibold text-white mb-2">💻 Pseudocode:</p><p className="text-gray-400 text-xs">Algorithm code. See which line is executing (yellow highlight).</p></div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">💡 Toggle between them to understand at different levels!</p>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-yellow-400 mb-2">🎯 Reading Results</h3>
                    <div className="bg-dark-bg p-4 rounded-lg text-sm space-y-2">
                      <p className="text-white">The final <strong>Topological Order</strong> appears at the bottom:</p>
                      <div className="bg-yellow-900/20 p-2 rounded text-gray-300 font-mono text-xs">Example: A → C → B → D → E</div>
                      <p className="text-gray-400 text-xs">This means: Do A first, then C, then B, etc. All dependencies are respected!</p>
                    </div>
                  </section>
                </div>
              )}

              {/* TIPS TAB */}
              {activeTab === 'tips' && (
                <div className="space-y-6 text-gray-300">
                  <section>
                    <h3 className="text-xl font-bold text-blue-400 mb-3">💡 Learning Tips</h3>
                    <div className="space-y-2 text-sm">
                      <div className="bg-blue-900/10 p-3 rounded-lg"><strong className="text-white">👨‍🎓 For Students:</strong><ul className="mt-2 space-y-1 text-gray-400 text-xs ml-4"><li>• Start with example graphs to see patterns</li><li>• Use slow speed (0.5x) to follow each step</li><li>• Toggle between Log and Pseudocode views</li><li>• Try same graph with both algorithms</li><li>• Create your own graphs to test understanding</li></ul></div>
                      <div className="bg-purple-900/10 p-3 rounded-lg"><strong className="text-white">👨‍🏫 For Teachers:</strong><ul className="mt-2 space-y-1 text-gray-400 text-xs ml-4"><li>• Use example graphs for demos</li><li>• Show pseudocode during lectures</li><li>• Create cyclic graphs to show detection</li><li>• Export graphs to share with class</li><li>• Use step-by-step mode for explanations</li></ul></div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-red-400 mb-2">❌ Common Mistakes</h3>
                    <div className="space-y-2 text-sm">
                      <div className="bg-red-900/10 p-3 rounded-lg border-l-4 border-red-400"><p className="text-white font-semibold">Creating Cycles</p><p className="text-gray-400 text-xs">Watch for A → B → A patterns. Algorithm will detect and warn!</p></div>
                      <div className="bg-yellow-900/10 p-3 rounded-lg border-l-4 border-yellow-400"><p className="text-white font-semibold">Forgetting Direction</p><p className="text-gray-400 text-xs">A → B means A must come BEFORE B, not after!</p></div>
                      <div className="bg-orange-900/10 p-3 rounded-lg border-l-4 border-orange-400"><p className="text-white font-semibold">Mixing Up Algorithms</p><p className="text-gray-400 text-xs">Queue = Kahn's (BFS). Stack = DFS. Check data structure panel!</p></div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-green-400 mb-2">✅ Best Practices</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="bg-dark-bg p-3 rounded-lg text-xs"><strong className="text-white">📝 Label Meaningfully</strong><p className="text-gray-400 mt-1">A="Calculus I", B="Calculus II" mentally</p></div>
                      <div className="bg-dark-bg p-3 rounded-lg text-xs"><strong className="text-white">🎯 Start Simple</strong><p className="text-gray-400 mt-1">3-4 nodes first, then add more</p></div>
                      <div className="bg-dark-bg p-3 rounded-lg text-xs"><strong className="text-white">🔍 Watch In-Degrees</strong><p className="text-gray-400 mt-1">Key to understanding Kahn's</p></div>
                      <div className="bg-dark-bg p-3 rounded-lg text-xs"><strong className="text-white">⏸️ Use Pause</strong><p className="text-gray-400 mt-1">Pause to examine state closely</p></div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-purple-400 mb-2">❓ FAQ</h3>
                    <div className="space-y-3 text-sm">
                      <div><p className="font-semibold text-white">Q: Can there be multiple valid topological orders?</p><p className="text-gray-400 text-xs mt-1">A: Yes! If nodes have no dependency between them, they can be ordered differently. Example: A→C, B→C has valid orders: A,B,C or B,A,C</p></div>
                      <div><p className="font-semibold text-white">Q: Why does DFS reverse the stack?</p><p className="text-gray-400 text-xs mt-1">A: DFS pushes nodes AFTER visiting children (post-order), so last node pushed has no dependents. Reversing gives correct order.</p></div>
                      <div><p className="font-semibold text-white">Q: When to use Kahn's vs DFS?</p><p className="text-gray-400 text-xs mt-1">A: Both work equally well! Kahn's is more intuitive. DFS is elegant if you're comfortable with recursion.</p></div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-teal-400 mb-2">🎓 Study Strategies</h3>
                    <div className="bg-teal-900/10 p-4 rounded-lg border-l-4 border-teal-400 text-sm space-y-2">
                      <p className="text-white font-semibold">Recommended Learning Path:</p>
                      <ol className="text-gray-300 text-xs space-y-1 list-decimal list-inside ml-2">
                        <li>Read Theory tab to understand concepts</li>
                        <li>Load "Simple DAG" example and watch both algorithms</li>
                        <li>Read Algorithms tab to understand how they work</li>
                        <li>Create your own 3-4 node graph</li>
                        <li>Try to predict the result before running</li>
                        <li>Use pseudocode view to see code execution</li>
                        <li>Experiment with cycles to see detection</li>
                        <li>Challenge: Create graphs representing real problems</li>
                      </ol>
                    </div>
                  </section>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-dark-border bg-dark-bg flex justify-between items-center">
              <p className="text-xs text-gray-500">💡 Tip: Try all tabs to master topological sorting!</p>
              <button
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition-colors"
              >
                Got it!
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
