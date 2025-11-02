import React from 'react';
import { motion } from 'framer-motion';
import { Algorithm } from '../types';
import { BookOpen, Zap, Clock } from 'lucide-react';

interface AlgorithmInfoProps {
  algorithm: Algorithm;
}

const algorithmDetails = {
  kahn: {
    name: "Kahn's Algorithm (BFS)",
    approach: 'Repeatedly removes nodes with in-degree 0',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    dataStructure: 'Queue (FIFO)',
    advantages: [
      'Intuitive and easy to understand',
      'Directly detects cycles',
      'Good for incremental processing',
    ],
    disadvantages: [
      'Requires in-degree tracking',
      'More memory for in-degree array',
    ],
  },
  dfs: {
    name: 'DFS-based Topological Sort',
    approach: 'Uses depth-first search with finishing times',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    dataStructure: 'Stack (LIFO) + Recursion',
    advantages: [
      'Simple recursive implementation',
      'No in-degree calculation needed',
      'Natural for dependency resolution',
    ],
    disadvantages: [
      'Harder to understand for beginners',
      'Requires reversing result',
      'Stack overflow risk for deep graphs',
    ],
  },
};

export const AlgorithmInfo: React.FC<AlgorithmInfoProps> = ({ algorithm }) => {
  const info = algorithmDetails[algorithm];

  return (
    <motion.div
      className="bg-dark-card border border-dark-border rounded-lg p-3 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="text-blue-400" size={18} />
        <h3 className="text-base font-bold text-white">{info.name}</h3>
      </div>

      <div className="space-y-2">
        <div>
          <p className="text-sm text-gray-400 mb-1">Approach:</p>
          <p className="text-sm text-gray-200">{info.approach}</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-dark-bg rounded p-2">
            <div className="flex items-center gap-1 mb-1">
              <Clock className="text-green-400" size={14} />
              <p className="text-xs font-semibold text-gray-400">Time</p>
            </div>
            <p className="text-sm font-mono text-green-400">{info.timeComplexity}</p>
          </div>
          <div className="bg-dark-bg rounded p-2">
            <div className="flex items-center gap-1 mb-1">
              <Zap className="text-purple-400" size={14} />
              <p className="text-xs font-semibold text-gray-400">Space</p>
            </div>
            <p className="text-sm font-mono text-purple-400">{info.spaceComplexity}</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-400 mb-1">Data Structure:</p>
          <p className="text-sm text-blue-300">{info.dataStructure}</p>
        </div>

        <div>
          <p className="text-xs font-semibold text-green-400 mb-1">✓ Advantages:</p>
          <ul className="text-xs text-gray-300 space-y-0.5">
            {info.advantages.map((adv, idx) => (
              <li key={idx} className="flex items-start">
                <span className="mr-1">•</span>
                <span>{adv}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold text-orange-400 mb-1">⚠ Considerations:</p>
          <ul className="text-xs text-gray-300 space-y-0.5">
            {info.disadvantages.map((dis, idx) => (
              <li key={idx} className="flex items-start">
                <span className="mr-1">•</span>
                <span>{dis}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-dark-border">
        <p className="text-xs text-gray-500 italic">
          V = vertices, E = edges
        </p>
      </div>
    </motion.div>
  );
};
