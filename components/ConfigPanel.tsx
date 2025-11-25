import React from 'react';
import { Settings2, Clock, Hourglass, Activity, Repeat, Infinity as InfinityIcon, PaintBucket } from 'lucide-react';
import { AnimationConfig } from '../types';

interface ConfigPanelProps {
  config: AnimationConfig;
  onChange: (config: AnimationConfig) => void;
}

const TIMING_FUNCTIONS = [
  'linear',
  'ease',
  'ease-in',
  'ease-out',
  'ease-in-out',
  'cubic-bezier(0.175, 0.885, 0.32, 1.275)' // Back
];

const ConfigPanel: React.FC<ConfigPanelProps> = ({ config, onChange }) => {
  const update = (key: keyof AnimationConfig, value: string | number) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <div className="bg-surface rounded-2xl border border-white/5 p-6 h-full overflow-y-auto">
      <div className="flex items-center gap-2 mb-6">
        <Settings2 className="text-primary" size={20} />
        <h2 className="font-semibold text-white">Configuration</h2>
      </div>

      <div className="space-y-6">
        {/* Duration */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <label className="text-zinc-400 flex items-center gap-2">
              <Clock size={14} /> Duration
            </label>
            <span className="text-white font-mono">{config.duration}s</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={config.duration}
            onChange={(e) => update('duration', parseFloat(e.target.value))}
            className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>

        {/* Delay */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <label className="text-zinc-400 flex items-center gap-2">
              <Hourglass size={14} /> Delay
            </label>
            <span className="text-white font-mono">{config.delay}s</span>
          </div>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={config.delay}
            onChange={(e) => update('delay', parseFloat(e.target.value))}
            className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>

        {/* Timing Function */}
        <div className="space-y-2">
          <label className="text-zinc-400 text-sm flex items-center gap-2 mb-2">
            <Activity size={14} /> Easing
          </label>
          <div className="grid grid-cols-2 gap-2">
            {TIMING_FUNCTIONS.map((tf) => (
              <button
                key={tf}
                onClick={() => update('timingFunction', tf)}
                className={`
                  px-3 py-2 rounded-lg text-xs font-mono text-left truncate transition-colors border
                  ${config.timingFunction === tf 
                    ? 'bg-primary/20 border-primary text-primary' 
                    : 'bg-black/20 border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-black/40'}
                `}
                title={tf}
              >
                {tf.startsWith('cubic') ? 'spring' : tf}
              </button>
            ))}
          </div>
        </div>

        {/* Iteration Count */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <label className="text-zinc-400 flex items-center gap-2">
              <Repeat size={14} /> Iterations
            </label>
            <span className="text-white font-mono text-xs">
               {config.iterationCount === 'infinite' ? '∞' : config.iterationCount}
            </span>
          </div>
          <div className="flex gap-2">
             <input
              type="number"
              min="0.1"
              step="0.1"
              value={config.iterationCount === 'infinite' ? '' : config.iterationCount}
              onChange={(e) => update('iterationCount', e.target.value)}
              className="flex-1 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="1"
              disabled={config.iterationCount === 'infinite'}
            />
            <button
               onClick={() => update('iterationCount', config.iterationCount === 'infinite' ? '1' : 'infinite')}
               className={`px-3 py-2 rounded-lg border transition-colors flex items-center justify-center ${config.iterationCount === 'infinite' ? 'bg-primary/20 border-primary text-primary' : 'bg-black/20 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'}`}
               title="Toggle Infinite Loop"
            >
              <InfinityIcon size={16} />
            </button>
          </div>
        </div>

        {/* Fill Mode */}
        <div className="space-y-2">
          <label className="text-zinc-400 text-sm flex items-center gap-2">
            <PaintBucket size={14} /> Fill Mode
          </label>
          <select 
            value={config.fillMode}
            onChange={(e) => update('fillMode', e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
          >
            <option value="none">none</option>
            <option value="forwards">forwards</option>
            <option value="backwards">backwards</option>
            <option value="both">both</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ConfigPanel;