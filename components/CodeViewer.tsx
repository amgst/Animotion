import React, { useState } from 'react';
import { Copy, Check, FileJson, Download } from 'lucide-react';
import { AnimationDef, AnimationConfig } from '../types';

interface CodeViewerProps {
  animation: AnimationDef;
  config: AnimationConfig;
}

const CodeViewer: React.FC<CodeViewerProps> = ({ animation, config }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

  const code = getTailwindCode();

  const handleDownload = () => {
    const filename = `${animation.id}.js`;
    
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
        <div className="flex items-center gap-2 px-3 py-1.5">
          <FileJson size={14} className="text-primary" />
          <span className="text-xs font-medium text-primary">Tailwind CSS Config</span>
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