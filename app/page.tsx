'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { FeederExplorer } from '@/components/FeederExplorer';
import { PasteIngestParser } from '@/components/PasteIngestParser';
import { InsightsChart } from '@/components/InsightsChart';
import { OutageReportModal } from '@/components/OutageReportModal';

export default function HomePage() {
  const [currentView, setCurrentView] = useState<'home' | 'ingest' | 'insights'>('home');
  const [lang, setLang] = useState<'en' | 'ur'>('en');
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [targetFeederId, setTargetFeederId] = useState('');

  const handleOpenReportModal = (feederId: string) => {
    setTargetFeederId(feederId);
    setReportModalOpen(true);
  };

  const handleToggleLang = () => {
    const nextLang = lang === 'en' ? 'ur' : 'en';
    setLang(nextLang);
    document.documentElement.dir = nextLang === 'ur' ? 'rtl' : 'ltr';
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        currentView={currentView}
        onSelectView={(v) => setCurrentView(v as any)}
        lang={lang}
        onToggleLang={handleToggleLang}
      />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">
        {currentView === 'home' && (
          <FeederExplorer
            onOpenReportModal={handleOpenReportModal}
            lang={lang}
          />
        )}

        {currentView === 'ingest' && (
          <PasteIngestParser
            onScheduleConfirmed={() => setCurrentView('home')}
            lang={lang}
          />
        )}

        {currentView === 'insights' && (
          <InsightsChart lang={lang} />
        )}
      </main>

      <OutageReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        feederId={targetFeederId}
        lang={lang}
      />
    </div>
  );
}
