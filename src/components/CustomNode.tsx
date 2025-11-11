import React from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import { motion } from 'framer-motion';
import { NodeState } from '../types';

interface CustomNodeData {
  label: string;
  state: NodeState;
  inDegree?: number;
  showInDegree?: boolean;
  deleteMode?: boolean;
  edgeMode?: boolean;
  isSelectedForEdge?: boolean;
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
    <div className="relative">
      {/* Invisible centered handles - SmartEdge will calculate optimal connection points */}
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={false}
        style={{ 
          opacity: 0, 
          pointerEvents: 'none',
          background: 'transparent',
          border: 'none',
          width: 1,
          height: 1,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <Handle
        type="source"
        position={Position.Top}
        isConnectable={false}
        style={{ 
          opacity: 0, 
          pointerEvents: 'none',
          background: 'transparent',
          border: 'none',
          width: 1,
          height: 1,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      <motion.div
        className={`
          w-16 h-16 rounded-full flex items-center justify-center
          border-4 font-bold text-white text-xl
          ${stateColors[data.state]}
          ${stateGlow[data.state]}
          ${data.deleteMode ? 'cursor-pointer hover:!bg-red-600 hover:!border-red-500 hover:ring-4 hover:ring-red-400/50' : ''}
          ${data.edgeMode ? 'cursor-pointer hover:ring-4 hover:ring-blue-400/50' : 'cursor-default'}
          ${data.isSelectedForEdge ? 'ring-4 ring-blue-400 !border-blue-300' : ''}
          transition-all duration-300
        `}
        initial={{ scale: 0 }}
        animate={{
          scale: data.state === 'processing' ? [1, 1.1, 1] : 1,
        }}
        transition={{
          duration: data.state === 'processing' ? 1 : 0.3,
          repeat: data.state === 'processing' ? Infinity : 0,
          type: 'spring',
          stiffness: 300,
          damping: 20
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
    </div>
  );
};
