import React from 'react';
import { motion } from 'framer-motion';
import { Algorithm, AlgorithmStep } from '../types';

interface PseudocodePanelProps {
  algorithm: Algorithm;
  currentStep: number;
  steps: AlgorithmStep[];
}

const KAHN_PSEUDOCODE = [
  'function kahnsAlgorithm(graph):',
  '  1. Calculate in-degree for all nodes',
  '  2. Initialize empty queue Q',
  '  3. Initialize empty result list',
  '  4. for each node v in graph:',
  '       if in-degree[v] == 0:',
  '         enqueue v to Q',
  '  5. while Q is not empty:',
  '       u = dequeue from Q',
  '       add u to result',
  '       for each neighbor v of u:',
  '         decrease in-degree[v] by 1',
  '         if in-degree[v] == 0:',
  '           enqueue v to Q',
  '  6. if result contains all nodes:',
  '       return result (success)',
  '     else:',
  '       return error (cycle detected)',
];

const DFS_PSEUDOCODE = [
  'function dfsTopologicalSort(graph):',
  '  1. Initialize visited set (empty)',
  '  2. Initialize visiting set (empty)',
  '  3. Initialize stack S (empty)',
  '  4. for each node v in graph:',
  '       if v not in visited:',
  '         if not dfs(v):',
  '           return error (cycle detected)',
  '  5. reverse stack S',
  '  6. return S as topological order',
  '',
  'function dfs(node):',
  '  if node in visiting:',
  '    return false (cycle detected)',
  '  if node in visited:',
  '    return true',
  '  add node to visiting',
  '  for each neighbor of node:',
  '    if not dfs(neighbor):',
  '      return false',
  '  remove node from visiting',
  '  add node to visited',
  '  push node to stack S',
  '  return true',
];

export const PseudocodePanel: React.FC<PseudocodePanelProps> = ({
  algorithm,
  currentStep,
  steps,
}) => {
  const pseudocode = algorithm === 'kahn' ? KAHN_PSEUDOCODE : DFS_PSEUDOCODE;
  const currentCodeLine = currentStep >= 0 && steps[currentStep]?.codeLine;

  return (
    <motion.div
      className="bg-dark-card border border-dark-border rounded-lg p-3 shadow-lg h-full flex flex-col"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
        💻 Pseudocode - {algorithm === 'kahn' ? "Kahn's Algorithm" : 'DFS Topological Sort'}
      </h2>

      <div className="flex-1 overflow-y-auto pr-1">
        <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm">
          {pseudocode.map((line, index) => {
            const isCurrentLine = currentCodeLine === index;
            const isExecuted = currentStep >= 0 && steps.slice(0, currentStep + 1).some(s => s.codeLine === index);
            
            return (
              <motion.div
                key={index}
                className={`py-1 px-2 rounded transition-all duration-300 ${
                  isCurrentLine
                    ? 'bg-yellow-500/30 border-l-4 border-yellow-400 text-yellow-100 font-bold'
                    : isExecuted
                    ? 'text-gray-400'
                    : 'text-gray-500'
                } ${line === '' ? 'h-4' : ''}`}
                animate={{
                  scale: isCurrentLine ? 1.02 : 1,
                }}
              >
                {line !== '' && (
                  <>
                    <span className="text-gray-600 select-none mr-3">
                      {String(index).padStart(2, '0')}
                    </span>
                    {line}
                  </>
                )}
              </motion.div>
            );
          })}
        </div>

        {currentStep < 0 && (
          <div className="text-center text-gray-500 text-sm mt-4">
            Start the algorithm to see execution flow
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-3 pt-3 border-t border-dark-border flex items-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500/30 border-l-2 border-yellow-400 rounded"></div>
          <span className="text-gray-400">Current Line</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-700 rounded"></div>
          <span className="text-gray-400">Executed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-900 rounded"></div>
          <span className="text-gray-400">Not Yet</span>
        </div>
      </div>
    </motion.div>
  );
};
