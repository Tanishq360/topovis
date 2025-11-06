import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { motion } from 'framer-motion';
import { NodeState } from '../types';

interface CustomNodeData {
  label: string;
  state: NodeState;
  inDegree?: number;
  showInDegree?: boolean;
  deleteMode?: boolean;
}

const stateColors: Record<NodeState, string> = {
  unvisited: 'bg-slate-600 border-slate-500',
  ready: 'bg-green-500 border-green-400',
  processing: 'bg-yellow-500 border-yellow-400',
  processed: 'bg-blue-500 border-blue-400',
};

const stateGlow: Record<NodeState, string> = {
  unvisited: '',
  ready: 'shadow-[0_0_15px_rgba(34,197,94,0.6)]',
  processing: 'shadow-[0_0_20px_rgba(234,179,8,0.8)]',
  processed: 'shadow-[0_0_15px_rgba(59,130,246,0.6)]',
};

export const CustomNode: React.FC<NodeProps<CustomNodeData>> = ({ data }) => {
  return (
    <motion.div
      className="relative"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Handle type="target" position={Position.Top} />
      
      <motion.div
        className={`
          w-16 h-16 rounded-full flex items-center justify-center
          border-4 font-bold text-white text-xl
          ${stateColors[data.state]}
          ${stateGlow[data.state]}
          ${data.deleteMode ? 'cursor-pointer hover:!bg-red-600 hover:!border-red-500 hover:ring-4 hover:ring-red-400/50' : ''}
          transition-all duration-300
        `}
        animate={{
          scale: data.state === 'processing' ? [1, 1.1, 1] : 1,
        }}
        transition={{
          duration: 1,
          repeat: data.state === 'processing' ? Infinity : 0,
        }}
      >
        {data.label}
      </motion.div>

      {data.showInDegree !== false && (
        <motion.div
          className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-purple-400"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          key={data.inDegree}
        >
          {data.inDegree ?? 0}
        </motion.div>
      )}

      <Handle type="source" position={Position.Bottom} />
    </motion.div>
  );
};
