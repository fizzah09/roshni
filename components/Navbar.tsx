'use client';

import React from 'react';
import { Bolt, Globe } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onSelectView: (view: string) => void;
  lang: 'en' | 'ur';
  onToggleLang: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onSelectView,
  lang,
  onToggleLang,
}) => {
  return (
    <header class="bg-surface-dim border-b border-outline-variant sticky top-0 w-full z-50">
      <div class="flex justify-between items-center w-full px-4 md:px-8 py-3 max-w-7xl mx-auto">
        <div
          class="flex items-center gap-2 cursor-pointer group"
          onClick={() => onSelectView('home')}
        >
          <div class="p-1.5 rounded bg-primary/10 border border-primary/30 group-hover:scale-105 transition-transform">
            <Bolt class="w-6 h-6 text-primary fill-primary" />
          </div>
          <span class="text-xl md:text-2xl font-bold tracking-tighter text-primary font-mono">
            {lang === 'en' ? 'ROSHNI_SYSTEM' : 'روشنی سسٹم'}
          </span>
        </div>

        <nav class="hidden md:flex gap-4 items-center text-sm font-mono font-medium">
          {[
            { id: 'home', en: 'Home', ur: 'ہوم' },
            { id: 'ingest', en: 'Paste-to-Ingest', ur: 'انپٹ شیڈول' },
            { id: 'insights', en: 'Discrepancy Analytics', ur: 'تجزیات' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectView(item.id)}
              class={`px-3 py-1.5 rounded transition-all ${
                currentView === item.id
                  ? 'bg-primary text-on-primary font-bold shadow-[0_0_10px_rgba(87,241,219,0.3)]'
                  : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface'
              }`}
            >
              {lang === 'en' ? item.en : item.ur}
            </button>
          ))}
        </nav>

        <button
          onClick={onToggleLang}
          class="flex items-center gap-1.5 text-sm font-mono text-primary border border-primary/50 px-3 py-1.5 rounded-md hover:bg-primary/10 transition-colors font-bold"
        >
          <Globe class="w-4 h-4" />
          <span>{lang === 'en' ? 'EN / اردو' : 'اردو / EN'}</span>
        </button>
      </div>
    </header>
  );
};
