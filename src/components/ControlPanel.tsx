import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Plus, Shuffle, Upload, Download, Info, SkipForward, SkipBack, Trash2 } from 'lucide-react';
import { Algorithm } from '../types';

interface ControlPanelProps {
  algorithm: Algorithm;
  isPlaying: boolean;
  speed: number;
  deleteMode: boolean;
  onAlgorithmChange: (algo: Algorithm) => void;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onSpeedChange: (speed: number) => void;
  onAddNode: () => void;
  onGenerateRandom: () => void;
  onLoadExample: (index: number) => void;
  onExport: () => void;
  onImport: () => void;
  onHelp: () => void;
  onToggleDeleteMode: () => void;
  disabled?: boolean;
  canStepBack?: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  algorithm,
  isPlaying,
  speed,
  deleteMode,
  onAlgorithmChange,
  onPlay,
  onPause,
  onReset,
  onStepForward,
  onStepBackward,
  onSpeedChange,
  onAddNode,
  onGenerateRandom,
  onLoadExample,
  onExport,
  onImport,
  onHelp,
  onToggleDeleteMode,
  disabled = false,
  canStepBack = false,
}) => {
  return (
    <motion.div
      className="bg-dark-card border border-dark-border rounded-lg p-4 shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-xl font-bold text-white mb-4">Controls</h2>

      {/* Algorithm Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Algorithm
        </label>
        <select
          value={algorithm}
          onChange={(e) => onAlgorithmChange(e.target.value as Algorithm)}
          disabled={disabled || isPlaying}
          className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <option value="kahn">Kahn's Algorithm (BFS)</option>
          <option value="dfs">DFS-based Topological Sort</option>
        </select>
      </div>

      {/* Playback Controls */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Playback
        </label>
        <div className="flex gap-2 mb-2">
          <button
            onClick={isPlaying ? onPause : onPlay}
            disabled={disabled}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-medium py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={onReset}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded flex items-center justify-center transition-colors"
            title="Reset"
          >
            <RotateCcw size={18} />
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onStepBackward}
            disabled={!canStepBack || isPlaying}
            className="flex-1 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 text-white font-medium py-2 px-2 rounded flex items-center justify-center gap-1 transition-colors text-sm"
            title="Step Backward"
          >
            <SkipBack size={16} />
            Back
          </button>
          <button
            onClick={onStepForward}
            disabled={disabled || isPlaying}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-medium py-2 px-2 rounded flex items-center justify-center gap-1 transition-colors text-sm"
            title="Step Forward"
          >
            Next
            <SkipForward size={16} />
          </button>
        </div>
      </div>

      {/* Speed Control */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Speed: {speed}x
        </label>
        <input
          type="range"
          min="0.5"
          max="3"
          step="0.5"
          value={speed}
          onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
          className="w-full accent-blue-600"
        />
      </div>

      {/* Example Graphs */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Example Graphs
        </label>
        <select
          onChange={(e) => onLoadExample(parseInt(e.target.value))}
          disabled={isPlaying}
          className="w-full p-2 bg-dark-bg border border-dark-border rounded text-white text-sm disabled:opacity-50"
          defaultValue=""
        >
          <option value="" disabled>Select an example...</option>
          <option value="0">Simple DAG (4 nodes)</option>
          <option value="1">Course Prerequisites</option>
          <option value="2">Build Dependencies</option>
          <option value="3">Linear Chain</option>
          <option value="4">⚠️ Cyclic Graph</option>
        </select>
      </div>

      {/* Graph Controls */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Graph
        </label>
        <div className="flex flex-col gap-2">
          <button
            onClick={onAddNode}
            disabled={isPlaying || deleteMode}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white font-medium py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors"
          >
            <Plus size={18} />
            Add Node
          </button>
          <button
            onClick={onToggleDeleteMode}
            disabled={isPlaying}
            className={`${
              deleteMode
                ? 'bg-red-600 hover:bg-red-700 ring-2 ring-red-400'
                : 'bg-gray-600 hover:bg-gray-700'
            } disabled:bg-gray-600 text-white font-medium py-2 px-4 rounded flex items-center justify-center gap-2 transition-all`}
          >
            <Trash2 size={18} />
            {deleteMode ? '✓ Delete Mode ON' : 'Delete Mode'}
          </button>
          <button
            onClick={onGenerateRandom}
            disabled={isPlaying || deleteMode}
            className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white font-medium py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors"
          >
            <Shuffle size={18} />
            Generate Random DAG
          </button>
        </div>
      </div>

      {/* Import/Export */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Save/Load
        </label>
        <div className="flex gap-2">
          <button
            onClick={onExport}
            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors"
          >
            <Download size={18} />
            Export
          </button>
          <button
            onClick={onImport}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors"
          >
            <Upload size={18} />
            Import
          </button>
        </div>
      </div>

      {/* Help */}
      <button
        onClick={onHelp}
        className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors"
      >
        <Info size={18} />
        Help
      </button>
    </motion.div>
  );
};
