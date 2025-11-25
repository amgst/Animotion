import React, { useState } from 'react';
import { Copy, Check, Code2, FileJson, Download } from 'lucide-react';
import { AnimationDef, AnimationConfig } from '../types';

interface CodeViewerProps {
  animation: AnimationDef;
  config: AnimationConfig;
}

const CodeViewer: React.FC<CodeViewerProps> = ({ animation, config }) => {
  const [activeTab, setActiveTab] = useState<'tailwind' | 'css'>('tailwind');
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCssCode = () => {
    const keyframes = `@keyframes ${animation.id} {${animation.keyframes}}`;
    const classDef = `
.animate-${animation.id} {
  animation: ${animation.id} ${config.duration}s ${config.timingFunction} ${config.delay > 0 ? `${config.delay}s` : ''} ${config.iterationCount} ${config.fillMode};
}`;
    return `${keyframes}\n${classDef}`;
  };

  const getTailwindCode = () => {
    return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        '${animation.id}': {
${animation.keyframes.split('\n').filter(Boolean).map(line => `          ${line.trim()}`).join('\n')}
        },
      },
      animation: {
        '${animation.id}': '${animation.id} ${config.duration}s ${config.timingFunction} ${config.fillMode}',
      },
    },
  },
};`;
  };

  const code = activeTab === 'tailwind' ? getTailwindCode() : getCssCode();

  const handleDownload = () => {
    const extension = activeTab === 'tailwind' ? 'js' : 'css';
    const filename = `${animation.id}.${extension}`;
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#1e1e1e] rounded-2xl border border-white/5 overflow-hidden flex flex-col h-full">
      <div className="flex items-center justify-between p-2 border-b border-white/5 bg-[#252526]">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('tailwind')}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
              ${activeTab === 'tailwind' ? 'bg-primary/20 text-primary' : 'text-zinc-500 hover:text-zinc-300'}
            `}
          >
            <FileJson size={14} /> Tailwind
          </button>
          <button
            onClick={() => setActiveTab('css')}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
              ${activeTab === 'css' ? 'bg-primary/20 text-primary' : 'text-zinc-500 hover:text-zinc-300'}
            `}
          >
            <Code2 size={14} /> CSS
          </button>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
            title="Download File"
          >
            <Download size={14} />
            Export
          </button>

          <button
            onClick={() => handleCopy(code)}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
              ${copied ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'}
            `}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto relative group">
        <pre className="p-4 text-sm font-mono leading-relaxed text-blue-100">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeViewer;