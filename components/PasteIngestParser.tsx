'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, CheckCircle2, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';

interface ParsedCycle {
  startTime: string;
  endTime: string;
  startDecimal: number;
  endDecimal: number;
}

interface ParsedPreview {
  feederName: string;
  disco: string;
  city: string;
  dayOfWeek: string;
  cycles: ParsedCycle[];
  confidenceScore: number;
}

interface PasteIngestParserProps {
  onScheduleConfirmed: () => void;
  lang: 'en' | 'ur';
}

export const PasteIngestParser: React.FC<PasteIngestParserProps> = ({
  onScheduleConfirmed,
  lang,
}) => {
  const [rawText, setRawText] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [preview, setPreview] = useState<ParsedPreview | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleParseText = async () => {
    if (!rawText.trim()) return;
    try {
      setIsParsing(true);
      setPreview(null);
      setSuccessMessage('');

      const res = await fetch('/api/parse-schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawText }),
      });

      const data = await res.json();
      if (data.success) {
        setPreview(data.parsedPreview);
      }
    } catch (err) {
      console.error('Parse error:', err);
    } finally {
      setIsParsing(false);
    }
  };

  const handleConfirmSave = async () => {
    if (!preview) return;
    try {
      setIsSaving(true);
      const res = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          feederName: preview.feederName,
          discoCode: preview.disco,
          city: preview.city,
          cycles: preview.cycles,
          submittedBy: 'Community Ingest Member',
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMessage('Schedule confirmed and saved to database successfully!');
        setPreview(null);
        setRawText('');
        onScheduleConfirmed();
      }
    } catch (err) {
      console.error('Save error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-1 text-on-surface">
          {lang === 'en' ? 'Paste-to-Ingest Schedule Parser' : 'ڈسکو شیڈول انٹری اور پراسیسنگ'}
        </h1>
        <p className="text-on-surface-variant font-mono text-sm">
          Paste unstructured schedule text (Urdu, Roman Urdu, English, WhatsApp forwards) for automated LLM extraction with human-in-the-loop confirmation.
        </p>
      </div>

      {/* Raw Text Input Card */}
      <div className="bg-surface-container border border-outline-variant rounded-lg p-6 flex flex-col gap-4">
        <label className="text-xs font-mono uppercase text-on-surface-variant flex justify-between">
          <span>PASTE WHATSAPP / DISCO NOTICE TEXT</span>
          <span className="text-primary">Urdu / Roman Urdu / English Supported</span>
        </label>

        <textarea
          rows={5}
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          placeholder={`Example:\n"LESCO Gulberg 3 Feeder Load Shedding Schedule:\nCycle 1: 02:00 to 04:00 off\nCycle 2: 10:00 to 12:00 off\nCycle 3: 14:00 to 16:00 off"`}
          className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-4 text-on-surface font-mono text-sm focus:outline-none focus:border-primary transition-all resize-none"
        />

        <button
          onClick={handleParseText}
          disabled={!rawText.trim() || isParsing}
          className="w-full bg-primary text-on-primary font-mono font-bold py-3.5 rounded-lg hover:bg-primary-container transition-all flex items-center justify-center gap-2 uppercase shadow-[0_0_15px_rgba(87,241,219,0.3)] disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isParsing ? 'PARSING TEXT WITH AI...' : 'PARSE SCHEDULE TEXT'}</span>
        </button>
      </div>

      {/* Shimmer Skeleton during Parsing */}
      {isParsing && (
        <div className="bg-surface-container border border-outline-variant rounded-lg p-6 animate-pulse flex flex-col gap-3">
          <div className="h-5 w-48 bg-surface-container-highest rounded" />
          <div className="h-4 w-3/4 bg-surface-container-highest rounded" />
          <div className="h-20 w-full bg-surface-container-lowest rounded mt-2" />
        </div>
      )}

      {/* Parsed Preview Card with Framer Motion Staggered Highlight Animation */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-surface-container border-2 border-primary/50 rounded-lg p-6 relative overflow-hidden flex flex-col gap-5 shadow-2xl"
          >
            <div className="flex justify-between items-center flex-wrap gap-2 border-b border-outline-variant/40 pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-on-surface font-mono">PARSED SCHEDULE PREVIEW</h3>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/40 font-bold">
                Confidence: {Math.round(preview.confidenceScore * 100)}%
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-surface-container-lowest p-3 rounded border border-outline-variant/40"
              >
                <span className="text-[10px] font-mono text-on-surface-variant block uppercase">Extracted Feeder</span>
                <input
                  type="text"
                  value={preview.feederName}
                  onChange={(e) => setPreview({ ...preview, feederName: e.target.value })}
                  className="bg-transparent text-on-surface font-bold text-sm w-full focus:outline-none border-b border-primary/30"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.30 }}
                className="bg-surface-container-lowest p-3 rounded border border-outline-variant/40"
              >
                <span className="text-[10px] font-mono text-on-surface-variant block uppercase">Inferred DISCO & City</span>
                <div className="text-primary font-bold text-sm">{preview.disco} ({preview.city})</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 }}
                className="bg-surface-container-lowest p-3 rounded border border-outline-variant/40"
              >
                <span className="text-[10px] font-mono text-on-surface-variant block uppercase">Rotation Schedule</span>
                <div className="text-on-surface font-bold text-sm">{preview.dayOfWeek}</div>
              </motion.div>
            </div>

            {/* Cycles Grid */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono text-on-surface-variant uppercase">Extracted Outage Cycles</span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {preview.cycles.map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.15 }}
                    className="bg-surface-container-lowest border border-primary/40 p-3 rounded text-center"
                  >
                    <span className="text-[10px] font-mono text-on-surface-variant block">CYCLE {i + 1}</span>
                    <span className="text-base font-bold text-primary font-mono">{c.startTime} ~ {c.endTime}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Confirm & Save Button */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setPreview(null)}
                className="px-4 py-2 rounded text-xs font-mono text-on-surface-variant hover:bg-surface-container-highest"
              >
                Discard
              </button>
              <button
                onClick={handleConfirmSave}
                disabled={isSaving}
                className="bg-primary text-on-primary font-mono font-bold px-6 py-2.5 rounded text-sm hover:bg-primary-container transition-all flex items-center gap-2 shadow-lg"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isSaving ? 'SAVING TO DB...' : 'CONFIRM & SAVE TO DATABASE'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {successMessage && (
        <div className="p-4 bg-primary/20 border border-primary text-primary rounded-lg font-mono text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>{successMessage}</span>
        </div>
      )}
    </div>
  );
};
