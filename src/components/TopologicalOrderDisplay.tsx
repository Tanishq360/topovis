import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface TopologicalOrderDisplayProps {
  order: string[];
  nodeLabels: Map<string, string>;
}

export const TopologicalOrderDisplay: React.FC<TopologicalOrderDisplayProps> = ({
  order,
  nodeLabels,
}) => {
  if (order.length === 0) {
    return (
      <motion.div
        className="bg-dark-card border border-dark-border rounded-lg p-4 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-lg font-bold text-white mb-2">Topological Order</h2>
        <p className="text-gray-400 text-sm">
          Run an algorithm to see the topological order appear here
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-dark-card border border-dark-border rounded-lg p-4 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-lg font-bold text-white mb-4">
        ✨ Topological Order
      </h2>
      <div className="flex items-center gap-3 flex-wrap">
        {order.map((nodeId, index) => (
          <React.Fragment key={nodeId}>
            <motion.div
              className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: index * 0.15,
              }}
            >
              {nodeLabels.get(nodeId) || nodeId}
            </motion.div>
            {index < order.length - 1 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 + 0.1 }}
              >
                <ArrowRight className="text-gray-400" size={20} />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
};
