import React, { useState, useEffect } from 'react';
import { RefreshCcw, Box, Type, Image as ImageIcon } from 'lucide-react';
import { AnimationDef, AnimationConfig } from '../types';

interface PlaygroundProps {
  animation: AnimationDef;
  config: AnimationConfig;
}

const Playground: React.FC<PlaygroundProps> = ({ animation, config }) => {
  const [key, setKey] = useState(0); // To force re-render for animation replay
  const [previewType, setPreviewType] = useState<'box' | 'text' | 'image'>('box');

  const replay = () => setKey(prev => prev + 1);

  // Auto-replay when animation or config changes
  useEffect(() => {
    replay();
  }, [animation, config]);

  const style: React.CSSProperties = {
    animationName: animation.id,
    animationDuration: `${config.duration}s`,
    animationDelay: `${config.delay}s`,
    animationTimingFunction: config.timingFunction,
    animationIterationCount: config.iterationCount,
    animationFillMode: config.fillMode,
  };

  // Special handling for gradient text
  const isGradientText = animation.id === 'gradient-flow';
  const textStyle: React.CSSProperties = isGradientText ? {
    ...style,
    background: 'linear-gradient(270deg, #ff00cc, #3333ff, #00dbde)',
    backgroundSize: '400% 400%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  } : style;

  return (
    <div className="flex flex-col h-full bg-surface/50 rounded-2xl border border-white/5 overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-white/5 bg-surface">
        <div className="flex gap-2">
          <button
            onClick={() => setPreviewType('box')}
            className={`p-2 rounded-lg transition-colors ${previewType === 'box' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            title="Box Preview"
          >
            <Box size={18} />
          </button>
          <button
            onClick={() => setPreviewType('text')}
            className={`p-2 rounded-lg transition-colors ${previewType === 'text' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            title="Text Preview"
          >
            <Type size={18} />
          </button>
          <button
            onClick={() => setPreviewType('image')}
            className={`p-2 rounded-lg transition-colors ${previewType === 'image' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            title="Image Preview"
          >
            <ImageIcon size={18} />
          </button>
        </div>
        <button 
          onClick={replay}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-primary/20 text-primary rounded-full hover:bg-primary/30 transition-colors"
        >
          <RefreshCcw size={14} /> Replay
        </button>
      </div>

      {/* Stage */}
      <div className="flex-1 flex items-center justify-center relative p-12 overflow-hidden bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-20">
        <div className="absolute inset-0 bg-black/20" /> {/* Dimmer */}
        
        {/* Grid lines for depth perception */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
          backgroundSize: '24px 24px' 
        }} />

        <div key={key} className="relative z-10">
          {previewType === 'box' && (
            <div 
              style={style}
              className="w-32 h-32 md:w-48 md:h-48 rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)] flex items-center justify-center"
            >
              <div className="w-8 h-8 md:w-12 md:h-12 border-4 border-white/30 rounded-full" />
            </div>
          )}

          {previewType === 'text' && (
            <h1 
              style={textStyle}
              className={`text-4xl md:text-6xl font-black tracking-tight text-center ${!isGradientText ? 'text-white' : ''}`}
            >
              Animotion
              <br />
              <span className="text-2xl md:text-4xl font-normal opacity-80 text-white">Library</span>
            </h1>
          )}

          {previewType === 'image' && (
            <div style={style} className="relative group">
              <img 
                src="https://picsum.photos/400/300" 
                alt="Preview" 
                className="rounded-xl shadow-2xl max-w-full h-auto object-cover"
              />
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Playground;
