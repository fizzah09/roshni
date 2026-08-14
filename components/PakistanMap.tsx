'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PakistanMapProps {
  onSelectDisco: (disco: string) => void;
  selectedDisco: string;
}

const DISTRICT_DATA: Record<string, { disco: string; province: string; feeders: number; loss: string }> = {
  Islamabad: { disco: 'IESCO', province: 'Islamabad Capital', feeders: 180, loss: 'Low Loss (4%)' },
  Rawalpindi: { disco: 'IESCO', province: 'Punjab', feeders: 240, loss: 'Low Loss (5%)' },
  Attock: { disco: 'IESCO', province: 'Punjab', feeders: 110, loss: 'Low Loss (6%)' },
  Jhelum: { disco: 'IESCO', province: 'Punjab', feeders: 95, loss: 'Low Loss (5%)' },
  Chakwal: { disco: 'IESCO', province: 'Punjab', feeders: 85, loss: 'Low Loss (4%)' },

  Lahore: { disco: 'LESCO', province: 'Punjab', feeders: 450, loss: 'High Loss (22%)' },
  Kasur: { disco: 'LESCO', province: 'Punjab', feeders: 130, loss: 'High Loss (24%)' },
  Shaikhupura: { disco: 'LESCO', province: 'Punjab', feeders: 160, loss: 'Medium Loss (16%)' },
  Okara: { disco: 'LESCO', province: 'Punjab', feeders: 140, loss: 'Medium Loss (15%)' },

  Gujranwala: { disco: 'GEPCO', province: 'Punjab', feeders: 220, loss: 'Low-Medium Loss (10%)' },
  Sialkot: { disco: 'GEPCO', province: 'Punjab', feeders: 190, loss: 'Low Loss (8%)' },
  Gujrat: { disco: 'GEPCO', province: 'Punjab', feeders: 140, loss: 'Low Loss (7%)' },
  Narowal: { disco: 'GEPCO', province: 'Punjab', feeders: 80, loss: 'Medium Loss (12%)' },
  Hafizabad: { disco: 'GEPCO', province: 'Punjab', feeders: 70, loss: 'Low-Medium Loss (9%)' },
  Mandi_Bahauddin: { disco: 'GEPCO', province: 'Punjab', feeders: 75, loss: 'Low Loss (8%)' },

  Faisalabad: { disco: 'FESCO', province: 'Punjab', feeders: 320, loss: 'Medium Loss (12%)' },
  Jhang: { disco: 'FESCO', province: 'Punjab', feeders: 140, loss: 'High Loss (20%)' },
  Sargodha: { disco: 'FESCO', province: 'Punjab', feeders: 180, loss: 'Medium Loss (14%)' },
  Toba_Tek_Singh: { disco: 'FESCO', province: 'Punjab', feeders: 110, loss: 'Low-Medium Loss (10%)' },
  Chiniot: { disco: 'FESCO', province: 'Punjab', feeders: 90, loss: 'Medium Loss (15%)' },
  Khushab: { disco: 'FESCO', province: 'Punjab', feeders: 80, loss: 'Medium Loss (13%)' },
  Bhakkar: { disco: 'FESCO', province: 'Punjab', feeders: 75, loss: 'High Loss (22%)' },
  Mianwali: { disco: 'FESCO', province: 'Punjab', feeders: 95, loss: 'Medium Loss (18%)' },

  Multan: { disco: 'MEPCO', province: 'Punjab', feeders: 280, loss: 'Medium Loss (15%)' },
  Sahiwal: { disco: 'MEPCO', province: 'Punjab', feeders: 150, loss: 'Medium Loss (14%)' },
  Bahawalpur: { disco: 'MEPCO', province: 'Punjab', feeders: 210, loss: 'High Loss (22%)' },
  Rahimyar_Khan: { disco: 'MEPCO', province: 'Punjab', feeders: 230, loss: 'High Loss (25%)' },
  Dera_Ghazi_Khan: { disco: 'MEPCO', province: 'Punjab', feeders: 160, loss: 'Very High Loss (30%)' },
  Vehari: { disco: 'MEPCO', province: 'Punjab', feeders: 120, loss: 'Medium Loss (16%)' },
  Khanewal: { disco: 'MEPCO', province: 'Punjab', feeders: 130, loss: 'Medium Loss (15%)' },
  Lodhran: { disco: 'MEPCO', province: 'Punjab', feeders: 85, loss: 'High Loss (24%)' },
  Pakpattan: { disco: 'MEPCO', province: 'Punjab', feeders: 90, loss: 'Medium Loss (16%)' },
  Muzaffargarh: { disco: 'MEPCO', province: 'Punjab', feeders: 140, loss: 'High Loss (26%)' },
  Rajanpur: { disco: 'MEPCO', province: 'Punjab', feeders: 95, loss: 'Very High Loss (32%)' },
  Layyah: { disco: 'MEPCO', province: 'Punjab', feeders: 85, loss: 'High Loss (22%)' },

  Karachi: { disco: 'K-ELECTRIC', province: 'Sindh', feeders: 480, loss: '4-Cycle Rotation (24%)' },
  Thatta: { disco: 'HESCO', province: 'Sindh', feeders: 90, loss: 'High Loss (28%)' },
  Badin: { disco: 'HESCO', province: 'Sindh', feeders: 110, loss: 'High Loss (26%)' },
  Hyderabad: { disco: 'HESCO', province: 'Sindh', feeders: 260, loss: 'High Loss (24%)' },
  Jamshoro: { disco: 'HESCO', province: 'Sindh', feeders: 120, loss: 'High Loss (22%)' },
  Dadu: { disco: 'HESCO', province: 'Sindh', feeders: 115, loss: 'High Loss (25%)' },
  Mirpur_Khas: { disco: 'HESCO', province: 'Sindh', feeders: 130, loss: 'High Loss (27%)' },
  Umerkot: { disco: 'HESCO', province: 'Sindh', feeders: 75, loss: 'Very High Loss (31%)' },
  Tharparkar: { disco: 'HESCO', province: 'Sindh', feeders: 85, loss: 'Very High Loss (34%)' },

  Sukkur: { disco: 'SEPCO', province: 'Sindh', feeders: 170, loss: 'Very High Loss (30%)' },
  Khairpur: { disco: 'SEPCO', province: 'Sindh', feeders: 140, loss: 'Very High Loss (32%)' },
  Larkana: { disco: 'SEPCO', province: 'Sindh', feeders: 150, loss: 'Very High Loss (33%)' },
  Ghotki: { disco: 'SEPCO', province: 'Sindh', feeders: 110, loss: 'High Loss (28%)' },
  Kashmore: { disco: 'SEPCO', province: 'Sindh', feeders: 80, loss: 'Very High Loss (35%)' },
  Jacobabad: { disco: 'SEPCO', province: 'Sindh', feeders: 90, loss: 'Very High Loss (36%)' },
  Shikarpur: { disco: 'SEPCO', province: 'Sindh', feeders: 85, loss: 'Very High Loss (34%)' },
  Nawabshah: { disco: 'SEPCO', province: 'Sindh', feeders: 125, loss: 'Very High Loss (29%)' },
  Sanghar: { disco: 'SEPCO', province: 'Sindh', feeders: 135, loss: 'High Loss (27%)' },

  Peshawar: { disco: 'PESCO', province: 'Khyber Pakhtunkhwa', feeders: 310, loss: 'Very High Loss (32%)' },
  Swat: { disco: 'PESCO', province: 'Khyber Pakhtunkhwa', feeders: 140, loss: 'High Loss (24%)' },
  Mardan: { disco: 'PESCO', province: 'Khyber Pakhtunkhwa', feeders: 160, loss: 'High Loss (26%)' },
  Abbotabad: { disco: 'PESCO', province: 'Khyber Pakhtunkhwa', feeders: 120, loss: 'Medium Loss (15%)' },
  Nowshera: { disco: 'PESCO', province: 'Khyber Pakhtunkhwa', feeders: 130, loss: 'High Loss (28%)' },
  Swabi: { disco: 'PESCO', province: 'Khyber Pakhtunkhwa', feeders: 110, loss: 'High Loss (25%)' },
  Charsadda: { disco: 'PESCO', province: 'Khyber Pakhtunkhwa', feeders: 95, loss: 'Very High Loss (34%)' },
  Kohat: { disco: 'PESCO', province: 'Khyber Pakhtunkhwa', feeders: 105, loss: 'High Loss (27%)' },
  Dera_Ismail_Khan: { disco: 'PESCO', province: 'Khyber Pakhtunkhwa', feeders: 125, loss: 'Very High Loss (36%)' },

  Quetta: { disco: 'QESCO', province: 'Balochistan', feeders: 210, loss: 'Extreme Loss (38%)' },
  Gwadar: { disco: 'QESCO', province: 'Balochistan', feeders: 75, loss: 'High Loss (26%)' },
  Khuzdar: { disco: 'QESCO', province: 'Balochistan', feeders: 85, loss: 'Extreme Loss (40%)' },
  Kech: { disco: 'QESCO', province: 'Balochistan', feeders: 90, loss: 'Extreme Loss (37%)' },
  Lasbela: { disco: 'QESCO', province: 'Balochistan', feeders: 110, loss: 'Medium Loss (18%)' },
};

export const PakistanMap: React.FC<PakistanMapProps> = ({
  onSelectDisco,
  selectedDisco,
}) => {
  const [zoomScale, setZoomScale] = useState(1);
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

  const handleZoomIn = () => setZoomScale(prev => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomScale(prev => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomScale(1);

  const currentData = hoveredDistrict && DISTRICT_DATA[hoveredDistrict] ? DISTRICT_DATA[hoveredDistrict] : null;

  return (
    <div class="bg-surface-container border border-outline-variant rounded-lg p-4 relative overflow-hidden flex flex-col gap-3">
      <div class="flex justify-between items-center flex-wrap gap-2">
        <div>
          <h2 class="text-xl font-bold text-on-surface flex items-center gap-2">
            <span class="text-primary font-mono">🌐</span>
            <span>NATIONAL PAKISTAN DISTRICT VECTOR MAP</span>
          </h2>
          <p class="text-xs text-on-surface-variant font-mono">
            Hover over any district to inspect feeder counts, loss categories, and DISCO territories. Click to filter.
          </p>
        </div>
      </div>

      <div class="relative w-full h-[540px] bg-surface-container-lowest border border-outline-variant/40 rounded overflow-hidden flex items-center justify-center">
        {/* Zoom Controls */}
        <div class="absolute top-4 left-4 z-30 flex flex-col gap-2">
          <button
            onClick={handleZoomIn}
            class="w-9 h-9 bg-white text-surface-dim font-bold text-xl rounded-md shadow-lg hover:bg-primary transition-all flex items-center justify-center border border-slate-300"
            title="Zoom In"
          >
            +
          </button>
          <button
            onClick={handleZoomOut}
            class="w-9 h-9 bg-white text-surface-dim font-bold text-xl rounded-md shadow-lg hover:bg-primary transition-all flex items-center justify-center border border-slate-300"
            title="Zoom Out"
          >
            −
          </button>
          <button
            onClick={handleResetZoom}
            class="w-9 h-9 bg-white text-surface-dim font-bold text-xs rounded-md shadow-lg hover:bg-primary transition-all flex items-center justify-center border border-slate-300"
            title="Reset View"
          >
            ↺
          </button>
        </div>

        {/* SVG District Vector Canvas */}
        <motion.svg
          id="map"
          viewBox="0 0 1628 1544"
          class="w-full h-full cursor-pointer"
          animate={{ scale: zoomScale }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        >
          {/* Islamabad Capital Territory Group */}
          <g class="model-green">
            <a id="state_isl" class="state">
              <motion.path
                id="Islamabad"
                d="m 1246.3,392.4 -3.2,-4.2 -2.8,0.2 -10.6,-7.8 -25.6,9.2 -11.8,3.6 6.4,13.8 18,-8.8 6.8,10.2 -3.8,3 6,4.8 11.2,-7.2 1.6,-9 z"
                fill={selectedDisco === 'IESCO' ? '#e91e63' : '#e91e63'}
                stroke="#ffffff"
                strokeWidth={2}
                whileHover={{ scale: 1.15, fill: '#ff2a6d' }}
                onClick={() => onSelectDisco('IESCO')}
                onMouseEnter={() => setHoveredDistrict('Islamabad')}
                onMouseLeave={() => setHoveredDistrict(null)}
              />
            </a>
          </g>

          {/* Balochistan Group */}
          <g id="Balochistan" fill="#6A93AC" stroke="#ffffff" strokeWidth="1.5" transform="translate(-27.1,-28.1)">
            {[
              { id: 'Ziarat', d: 'm 711.2,780.9 -9.4,-2.6 -6.6,8 -5,0 -2.4,-6.2 -6.2,-1.8 -14.4,11.4 -7.2,9.8 4.4,9 5.4,2.8 1,-4.2 29,10.2 18.6,-11.2 -4,-5.6 7,-7.8 0,-6.2 -8.2,0 z' },
              { id: 'Zhob', d: 'm 729.2,682.9 6.2,24 16.6,5 47.2,-19 12,4.4 1.8,26.6 38.8,-2.6 16.2,12.2 11.6,-2.4 -10.8,23.2 -22.2,10 8.4,9.6 42.4,22.8 -9,-13.2 7.6,-20.6 18.8,-26.4 0.4,-36.6 21,5.6 5,-12.2 -34,-20.2 -21.4,-27.8 -26.2,-12.4 -7.8,16.8 -10,8.8 -7.2,-2.2 -5.2,5 -9.2,-1 -8.8,-9.8 -1.4,-8.6 -6.2,-0.6 -7,-6 -13.8,7.4 -14.6,0.8 -11.8,-9 -10.4,15.6 -20,12 12.2,11.8 z' },
              { id: 'Washuk', d: 'm 407.8,1088.5 14.2,25.8 -7.8,14 26.4,41 -30.2,16.2 -26.8,-33.8 -31.4,35.4 -28.2,-32.2 -65.8,8 -24,5.6 -16,-4.8 6.8,-36.2 -8,-53.8 54,-32.4 59.2,-6.4 88.6,-40.2 -6.2,45.8 4.2,26.2 z' },
              { id: 'Quetta', d: 'm 664.4,808.5 -4.4,-9 -7.8,1.4 -5.4,6.8 -12,-16.6 -7,0.4 -14.2,33.8 -19.8,-2 -6.6,7 -8.8,-3.4 -14.4,12.4 11.8,9.6 -10.6,13.2 29.4,6.4 20,-36.2 12,13.2 19.8,-5.8 1.2,-13.2 19.6,-6.4 2.6,-8.8 z' },
              { id: 'Gwadar', d: 'm 150.4,1397.2 -3.6,6 3.8,5.4 -24.8,2 -1.6,6.2 -10.8,-1 4.6,-17 -16.6,-1.4 10.2,-54 -2.8,-14.6 8,-0.4 22.2,12 6.8,-15.6 1.2,27.6 13,6.6 22,-9.4 54.4,-3 42.4,12.4 7.8,14.6 57.2,-27.6 14.8,5.4 -4.6,10.8 25.8,3.6 34,-11.6 48,-1.8 1.8,25.4 -7,9.2 -8.6,-1.8 -29.4,-1.6 -10.4,4.6 -2.4,7.4 4.6,4.6 -6,1.8 -4.4,-1.2 3,-4 -9,-7.2 -10.8,4.6 -17.8,-9.6 -13.4,-1.4 -4,-8.6 5.4,-2.4 1.8,-3 -11.4,-0.4 -6.2,4 3.2,3.2 2.6,-3 3.6,8.4 -14.2,0.8 -18.2,-5.8 -17.6,2.8 -10,8.8 5.2,8.2 -1.4,2.4 -40.2,-7 -10,4.4 -27,-5.2 -27,2.4 1.8,3 -14.6,7.2 5.2,5.6 -10.6,0 2.4,-9.6 -8.6,-4.2 z' },
              { id: 'Khuzdar', d: 'm 651.4,1332.2 -12.2,3.4 -22,-85.8 -24.8,4.4 -27.6,-5.6 -3.6,-10 -13.8,21 -12.8,-25 15.8,-69.7 -16.8,7.4 -7.8,-20.6 -23.2,-9 13.2,-36.4 24.6,-24.8 15,0.2 34.4,-23.8 9,-15 -15,-13.6 11,-19.2 8.8,1.6 19,-30.6 42.8,0.6 2.4,14 -8.4,20.4 1.8,18.2 17.8,0 4,13.8 -4.6,43 -15.8,33.6 -9.6,29.2 1.4,73.3 -17.8,15.2 20.2,34.8 z' },
              { id: 'Lasbela', d: 'm 598.4,1376.6 -3.4,0.4 2.4,5.4 15.6,15.6 -5,34.4 2.4,0.8 17,-14.6 6.8,-0.6 8,-9.4 0.4,-7.2 10.6,-10.8 3.4,-18.2 20.8,-27.2 7.2,-21.8 0.6,-29.6 -22.8,-39.8 -8,-26.8 -17.8,15.2 20.2,34.8 -5.4,55 -12.2,3.4 -22,-85.8 -24.8,4.4 -27.6,-5.6 -5,16.8 9.4,52.8 -13.2,31.2 -23.6,8 -38,-1.4 -1.2,-15.2 -31.4,11.6 1.8,25.4 5.8,1 5.2,-3 4,3.2 6.8,-2.2 21.2,4.4 19,-8.6 44.4,-5.8 19,8 1.8,-0.8 -4.8,-6 2.8,-2.6 -4.2,-1.4 -2.4,1.4 -8.4,-8.2 -7.6,1 -5,6.2 -7.8,-2 2.4,-6.4 11.2,-5.2 4.4,1.4 6.2,-3 13.6,13.2 1.6,-1.6 z' },
            ].map((shape) => (
              <motion.path
                key={shape.id}
                id={shape.id}
                d={shape.d}
                fill={selectedDisco === 'QESCO' ? '#ffb4ab' : '#6A93AC'}
                whileHover={{ fill: '#57f1db', strokeWidth: 2.5 }}
                onClick={() => onSelectDisco('QESCO')}
                onMouseEnter={() => setHoveredDistrict(shape.id)}
                onMouseLeave={() => setHoveredDistrict(null)}
              />
            ))}
          </g>

          {/* Sindh Group */}
          <g id="Sindh" fill="#6A93AC" stroke="#ffffff" strokeWidth="1.5" transform="translate(-27.1,-28.1)">
            {[
              { id: 'Karachi', d: 'm 671.6,1403.2 19,13.4 3.2,10.6 3.2,23.4 -13,-7.6 -18.6,7.8 -2.2,-4.2 -5,2.4 -10.6,-5 -0.2,3.6 -12,-8.6 0.2,4.2 -9.8,-5.8 -20.4,3.4 5,-7.6 17,-14.6 6.8,-0.6 8,-9.4 0.4,-7.2 10.6,-10.8 3.4,-18.2 20.8,-27.2 9.2,11.4 -2.2,17.8 z', disco: 'K-ELECTRIC' },
              { id: 'Hyderabad', d: 'm 800.2,1408.2 2.2,4.2 11.4,-5.6 0.4,-11.2 -0.8,-5.8 -5.4,0.2 -3.8,-5.8 4.4,-5.8 -3.2,-13.6 6.4,-9.8 -0.6,-10 -15,-18.8 -7.6,5.4 3.6,13.2 -10.8,7.6 3.4,9 -10.2,7.8 6.6,21.4 -11.4,-1.6 2.4,19.2 z', disco: 'HESCO' },
              { id: 'Thatta', d: 'm 689.8,1550.2 11.4,3.2 3.2,-9.4 3,15.6 6.6,-0.4 -2.2,-5.2 11.8,3.6 2,-11.6 16.6,16.6 -1.4,-19.6 5.6,2.4 3.4,12.6 -5,9.6 4.6,2.8 1,-3.8 4.4,5 0.8,-24.2 3.8,14.4 4.6,-14.4 12.8,-9.6 38,2.2 1.4,-36.4 -2,-10.2 -30,-4.6 -3.4,-38.8 -9.4,-11 2.6,-9 -4.2,-12.2 2.4,-9.6 -2.4,-19.2 -7.4,-0.4 -14.6,-16.8 -10.8,10.4 0.2,7.4 -8.8,6 0,15.6 -9.8,10.6 -24.8,5.4 3.2,23.4 -13,-7.6 -18.6,7.8 -6,3 -5,8 1,4 5.6,-0.4 4,3.2 -6,3.2 3.8,3.8 2.8,12.6 2.8,-2.6 -0.8,9 8.2,1.8 -7.2,3.4 5,25.6 19.8,4 0.2,13.4 z', disco: 'HESCO' },
              { id: 'Badin', d: 'm 784.2,1488.8 30,4.6 2,10.2 6.2,-3.4 3,12.2 6.8,-10.8 7,8.2 9.8,-5 -1.2,-18.4 16.4,-10.8 1.6,-17.8 9,-14.2 -2.8,-14.4 -10.2,-3.4 -18.6,-17.6 -4,-22 -6.2,9.4 -18.8,0 -0.4,11.2 -11.4,5.6 15.4,13.8 -1,7.2 -7.2,-0.6 -8,5.8 -6.4,-2.4 -14.4,13.8 z', disco: 'HESCO' },
              { id: 'Sukkur', d: 'm 830.2,1154.7 17.6,14.4 43.2,20 7.4,-18.8 23.8,-24.6 -20.6,-8 0.2,-7.6 -20.6,-1.6 -17.8,-22.2 10,-1 -9.2,-29 -10.6,-3 -23.8,24.4 -12.4,2.6 -5.6,6.4 8.8,6.2 12,0 -6.2,19.4 9.2,6.8 z', disco: 'SEPCO' },
              { id: 'Larkana', d: 'm 773,1152.1 9.2,-1.8 -8.2,-14.8 8.2,-12.8 16.2,-3.6 -5.4,-6.6 -19,-26.2 -11.6,-2.4 3,10.8 5.6,3.4 -8.6,19 -8.4,22.6 1,12.4 -7.2,9 -4.4,8.6 9.2,9.6 12.8,-13.8 z', disco: 'SEPCO' },
            ].map((shape) => (
              <motion.path
                key={shape.id}
                id={shape.id}
                d={shape.d}
                fill={selectedDisco === shape.disco ? '#ffb4ab' : '#6A93AC'}
                whileHover={{ fill: '#57f1db', strokeWidth: 2.5 }}
                onClick={() => onSelectDisco(shape.disco)}
                onMouseEnter={() => setHoveredDistrict(shape.id)}
                onMouseLeave={() => setHoveredDistrict(null)}
              />
            ))}
          </g>

          {/* Punjab Group */}
          <g id="Punjab" fill="#6A93AC" stroke="#ffffff" strokeWidth="1.5" transform="translate(-27.1,-28.1)">
            {[
              { id: 'Lahore', d: 'm 1346.4,690.9 4.4,-0.6 9.8,-10.6 7.4,-19.4 18.2,-2.6 5.2,-14.6 12.4,34 -9,19.6 -8.2,-2 -2.6,4.6 -18.2,6 -21.8,-6 z', disco: 'LESCO' },
              { id: 'Kasur', d: 'm 1344,699.3 21.8,6 18.2,-6 2.6,-4.6 8.2,2 -0.4,18.6 11.8,3 2.4,4.8 -4.8,5 -8.6,-4.8 -0.6,8.2 -18.2,12.2 -13.4,19.2 -14,-3.8 -10.8,-9.6 -12.6,-1.8 -17.8,-21.2 0,-10.8 9.2,-5.4 12,-3 5.4,-5.6 z', disco: 'LESCO' },
              { id: 'Rawalpindi', d: 'm 1278,390.2 13.2,-6 8.6,35.9 -3,8.6 6.2,11.2 -6.2,17.8 6.6,17.8 -17.6,8.4 -9.8,-2.2 -3.2,11 -18.2,3.8 -11.8,3.2 -13.8,-11.2 -30,-7.6 8.8,-18.2 17.6,-11.6 -7.8,-18.2 -9,-2.8 3.6,-6.6 -8.2,-9.6 5.8,-5.2 3.8,3.2 12,-3 -5.2,4.8 10.8,4.2 -11.8,3.6 6.4,13.8 18,-8.8 6.8,10.2 -3.8,3 6,4.8 11.2,-7.2 1.6,-9 7.8,-7.8 -3.2,-4.2 -2.8,0.2 -10.6,-7.8 16.6,-9.2 z', disco: 'IESCO' },
              { id: 'Gujranwala', d: 'm 1359,567.3 3.8,6.4 3.8,13.8 11.6,9.6 9,2.2 6.8,8.8 0.8,5.4 -16,15 -18,2.6 -4.2,6.6 -3.4,-5.2 -25,1.8 2.4,-11.2 -8.2,1 3.4,-8.8 -3.6,-12 -7.8,-9.4 -4.2,-13.2 17.6,-9.6 11,0.6 20.2,-15.8 z', disco: 'GEPCO' },
              { id: 'Sialkot', d: 'm 1381.6,541.9 3,-20.8 8.4,9.2 16.6,-11.4 -4.8,14 -1.6,14.4 6.4,12.4 12,-1.2 8,2.8 -6.8,9.2 -4,9.2 -8.6,8.4 1.4,8.4 -8.4,3 -3.4,8.2 -5.8,0.4 -6.8,-8.8 -9,-2.2 -11.6,-9.6 -3.8,-13.8 -3.8,-6.4 0,-11.4 13.2,-2.8 z', disco: 'GEPCO' },
              { id: 'Faisalabad', d: 'm 1216.2,720.7 3.4,8.4 -10,12.8 5,7.6 -2,9.4 7.2,3.4 8,2.4 38.6,-22.8 7.8,-8.8 1.2,-8.6 10,-9.6 20.8,-13.8 4,-10.2 -8.6,-8.8 -8.6,3.8 -8,-20.8 -16.6,-15 -8,-6.6 -40.8,45.4 1.2,5.8 4.8,6.2 z', disco: 'FESCO' },
              { id: 'Multan', d: 'm 1067.6,904.3 12.8,6.4 5.4,-41.2 21.8,-25.6 16.6,-27.6 -33.6,-18.8 -30,54 1.6,27 -13.4,6.6 -0.8,24.8 z', disco: 'MEPCO' },
              { id: 'Bahawalpur', d: 'm 1168.6,881.1 -6,0.4 -68.2,32 -14,-2.8 -12.8,-6.4 -19.6,5.6 -13.8,25 5.4,18.6 8.4,-4 -11,53.8 27.2,89.8 50.2,-7 15.4,-6.2 2.2,-17.4 26.2,-28 11.8,-35.2 9.4,-12.8 20.8,-11.6 -8,-25.8 -12.6,0 -3.6,-12.6 6,-5.8 39.8,0 4.2,-13.8 -12,-7 8.4,-27.2 -15.8,-17 -0.2,-11.6 -12.6,-3.8 -17.2,5.6 z', disco: 'MEPCO' },
            ].map((shape) => (
              <motion.path
                key={shape.id}
                id={shape.id}
                d={shape.d}
                fill={selectedDisco === shape.disco ? '#ffb4ab' : '#6A93AC'}
                whileHover={{ fill: '#57f1db', strokeWidth: 2.5 }}
                onClick={() => onSelectDisco(shape.disco)}
                onMouseEnter={() => setHoveredDistrict(shape.id)}
                onMouseLeave={() => setHoveredDistrict(null)}
              />
            ))}
          </g>

          {/* Khyber Pakhtunkhwa Group */}
          <g id="Khyber Pakhtunkhwa" fill="#6A93AC" stroke="#ffffff" strokeWidth="1.5" transform="translate(-27.1,-28.1)">
            {[
              { id: 'Peshawar', d: 'm 1089,406.1 0.2,9 9.4,3 10.6,-3.8 4.2,-7.2 3.4,-14.9 -5.4,-17.2 -25.6,-12.4 -9.8,13 5,25.9 z' },
              { id: 'Swat', d: 'm 1169,244.4 -17.6,40 7.8,13 -7.4,9.6 2.6,10.2 7,0 27.8,-15.4 6.6,-33.4 12.8,-19.4 7,-19.8 -4.6,-6.4 11.4,-50.8 -15.4,4.4 -15.8,-9.4 -13.2,19.2 -16.4,1 -1,4.2 14.6,24 z' },
              { id: 'Mardan', d: 'm 1121.8,350.4 10.6,18.4 20.8,5.6 7.2,-2.8 1.8,-16.8 9.8,-2.6 10.2,-14.6 -18.8,-6 -2.4,-7.2 -21.2,1.8 -15.6,15.8 z' },
              { id: 'Abbotabad', d: 'm 1291.2,384.2 -11.4,-44.6 3.6,-10.8 -11,2 -15.8,16 -20.2,3.4 10.8,14.2 -1,6.6 9.4,0 -4.6,14.4 8.8,3.8 -3,19.5 16.6,-9.2 4.6,-9.3 z' },
            ].map((shape) => (
              <motion.path
                key={shape.id}
                id={shape.id}
                d={shape.d}
                fill={selectedDisco === 'PESCO' ? '#ffb4ab' : '#6A93AC'}
                whileHover={{ fill: '#57f1db', strokeWidth: 2.5 }}
                onClick={() => onSelectDisco('PESCO')}
                onMouseEnter={() => setHoveredDistrict(shape.id)}
                onMouseLeave={() => setHoveredDistrict(null)}
              />
            ))}
          </g>
        </motion.svg>

        {/* Hover Tooltip Card */}
        {hoveredDistrict && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            class="absolute bottom-4 right-4 z-40 bg-surface-container/95 backdrop-blur-md border border-primary/50 p-4 rounded-lg shadow-2xl max-w-xs"
          >
            <div class="flex justify-between items-center mb-1">
              <span class="text-xs font-mono text-primary font-bold">
                {currentData ? currentData.disco : 'NATIONAL DISCO'}
              </span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface font-mono">
                {currentData ? currentData.province : 'Pakistan'}
              </span>
            </div>
            <div class="text-base font-bold text-on-surface mb-1">
              {hoveredDistrict.replace(/_/g, ' ')}
            </div>
            {currentData ? (
              <div class="text-xs text-on-surface-variant space-y-1">
                <div><strong>Loss Profile:</strong> <span class="text-error">{currentData.loss}</span></div>
                <div><strong>Active Feeders:</strong> {currentData.feeders}</div>
                <div class="text-primary text-[11px] pt-1 flex items-center gap-1">
                  <span>Click district to filter feeders</span>
                </div>
              </div>
            ) : (
              <div class="text-xs text-on-surface-variant">Official Pakistan District Vector Territory</div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};
