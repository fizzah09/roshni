'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DiscoMetric {
  id: string;
  code: string;
  name: string;
  region: string;
  feederCount: number;
  avgSchedHours: number;
  avgActualHours: number;
  varianceHours: number;
  adherencePercentage: number;
}

interface InsightsData {
  overallReliabilityIndex: string;
  totalOutagesReported: number;
  avgUnscheduledVariance: string;
  highLossRatio: string;
  discoBreakdown: DiscoMetric[];
}

export const InsightsChart: React.FC<{ lang: 'en' | 'ur' }> = ({ lang }) => {
  const [data, setData] = useState<InsightsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/insights')
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Insights fetch failed', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div class="h-64 bg-surface-container animate-pulse rounded-lg border border-outline-variant" />
    );
  }

  if (!data) return null;

  return (
    <div class="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      <div>
        <h1 class="text-2xl md:text-3xl font-bold mb-1 text-on-surface">
          {lang === 'en' ? 'Grid Reliability & Discrepancy Analytics' : 'گریڈ بھروسہ مندی اور لوڈشیڈنگ کا تجزیہ'}
        </h1>
        <p class="text-on-surface-variant font-mono text-sm">
          Aggregate scheduled vs. actual outage comparison across DISCO territories in Pakistan.
        </p>
      </div>

      {/* Metric Cards */}
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-surface-container border border-outline-variant p-4 rounded-lg flex flex-col gap-1">
          <span class="text-xs font-mono text-on-surface-variant uppercase">Grid Reliability Index</span>
          <span class="text-3xl font-bold font-mono text-primary">{data.overallReliabilityIndex}</span>
          <span class="text-[11px] text-outline font-mono">24h telemetry feed</span>
        </div>
        <div class="bg-surface-container border border-outline-variant p-4 rounded-lg flex flex-col gap-1">
          <span class="text-xs font-mono text-on-surface-variant uppercase">Total Outages Logged</span>
          <span class="text-3xl font-bold font-mono text-error">{data.totalOutagesReported}</span>
          <span class="text-[11px] text-error font-mono">+18% vs yesterday</span>
        </div>
        <div class="bg-surface-container border border-outline-variant p-4 rounded-lg flex flex-col gap-1">
          <span class="text-xs font-mono text-on-surface-variant uppercase">Avg Unscheduled Var</span>
          <span class="text-3xl font-bold font-mono text-tertiary-container">{data.avgUnscheduledVariance}</span>
          <span class="text-[11px] text-outline font-mono">Over scheduled time</span>
        </div>
        <div class="bg-surface-container border border-outline-variant p-4 rounded-lg flex flex-col gap-1">
          <span class="text-xs font-mono text-on-surface-variant uppercase">High Loss Feeder Ratio</span>
          <span class="text-3xl font-bold font-mono text-secondary">{data.highLossRatio}</span>
          <span class="text-[11px] text-outline font-mono">Category 3 & 4</span>
        </div>
      </div>

      {/* DISCO Comparison Bar Chart (Framer Motion Growing Bars: easeOutExpo, 600ms) */}
      <div class="bg-surface-container border border-outline-variant p-6 rounded-lg flex flex-col gap-6">
        <div class="flex justify-between items-center flex-wrap gap-2">
          <h2 class="text-lg font-bold text-on-surface font-mono">
            DISCO Scheduled vs. Actual Hours Comparison
          </h2>
          <div class="flex gap-4 text-xs font-mono">
            <div class="flex items-center gap-1.5">
              <div class="w-3 h-3 bg-primary rounded-sm" />
              <span class="text-on-surface-variant">Scheduled Out (Avg)</span>
            </div>
            <div class="flex items-center gap-1.5">
              <div class="w-3 h-3 bg-error rounded-sm" />
              <span class="text-on-surface-variant">Actual Out (Reported)</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-5">
          {data.discoBreakdown.map((disco) => (
            <div key={disco.id} class="flex flex-col gap-1.5">
              <div class="flex justify-between text-xs font-mono">
                <span class="text-on-surface font-bold">{disco.name}</span>
                <span class="text-error font-bold">+{disco.varianceHours}h Variance</span>
              </div>

              {/* Stacked / Side-by-side Animated Bar */}
              <div class="w-full bg-surface-container-lowest h-6 rounded-md overflow-hidden relative border border-outline-variant/30 flex items-center p-1 gap-1">
                {/* Scheduled Bar (Primary Teal) */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(disco.avgSchedHours / 14) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  class="h-full bg-primary rounded-sm flex items-center justify-end px-2"
                >
                  <span class="text-[10px] font-bold text-on-primary font-mono">{disco.avgSchedHours}h</span>
                </motion.div>

                {/* Variance Bar (Error Red) */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(disco.varianceHours / 14) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  class="h-full bg-error rounded-sm flex items-center justify-end px-2"
                >
                  <span class="text-[10px] font-bold text-on-error font-mono">+{disco.varianceHours}h</span>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
