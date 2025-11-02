import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Algorithm } from '../types';

interface DataStructurePanelProps {
  algorithm: Algorithm;
  queue?: string[];
  stack?: string[];
  nodeLabels: Map<string, string>;
}

export const DataStructurePanel: React.FC<DataStructurePanelProps> = ({
  algorithm,
  queue = [],
  stack = [],
  nodeLabels,
}) => {
  const isKahn = algorithm === 'kahn';
  const items = isKahn ? queue : stack;
  const title = isKahn ? '🔄 Queue (Kahn\'s)' : '📚 Stack (DFS)';
  const emptyMessage = isKahn ? 'Queue is empty' : 'Stack is empty';

  return (
    <div className="bg-dark-card border border-dark-border rounded-lg p-3 h-full">
      <h3 className="text-base font-bold text-white mb-2">{title}</h3>
      
      <div className="bg-dark-bg rounded-lg p-2 min-h-[120px]">
        {items.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">{emptyMessage}</p>
        ) : (
          <div className={`flex ${isKahn ? 'flex-row' : 'flex-col-reverse'} gap-2 ${isKahn ? 'overflow-x-auto' : ''}`}>
            <AnimatePresence>
              {items.map((nodeId, index) => {
                const label = nodeLabels.get(nodeId) || nodeId;
                return (
                  <motion.div
                    key={`${nodeId}-${index}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                      <span className="text-white text-lg font-bold">{label}</span>
                    </div>
                    {isKahn && index === 0 && (
                      <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs text-green-400 font-semibold whitespace-nowrap">
                        ← Front
                      </div>
                    )}
                    {!isKahn && index === items.length - 1 && (
                      <div className="absolute -right-10 top-1/2 transform -translate-y-1/2 text-xs text-green-400 font-semibold">
                        ← Top
                      </div>
                    )}
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-700 rounded-full flex items-center justify-center text-xs text-gray-300 border border-gray-600">
                      {isKahn ? index : items.length - index}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      <div className="mt-2 text-xs text-gray-400">
        {isKahn ? (
          <p>
            <span className="font-semibold text-blue-400">Queue:</span> FIFO - Nodes with in-degree 0
          </p>
        ) : (
          <p>
            <span className="font-semibold text-purple-400">Stack:</span> LIFO - DFS completion order
          </p>
        )}
      </div>
    </div>
  );
};
