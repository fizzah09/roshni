'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface OutageReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  feederId: string;
  lang: 'en' | 'ur';
}

export const OutageReportModal: React.FC<OutageReportModalProps> = ({
  isOpen,
  onClose,
  feederId,
  lang,
}) => {
  const [startTime, setStartTime] = useState(
    new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16)
  );
  const [endTime, setEndTime] = useState('');
  const [outageType, setOutageType] = useState('unscheduled');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setErrorMessage('');
      setSuccessMessage('');

      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          feederId,
          startTime,
          endTime: endTime || null,
          outageType,
          note,
          deviceId: 'device_' + Math.random().toString(36).substring(2, 9),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || 'Failed to submit report.');
      } else {
        setSuccessMessage('Outage report logged to ROSHNI database!');
        setTimeout(() => {
          onClose();
          setSuccessMessage('');
        }, 1200);
      }
    } catch (err) {
      setErrorMessage('Network error while submitting report.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        class="bg-surface-container border border-outline-variant rounded-lg p-6 w-full max-w-lg relative shadow-2xl overflow-hidden"
      >
        <div class="absolute top-0 left-0 w-full h-1 bg-error" />

        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-on-surface">
            {lang === 'en' ? 'Report Outage' : 'لوڈشیڈنگ کا اندراج'}
          </h2>
          <button
            onClick={onClose}
            class="text-on-surface-variant hover:text-on-surface p-1 rounded-md"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        {errorMessage && (
          <div class="p-3 mb-4 bg-error-container/30 border border-error text-error text-xs font-mono rounded flex items-center gap-2">
            <AlertTriangle class="w-4 h-4" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div class="p-3 mb-4 bg-primary/20 border border-primary text-primary text-xs font-mono rounded flex items-center gap-2">
            <CheckCircle2 class="w-4 h-4" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} class="flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <label class="text-xs font-mono uppercase text-on-surface-variant">Start Time</label>
            <input
              type="datetime-local"
              required
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              class="bg-surface-container-lowest border border-outline-variant rounded p-3 text-on-surface font-mono text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-xs font-mono uppercase text-on-surface-variant flex justify-between">
              <span>End Time</span>
              <span class="text-outline">Optional</span>
            </label>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              class="bg-surface-container-lowest border border-outline-variant rounded p-3 text-on-surface font-mono text-sm focus:outline-none focus:border-primary"
            />
            <span class="text-[11px] text-outline font-mono">Leave blank if outage is ongoing.</span>
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-xs font-mono uppercase text-on-surface-variant">Outage Category</label>
            <select
              value={outageType}
              onChange={(e) => setOutageType(e.target.value)}
              class="bg-surface-container-lowest border border-outline-variant rounded p-3 text-on-surface font-mono text-sm focus:outline-none focus:border-primary"
            >
              <option value="unscheduled">Unscheduled Cut / Extra Cycle</option>
              <option value="tripping">Feeder Tripping / PMT Fault</option>
              <option value="transformer">Transformer Sparking</option>
              <option value="low_voltage">Severe Low Voltage / Fluctuation</option>
            </select>
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-xs font-mono uppercase text-on-surface-variant flex justify-between">
              <span>Note</span>
              <span class="text-outline">Optional</span>
            </label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="E.g., Voltage drop before cutoff..."
              class="bg-surface-container-lowest border border-outline-variant rounded p-3 text-on-surface font-mono text-sm focus:outline-none focus:border-primary resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            class="mt-2 w-full bg-primary text-on-primary font-mono font-bold py-3.5 rounded hover:bg-primary-container transition-all flex items-center justify-center gap-2 uppercase shadow-lg disabled:opacity-50"
          >
            <Send class="w-4 h-4" />
            <span>{isSubmitting ? 'SUBMITTING REPORT...' : 'SUBMIT OUTAGE REPORT'}</span>
          </button>
        </form>
      </motion.div>
    </div>
  );
};
