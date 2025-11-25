import React from 'react';
import { LayoutGrid, LogIn, LogOut, Zap, Type, Image as ImageIcon } from 'lucide-react';
import { Category } from '../types';

interface SidebarProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const CATEGORIES: { id: Category; icon: React.ReactNode; label: string }[] = [
  { id: 'All', icon: <LayoutGrid size={18} />, label: 'All Animations' },
  { id: 'Entrance', icon: <LogIn size={18} />, label: 'Entrances' },
  { id: 'Exit', icon: <LogOut size={18} />, label: 'Exits' },
  { id: 'Attention', icon: <Zap size={18} />, label: 'Attention' },
  { id: 'Text', icon: <Type size={18} />, label: 'Text Effects' },
  { id: 'Background', icon: <ImageIcon size={18} />, label: 'Backgrounds' },
];

const Sidebar: React.FC<SidebarProps> = ({ selectedCategory, onSelectCategory, isOpen, onToggle }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={onToggle}
        />
      )}

      <aside className={`
        fixed top-0 left-0 bottom-0 z-30 w-64 bg-surface border-r border-white/5 
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static
      `}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="font-bold text-white text-lg">X</span>
            </div>
            <h1 className="font-bold text-xl tracking-tight text-white">Animotion</h1>
          </div>

          <nav className="space-y-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  if (window.innerWidth < 768) onToggle();
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                  ${selectedCategory === cat.id 
                    ? 'bg-primary/10 text-primary border border-primary/20' 
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'}
                `}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/5">
          <div className="text-xs text-zinc-500 text-center">
            Built for modern web developers.
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
