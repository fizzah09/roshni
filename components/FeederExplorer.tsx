'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Download, AlertTriangle, Clock, MapPin, Zap } from 'lucide-react';
import { PakistanMap } from './PakistanMap';

export interface Feeder {
  id: string;
  name: string;
  gridStation: string;
  city: string;
  lossCategory: string;
  lossPercentage: string;
  status: string;
  description: string;
  disco: { code: string; name: string };
  schedules: Array<{
    id: string;
    source: string;
    startTime: string;
    endTime: string;
    startDecimal: number;
    endDecimal: number;
  }>;
  outages: Array<{
    id: string;
    startTime: string;
    endTime?: string;
    note?: string;
    outageType: string;
  }>;
}

interface FeederExplorerProps {
  onOpenReportModal: (feederId: string) => void;
  lang: 'en' | 'ur';
}

export const FeederExplorer: React.FC<FeederExplorerProps> = ({
  onOpenReportModal,
  lang,
}) => {
  const [feeders, setFeeders] = useState<Feeder[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDisco, setSelectedDisco] = useState('ALL');
  const [selectedFeeder, setSelectedFeeder] = useState<Feeder | null>(null);

  useEffect(() => {
    fetchFeeders();
  }, [selectedDisco]);

  const fetchFeeders = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/feeders?disco=${selectedDisco}`);
      const data = await res.json();
      setFeeders(data);
      if (data.length > 0 && !selectedFeeder) {
        setSelectedFeeder(data[0]);
      }
    } catch (err) {
      console.error('Failed to fetch feeders', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredFeeders = feeders.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.gridStation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.disco.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const downloadCSV = (feeder: Feeder) => {
    let csv = 'DISCO,Grid,Feeder Name,City,Loss Tag,Status,Cycles\n';
    const cyclesStr = feeder.schedules.map(s => `${s.startTime}~${s.endTime}`).join(' | ');
    csv += `"${feeder.disco.code}","${feeder.gridStation}","${feeder.name}","${feeder.city}","${feeder.lossCategory}","${feeder.status}","${cyclesStr}"\n`;

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ROSHNI_${feeder.disco.code}_${feeder.name.replace(/\s+/g, '_')}.csv`;
    a.click();
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      {/* Search Header */}
      <div className="flex flex-col gap-3 w-full max-w-3xl mx-auto text-center">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-on-surface">
          {lang === 'en' ? 'LOCATE FEEDER / تلاش کریں' : 'تلاش کریں - فیڈر اور بجلی کی معلومات'}
        </h1>
        <p className="text-on-surface-variant text-sm font-mono">
          National Pakistan DISCO Load Shedding Tracker & KE Territory Feeder Directory
        </p>

        {/* Search Bar */}
        <div className="relative w-full">
          <Search className="absolute left-4 top-4 w-5 h-5 text-on-surface-variant" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search DISCO (LESCO, IESCO, KE, PESCO...), Grid, City, or Feeder..."
            className="w-full bg-surface-container-lowest text-on-surface text-base border border-outline-variant rounded-lg pl-12 pr-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono"
          />
        </div>

        {/* DISCO Filter Chips */}
        <div className="flex flex-wrap gap-2 justify-center items-center mt-2">
          {['ALL', 'LESCO', 'IESCO', 'K-ELECTRIC', 'PESCO', 'MEPCO', 'GEPCO', 'FESCO'].map((disco) => (
            <button
              key={disco}
              onClick={() => setSelectedDisco(disco)}
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
                selectedDisco === disco
                  ? 'bg-primary text-on-primary border border-primary shadow-[0_0_10px_rgba(87,241,219,0.3)]'
                  : 'bg-surface-container text-on-surface-variant border border-outline-variant hover:border-primary/50'
              }`}
            >
              {disco}
            </button>
          ))}
        </div>
      </div>

      {/* Official SimpleMaps Pakistan Vector Map */}
      <PakistanMap
        selectedDisco={selectedDisco}
        onSelectDisco={(disco) => setSelectedDisco(disco)}
      />

      {/* Feeder Cards Grid */}
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex justify-between items-end border-b border-outline-variant pb-2">
          <h2 className="text-xl font-bold text-on-surface">
            {lang === 'en' ? 'FEEDERS & 24H SCHEDULE TIMELINES' : 'حالیہ فیڈرز اور 4 سائيکل شیڈول'}
          </h2>
          <span className="text-xs font-mono text-on-surface-variant">
            PERSISTENT DB DATASET
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-44 bg-surface-container animate-pulse rounded-lg border border-outline-variant" />
            ))}
          </div>
        ) : filteredFeeders.length === 0 ? (
          <div className="p-8 text-center bg-surface-container border border-outline-variant rounded-lg">
            <p className="text-on-surface-variant font-mono">No feeders found matching search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFeeders.map((feeder) => (
              <motion.div
                key={feeder.id}
                layoutId={`feeder-card-${feeder.id}`}
                whileHover={{ scale: 1.01 }}
                className="bg-surface-container border border-outline-variant rounded-lg p-4 flex flex-col justify-between gap-3 cursor-pointer hover:border-primary/60 transition-all group"
                onClick={() => setSelectedFeeder(feeder)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-mono text-on-surface-variant">
                      {feeder.disco.code} / {feeder.gridStation}
                    </span>
                    <h3 className="text-base font-bold text-on-surface group-hover:text-primary transition-colors">
                      {feeder.name}
                    </h3>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-mono font-bold border ${
                      feeder.status === 'OFFLINE'
                        ? 'border-error text-error bg-error-container/20'
                        : 'border-primary text-primary bg-primary-container/20'
                    }`}
                  >
                    {feeder.status}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs font-mono text-on-surface-variant">
                  <span>{feeder.lossCategory} ({feeder.lossPercentage})</span>
                  <span className="text-primary">{feeder.city}</span>
                </div>

                {/* 24-Hour Timeline Bar with Framer Motion Load-in Wipe (~400ms) */}
                <div className="mt-2">
                  <div className="flex justify-between text-[10px] font-mono text-on-surface-variant mb-1">
                    <span>00:00</span>
                    <span>12:00</span>
                    <span>24:00</span>
                  </div>
                  <div className="w-full h-3 bg-surface-container-lowest rounded-full overflow-hidden relative border border-outline-variant/40">
                    {/* Wiped Outage Blocks */}
                    {feeder.schedules.map((s, idx) => {
                      const leftPct = (s.startDecimal / 24) * 100;
                      const duration = s.endDecimal > s.startDecimal ? s.endDecimal - s.startDecimal : (24 - s.startDecimal) + s.endDecimal;
                      const widthPct = (duration / 24) * 100;

                      return (
                        <motion.div
                          key={s.id || idx}
                          initial={{ width: 0 }}
                          animate={{ width: `${widthPct}%` }}
                          transition={{ duration: 0.4, delay: idx * 0.1, ease: 'easeOut' }}
                          style={{ left: `${leftPct}%` }}
                          className="absolute h-full bg-gradient-to-r from-red-900/80 to-error/80 border-r border-error/50"
                        />
                      );
                    })}

                    {/* Crowd Report Ping Pulse (Scale 1 -> 1.08 -> 1) */}
                    {feeder.outages.map((o, idx) => {
                      const hourDec = new Date(o.startTime).getHours() + new Date(o.startTime).getMinutes() / 60;
                      const leftPct = (hourDec / 24) * 100;

                      return (
                        <motion.div
                          key={o.id || idx}
                          initial={{ scale: 1 }}
                          animate={{ scale: [1, 1.08, 1] }}
                          transition={{ repeat: Infinity, duration: 1.8 }}
                          style={{ left: `${leftPct}%` }}
                          className="absolute h-full w-1.5 bg-primary shadow-[0_0_8px_#57f1db] z-20"
                          title={`Reported at ${new Date(o.startTime).toLocaleTimeString()}: ${o.note || 'Unscheduled cut'}`}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-outline-variant/30 text-xs">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenReportModal(feeder.id);
                    }}
                    className="text-primary hover:underline font-mono flex items-center gap-1 font-bold"
                  >
                    <Zap className="w-3.5 h-3.5" /> Report Outage
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadCSV(feeder);
                    }}
                    className="text-on-surface-variant hover:text-on-surface font-mono flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" /> CSV
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
