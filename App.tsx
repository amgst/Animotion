import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Playground from './components/Playground';
import ConfigPanel from './components/ConfigPanel';
import CodeViewer from './components/CodeViewer';
import { Menu, Search } from 'lucide-react';
import { ANIMATIONS } from './data/animations';
import { Category, AnimationDef, AnimationConfig } from './types';

// Inject dynamic styles for the playground
const StyleInjector = ({ animations }: { animations: AnimationDef[] }) => {
  return (
    <style>
      {animations.map(anim => `
        @keyframes ${anim.id} {
          ${anim.keyframes}
        }
      `).join('\n')}
    </style>
  );
};

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedAnimId, setSelectedAnimId] = useState<string>(ANIMATIONS[0].id);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Find currently selected animation object
  const selectedAnim = ANIMATIONS.find(a => a.id === selectedAnimId) || ANIMATIONS[0];

  // Configuration State
  const [config, setConfig] = useState<AnimationConfig>({
    duration: selectedAnim.defaultDuration,
    delay: 0,
    timingFunction: selectedAnim.defaultTiming,
    iterationCount: '1',
    fillMode: 'both',
  });

  // Reset config when animation changes, but keep some user prefs if desired? 
  // For now, let's reset duration/timing to defaults for best experience, keep others.
  useEffect(() => {
    setConfig(prev => ({
      ...prev,
      duration: selectedAnim.defaultDuration,
      timingFunction: selectedAnim.defaultTiming,
      delay: 0
    }));
  }, [selectedAnimId]);

  // Filter animations
  const filteredAnimations = ANIMATIONS.filter(anim => {
    const matchesCategory = selectedCategory === 'All' || anim.category === selectedCategory;
    const matchesSearch = anim.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex h-screen overflow-hidden bg-background text-zinc-100 font-sans">
      <StyleInjector animations={ANIMATIONS} />

      <Sidebar 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory}
        isOpen={isSidebarOpen}
        onToggle={() => setSidebarOpen(!isSidebarOpen)}
      />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header Mobile */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-white/5 bg-surface">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-white">X</div>
            <span className="font-bold text-lg">Animotion</span>
          </div>
          <button onClick={() => setSidebarOpen(true)} className="p-2 text-zinc-400">
            <Menu size={24} />
          </button>
        </div>

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left Column: Animation Grid */}
          <div className="w-full md:w-80 lg:w-96 flex flex-col border-r border-white/5 bg-surface/30">
            {/* Search */}
            <div className="p-4 border-b border-white/5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                <input 
                  type="text"
                  placeholder="Search animations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredAnimations.length === 0 ? (
                <div className="text-center py-10 text-zinc-500 text-sm">No animations found.</div>
              ) : (
                filteredAnimations.map(anim => (
                  <button
                    key={anim.id}
                    onClick={() => setSelectedAnimId(anim.id)}
                    className={`
                      group w-full text-left p-4 rounded-xl border transition-all duration-200 relative overflow-hidden
                      ${selectedAnimId === anim.id 
                        ? 'bg-primary/10 border-primary/50 ring-1 ring-primary/50' 
                        : 'bg-surface border-white/5 hover:border-white/20 hover:bg-white/5'}
                    `}
                  >
                    <div className="flex items-center justify-between relative z-10">
                      <div>
                        <h3 className={`font-medium ${selectedAnimId === anim.id ? 'text-primary' : 'text-zinc-200'}`}>
                          {anim.name}
                        </h3>
                        <p className="text-xs text-zinc-500 mt-1">{anim.category}</p>
                      </div>
                      {/* Mini Preview Dot */}
                      <div className={`
                        w-2 h-2 rounded-full transition-transform
                        ${selectedAnimId === anim.id ? 'bg-primary' : 'bg-zinc-700'}
                        group-hover:scale-150
                      `} style={{
                        animation: groupHoverAnimation(anim.id)
                      }} />
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Right Column: Playground & Config */}
          <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto md:overflow-hidden">
            <div className="flex-1 p-4 md:p-6 lg:p-8 flex flex-col gap-6 max-w-7xl mx-auto w-full h-full">
              
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white tracking-tight">{selectedAnim.name}</h2>
                  <p className="text-zinc-400 mt-1">Customize and export your Tailwind CSS animation.</p>
                </div>
              </div>

              {/* Main Workspace Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
                
                {/* Preview Area */}
                <div className="lg:col-span-8 h-[400px] lg:h-auto min-h-[400px]">
                  <Playground animation={selectedAnim} config={config} />
                </div>

                {/* Sidebar Config */}
                <div className="lg:col-span-4 flex flex-col gap-6 h-full overflow-y-auto pr-2">
                  <ConfigPanel config={config} onChange={setConfig} />
                  <div className="flex-1 min-h-[300px]">
                    <CodeViewer animation={selectedAnim} config={config} />
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

// Helper for hover effect on list items
const groupHoverAnimation = (animId: string) => {
  // We want the dot to animate only when the parent group is hovered. 
  // Since we can't easily inject dynamic CSS for :hover state in JS without complex libraries,
  // we'll rely on the playground for the real preview and keep the list simple.
  // However, we can use the 'group-hover' class pattern from tailwind if we defined specific animations in tailwind config.
  // Given we are generating animations dynamically, we will just return 'none' here to keep it clean, 
  // or simple pulsing.
  return 'none';
};

export default App;
