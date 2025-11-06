import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { AlgorithmStep } from '../types';

interface LogPanelProps {
  steps: AlgorithmStep[];
  currentStep: number;
}

export const LogPanel: React.FC<LogPanelProps> = ({ steps, currentStep }) => {
  const logEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll within the log panel only (not the entire right panel)
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [currentStep]);

  return (
    <motion.div
      className="bg-dark-card border border-dark-border rounded-lg p-3 shadow-lg h-full flex flex-col"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
        📝 Execution Log
      </h2>

      <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
        {steps.length === 0 ? (
          <div className="text-center text-gray-500 text-sm py-8">
            Run an algorithm to see step-by-step execution
          </div>
        ) : (
          steps.slice(0, currentStep + 1).map((step, index) => (
            <motion.div
              key={index}
              className={`p-3 rounded-lg border-l-4 ${
                index === currentStep
                  ? 'bg-blue-900/50 border-blue-400 shadow-lg shadow-blue-900/20'
                  : 'bg-dark-bg border-gray-700'
              }`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <div className="flex items-start gap-2 mb-1">
                <span className={`font-bold text-xs px-2 py-0.5 rounded ${
                  index === currentStep 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-700 text-gray-400'
                }`}>
                  #{index + 1}
                </span>
                <div className="flex-1">
                  <span className={`block text-sm leading-relaxed ${
                    step.type === 'complete' ? 'font-bold text-green-400' :
                    step.type === 'select' ? 'text-yellow-300 font-medium' :
                    step.type === 'remove' ? 'text-blue-300 font-medium' :
                    step.type === 'update' ? 'text-orange-300' :
                    'text-gray-300'
                  }`}>
                    {step.message}
                  </span>
                  
                  {step.stack && step.stack.length > 0 && (
                    <div className="mt-2 text-xs bg-purple-900/30 border border-purple-700 rounded px-2 py-1 text-purple-300">
                      📚 Stack: [{step.stack.join(', ')}]
                    </div>
                  )}

                  {step.queue && step.queue.length > 0 && (
                    <div className="mt-2 text-xs bg-blue-900/30 border border-blue-700 rounded px-2 py-1 text-blue-300">
                      🔄 Queue: [{step.queue.join(', ')}]
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
        <div ref={logEndRef} />
      </div>
    </motion.div>
  );
};
