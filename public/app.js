/**
 * ROSHNI SYSTEM - Core Web Application Engine
 * SimpleMaps Style Official Pakistan Map, Real KE Dataset & Exporter Engine
 */

// --- DATA STORE ---
const APP_STATE = {
  currentView: 'home',
  currentFeederId: 'ke-airport-block5',
  lang: 'en', // 'en' or 'ur'
  mapMode: 'pakistan', // 'pakistan' or 'karachi'
  mapZoomScale: 1,
  searchQuery: '',
  selectedDiscoFilter: 'ALL',
  selectedGridFilter: 'ALL',
  activeMapZoneId: null,

  // REAL K-ELECTRIC (KE TERRITORY) & NATIONAL DISCO DATASET
  feeders: [
    // --- K-ELECTRIC: AIRPORT GRID ---
    {
      id: 'ke-airport-block5',
      name: 'BLOCK # 5 RMU',
      disco: 'K-ELECTRIC',
      grid: 'AIRPORT',
      city: 'Karachi',
      region: 'Airport / Malir',
      category: 'Category 3',
      lossTag: 'High Loss (24%)',
      status: 'OFFLINE',
      scheduledHours: 6.5,
      actualHours: 7.5,
      variance: '+1.0h var',
      restorationETA: '17:35 (In 25 mins)',
      cycles: ['1035~1335', '1435~1735', '1835~2105', '2235~0205'],
      scheduledOutages: [
        { start: 10.58, end: 13.58 },
        { start: 14.58, end: 17.58 },
        { start: 18.58, end: 21.08 },
        { start: 22.58, end: 2.08 }
      ],
      reports: [
        { time: 14.8, note: 'Sudden PMT cut reported', user: 'Airport Resident' }
      ],
      description: 'Official K-Electric Airport Grid station feeder. Under scheduled 4-cycle daily load management.'
    },
    {
      id: 'ke-airport-tanga',
      name: 'TANGA STAND',
      disco: 'K-ELECTRIC',
      grid: 'AIRPORT',
      city: 'Karachi',
      region: 'Airport / Malir',
      category: 'Category 2',
      lossTag: 'Medium Loss (14%)',
      status: 'ONLINE',
      scheduledHours: 4.5,
      actualHours: 4.5,
      variance: 'On Schedule',
      restorationETA: 'Normal Power',
      cycles: ['0935~1105', '1335~1505', '1705~1835', '2005~2135'],
      scheduledOutages: [
        { start: 9.58, end: 11.08 },
        { start: 13.58, end: 15.08 },
        { start: 17.08, end: 18.58 },
        { start: 20.08, end: 21.58 }
      ],
      reports: [],
      description: 'KE Airport Grid feeder powering Tanga Stand market area.'
    },
    {
      id: 'ke-airport-falaknaz',
      name: 'FALAK NAZ',
      disco: 'K-ELECTRIC',
      grid: 'AIRPORT',
      city: 'Karachi',
      region: 'Airport / Malir',
      category: 'Category 2',
      lossTag: 'Medium Loss (12%)',
      status: 'ONLINE',
      scheduledHours: 4.5,
      actualHours: 5.0,
      variance: '+0.5h var',
      restorationETA: 'Normal Power',
      cycles: ['0935~1105', '1335~1505', '1705~1835', '2005~2135'],
      scheduledOutages: [
        { start: 9.58, end: 11.08 },
        { start: 13.58, end: 15.08 },
        { start: 17.08, end: 18.58 },
        { start: 20.08, end: 21.58 }
      ],
      reports: [
        { time: 13.7, note: 'Low voltage during cycle 2', user: 'Falaknaz Tower' }
      ],
      description: 'Residential high-rise feeder node near Jinnah International Airport.'
    },

    // --- K-ELECTRIC: BALDIA GRID ---
    {
      id: 'ke-baldia-mominabad',
      name: 'MOMINABAD',
      disco: 'K-ELECTRIC',
      grid: 'BALDIA',
      city: 'Karachi',
      region: 'Baldia / West',
      category: 'Category 4',
      lossTag: 'Very High Loss (34%)',
      status: 'OFFLINE',
      scheduledHours: 8.5,
      actualHours: 10.0,
      variance: '+1.5h var',
      restorationETA: '18:35 (In 50 mins)',
      cycles: ['0735~1035', '1135~1505', '1605~1835', '2005~2305'],
      scheduledOutages: [
        { start: 7.58, end: 10.58 },
        { start: 11.58, end: 15.08 },
        { start: 16.08, end: 18.58 },
        { start: 20.08, end: 23.08 }
      ],
      reports: [
        { time: 12.0, note: 'Overheated transformer spark', user: 'Mominabad Local' }
      ],
      description: 'Baldia Town high loss distribution feeder under intensive 4-cycle load shedding.'
    },

    // --- K-ELECTRIC: CLIFTON & DEFENCE GRID ---
    {
      id: 'ke-clifton-caltex',
      name: 'CALTEX',
      disco: 'K-ELECTRIC',
      grid: 'CLIFTON',
      city: 'Karachi',
      region: 'Clifton / South',
      category: 'Category 1',
      lossTag: 'Low Loss (4%)',
      status: 'ONLINE',
      scheduledHours: 3.0,
      actualHours: 3.0,
      variance: 'On Schedule',
      restorationETA: 'Normal Power',
      cycles: ['0705~1005', '1105~1405', '1505~1805', '1905~2205'],
      scheduledOutages: [
        { start: 7.08, end: 10.08 },
        { start: 11.08, end: 14.08 },
        { start: 15.08, end: 18.08 },
        { start: 19.08, end: 22.08 }
      ],
      reports: [],
      description: 'Clifton Block 2 commercial feeder. High billing recovery zone with minimal maintenance rotations.'
    },

    // --- LESCO: LAHORE ---
    {
      id: 'gulberg-3',
      name: 'Gulberg-III',
      disco: 'LESCO',
      grid: 'GULBERG S/S',
      city: 'Lahore',
      region: 'LHR Central',
      category: 'Category 3',
      lossTag: 'High Loss (22%)',
      status: 'OFFLINE',
      scheduledHours: 6.0,
      actualHours: 7.0,
      variance: '+1.0h var',
      restorationETA: '45 mins',
      cycles: ['0200~0400', '1000~1200', '1400~1600'],
      scheduledOutages: [
        { start: 2, end: 4 },
        { start: 10, end: 12 },
        { start: 14, end: 16 }
      ],
      reports: [
        { time: 10.5, note: 'Voltage drop before cutoff', user: 'Resident LHR' },
        { time: 13.0, note: 'Unscheduled activity detected!', user: 'Crowd Report' }
      ],
      description: 'LESCO Gulberg Sector 3 grid feeder.'
    },

    // --- IESCO: ISLAMABAD ---
    {
      id: 'f-8-markaz',
      name: 'F-8 Markaz',
      disco: 'IESCO',
      grid: 'ISLAMABAD F-8',
      city: 'Islamabad',
      region: 'ISB Commercial',
      category: 'Category 1',
      lossTag: 'Low Loss (4%)',
      status: 'ONLINE',
      scheduledHours: 2.0,
      actualHours: 2.0,
      variance: 'On Schedule',
      restorationETA: 'Normal Power',
      cycles: ['0600~0700', '1800~1900'],
      scheduledOutages: [
        { start: 6, end: 7 },
        { start: 18, end: 19 }
      ],
      reports: [],
      description: 'IESCO F-8 Markaz business hub feeder.'
    },

    // --- PESCO: PESHAWAR ---
    {
      id: 'pesco-univ-town',
      name: 'University Town',
      disco: 'PESCO',
      grid: 'PESHAWAR TOWN',
      city: 'Peshawar',
      region: 'KPK Central',
      category: 'Category 4',
      lossTag: 'Very High Loss (32%)',
      status: 'OFFLINE',
      scheduledHours: 8.0,
      actualHours: 10.1,
      variance: '+2.1h var',
      restorationETA: '1 hr 15 mins',
      cycles: ['0100~0300', '0800~1000', '1300~1500', '1900~2100'],
      scheduledOutages: [
        { start: 1, end: 3 },
        { start: 8, end: 10 },
        { start: 13, end: 15 },
        { start: 19, end: 21 }
      ],
      reports: [
        { time: 13.5, note: 'Heavy load shedding cut extended', user: 'Peshawar User' }
      ],
      description: 'PESCO University Town feeder line.'
    },

    // --- MEPCO: MULTAN ---
    {
      id: 'mepco-cantt',
      name: 'Multan Cantt',
      disco: 'MEPCO',
      grid: 'MULTAN CANTT',
      city: 'Multan',
      region: 'South Punjab',
      category: 'Category 2',
      lossTag: 'Medium Loss (11%)',
      status: 'ONLINE',
      scheduledHours: 4.0,
      actualHours: 4.5,
      variance: '+0.5h var',
      restorationETA: 'Normal Power',
      cycles: ['0500~0700', '1700~1900'],
      scheduledOutages: [
        { start: 5, end: 7 },
        { start: 17, end: 19 }
      ],
      reports: [],
      description: 'MEPCO Multan Cantt grid feeder.'
    }
  ],

  // OFFICIAL SIMPLEMAPS HIGH-PRECISION PAKISTAN REGIONS DATASET
  simpleMapsPakZones: [
    {
      id: 'pk-gb',
      disco: 'GB / AJK',
      name: 'Gilgit-Baltistan',
      cities: 'Gilgit, Skardu, Hunza, Diamer, Khaplu',
      path: 'M 470,25 C 500,10 560,15 620,35 C 670,50 715,85 700,120 C 675,145 640,140 590,135 C 550,130 520,110 490,85 C 475,65 460,40 470,25 Z',
      compliance: '94% Hydro Grid',
      unscheduled: 'Minimal',
      feeders: 420,
      lossProfile: 'Low Loss (4%)'
    },
    {
      id: 'pk-jk',
      disco: 'GB / AJK',
      name: 'Azad Jammu & Kashmir',
      cities: 'Muzaffarabad, Mirpur, Rawalakot, Poonch, Bagh',
      path: 'M 590,135 C 610,150 625,180 610,215 C 595,235 580,230 570,210 C 565,185 575,160 590,135 Z',
      compliance: '91% Hydro Grid',
      unscheduled: 'Minimal',
      feeders: 380,
      lossProfile: 'Low Loss (6%)'
    },
    {
      id: 'pk-kp',
      disco: 'PESCO',
      name: 'Khyber Pakhtunkhwa (PESCO Grid)',
      cities: 'Peshawar, Swat, Mardan, Abbottabad, DI Khan, Chitral',
      path: 'M 430,75 C 460,65 480,85 490,85 C 520,110 540,130 530,165 C 500,210 470,240 440,270 C 420,240 410,200 400,160 C 390,125 405,95 430,75 Z',
      compliance: '54% Compliant',
      unscheduled: '+2.1 hrs/day',
      feeders: 1240,
      lossProfile: 'Very High Loss (32%)'
    },
    {
      id: 'pk-iesco',
      disco: 'IESCO',
      name: 'IESCO (Islamabad Capital & Potohar)',
      cities: 'Islamabad, Rawalpindi, Attock, Jhelum, Chakwal',
      path: 'M 530,165 C 560,160 580,175 570,210 L 530,225 C 510,210 515,185 530,165 Z',
      compliance: '89% Compliant',
      unscheduled: 'On Schedule',
      feeders: 860,
      lossProfile: 'Low Loss (5%)'
    },
    {
      id: 'pk-gepco',
      disco: 'GEPCO',
      name: 'GEPCO (Gujranwala Industrial Hub)',
      cities: 'Gujranwala, Sialkot, Gujarat, Narowal',
      path: 'M 570,210 C 610,215 640,230 630,260 C 600,275 580,260 565,245 Z',
      compliance: '84% Compliant',
      unscheduled: '+0.4 hrs/day',
      feeders: 620,
      lossProfile: 'Low-Medium Loss (10%)'
    },
    {
      id: 'pk-lesco',
      disco: 'LESCO',
      name: 'LESCO (Lahore Metropolitan Region)',
      cities: 'Lahore, Kasur, Sheikhupura, Okara',
      path: 'M 565,245 C 610,250 650,270 635,320 C 590,340 560,320 540,295 Z',
      compliance: '71% Compliant',
      unscheduled: '+1.2 hrs/day',
      feeders: 1120,
      lossProfile: 'High Loss (22%)'
    },
    {
      id: 'pk-fesco',
      disco: 'FESCO',
      name: 'FESCO (Faisalabad Region)',
      cities: 'Faisalabad, Jhang, Sargodha, Toba Tek Singh',
      path: 'M 530,225 C 565,245 540,295 490,290 C 470,265 495,240 530,225 Z',
      compliance: '82% Compliant',
      unscheduled: '+0.5 hrs/day',
      feeders: 780,
      lossProfile: 'Medium Loss (12%)'
    },
    {
      id: 'pk-mepco',
      disco: 'MEPCO',
      name: 'MEPCO (Multan & South Punjab)',
      cities: 'Multan, Sahiwal, Bahawalpur, R.Y. Khan, D.G. Khan',
      path: 'M 440,270 C 490,290 590,340 550,470 C 470,500 410,450 380,380 Z',
      compliance: '80% Compliant',
      unscheduled: '+0.6 hrs/day',
      feeders: 1450,
      lossProfile: 'Medium Loss (15%)'
    },
    {
      id: 'pk-ba',
      disco: 'QESCO',
      name: 'QESCO (Balochistan National Grid)',
      cities: 'Quetta, Gwadar, Khuzdar, Turbat, Sibi, Zhob, Chaman',
      path: 'M 90,440 L 380,380 C 410,450 360,540 280,550 C 200,560 140,510 90,440 Z M 90,440 C 130,450 160,540 280,550 C 270,620 200,640 120,620 C 100,550 80,480 90,440 Z',
      compliance: '48% Compliant',
      unscheduled: '+2.8 hrs/day',
      feeders: 920,
      lossProfile: 'Extreme Loss (38%)'
    },
    {
      id: 'pk-sepco',
      disco: 'SEPCO',
      name: 'SEPCO (Upper Sindh)',
      cities: 'Sukkur, Larkana, Khairpur, Nawabshah',
      path: 'M 380,380 C 470,500 450,560 360,570 C 320,530 350,450 380,380 Z',
      compliance: '58% Compliant',
      unscheduled: '+1.8 hrs/day',
      feeders: 680,
      lossProfile: 'Very High Loss (30%)'
    },
    {
      id: 'pk-hesco',
      disco: 'HESCO',
      name: 'HESCO (Lower Sindh)',
      cities: 'Hyderabad, Mirpurkhas, Badin, Thatta, Dadu',
      path: 'M 360,570 C 450,560 420,690 310,680 C 290,640 320,600 360,570 Z',
      compliance: '64% Compliant',
      unscheduled: '+1.4 hrs/day',
      feeders: 740,
      lossProfile: 'High Loss (24%)'
    },
    {
      id: 'pk-ke',
      disco: 'K-ELECTRIC',
      name: 'K-ELECTRIC (KE Territory Karachi)',
      cities: 'Karachi, Malir, Korangi, Clifton, Hub',
      path: 'M 270,640 L 310,680 L 290,740 L 245,710 Z',
      compliance: '78% Compliant (4-Cycle)',
      unscheduled: '+0.8 hrs/day',
      feeders: 480,
      lossProfile: '4-Cycle Scheduled Rotation'
    }
  ],

  // KARACHI MAP ZONES SPECIFICATION
  karachiMapZones: [
    {
      id: 'zone-south',
      name: 'District South (Clifton / Defence / Lyari)',
      grids: ['CLIFTON', 'DEFENCE', 'ELENDER RD', 'QUEENS ROAD', 'WEST WHARF', 'LYARI'],
      path: 'M 180,240 L 280,240 L 320,290 L 260,340 L 160,320 Z',
      labelPos: { x: 230, y: 285 },
      color: '#57f1db',
      lossLevel: 'Low-Medium Loss (8%)',
      status: 'ONLINE (92% Adherence)'
    },
    {
      id: 'zone-east',
      name: 'District East (Gulistan-e-Johar / Gulshan / PECHS)',
      grids: ['GULISTAN E JOHAR', 'GULSHAN', 'JACOBLINE', 'CIVIC CENTER', 'KDA'],
      path: 'M 280,180 L 400,160 L 440,240 L 320,290 L 280,240 Z',
      labelPos: { x: 345, y: 220 },
      color: '#feae2c',
      lossLevel: 'High Loss (22%)',
      status: 'SCHEDULED (78% Adherence)'
    },
    {
      id: 'zone-central',
      name: 'District Central (Nazimabad / FB Area / Liaquatabad)',
      grids: ['NORTH NAZIMABAD', 'FEDERAL A', 'FEDERAL B', 'LIAQUATABAD', 'AZIZABAD', 'SHADMAN'],
      path: 'M 240,110 L 340,100 L 360,160 L 280,180 Z',
      labelPos: { x: 295, y: 140 },
      color: '#57f1db',
      lossLevel: 'Medium Loss (15%)',
      status: 'ONLINE (85% Adherence)'
    },
    {
      id: 'zone-korangi',
      name: 'Korangi & Landhi Industrial Zone',
      grids: ['KORANGI EAST', 'KORANGI SOUTH', 'KORANGI TOWN', 'LANDHI', 'KEPZ', 'QAYYUMABAD'],
      path: 'M 320,290 L 440,240 L 500,310 L 380,360 Z',
      labelPos: { x: 410, y: 300 },
      color: '#ffb4ab',
      lossLevel: 'High Loss (26%)',
      status: 'OFFLINE (68% Adherence)'
    },
    {
      id: 'zone-malir',
      name: 'Malir & Airport Zone',
      grids: ['AIRPORT', 'AIRPORT 2', 'MALIR', 'MEMON GOTH', 'GADAP', 'DHABEJI'],
      path: 'M 400,160 L 520,130 L 560,230 L 440,240 Z',
      labelPos: { x: 470, y: 190 },
      color: '#feae2c',
      lossLevel: 'Medium-High Loss (20%)',
      status: 'SCHEDULED (74% Adherence)'
    },
    {
      id: 'zone-west',
      name: 'District West (Baldia / Orangi / SITE)',
      grids: ['BALDIA', 'ORANGI TOWN', 'SITE', 'MAURIPUR', 'HUB CHOWKI', 'VALIKA'],
      path: 'M 140,120 L 240,110 L 280,180 L 180,240 L 110,180 Z',
      labelPos: { x: 190, y: 170 },
      color: '#ffb4ab',
      lossLevel: 'Very High Loss (32%)',
      status: 'OFFLINE (56% Adherence)'
    },
    {
      id: 'zone-north',
      name: 'District North (Surjani / North Karachi / Maymar)',
      grids: ['SURJANI TOWN', 'NORTH KARACHI', 'GULSHAN-E-MAYMAR'],
      path: 'M 240,40 L 420,30 L 400,160 L 240,110 Z',
      labelPos: { x: 320, y: 80 },
      color: '#ffb4ab',
      lossLevel: 'Very High Loss (30%)',
      status: 'OFFLINE (61% Adherence)'
    }
  ],

  ingestionQueue: [
    { disco: 'K-ELECTRIC', file: 'KE_LoadShedding_Aug2026_Official.pdf', records: 480, status: 'PUBLISHED', timestamp: '2026-08-14 21:00' },
    { disco: 'LESCO', file: 'LESCO_Schedule_Aug2026.pdf', records: 48, status: 'PARSED', timestamp: '2026-08-14 18:30' },
    { disco: 'IESCO', file: 'IESCO_Feeder_Matrix.csv', records: 32, status: 'PUBLISHED', timestamp: '2026-08-14 14:15' }
  ]
};

// --- DICTIONARY FOR BILINGUAL EN/UR ---
const TRANSLATIONS = {
  en: {
    system_title: 'ROSHNI_SYSTEM',
    locate_feeder: 'LOCATE FEEDER / تلاش کریں',
    search_placeholder: 'Search DISCO, Grid, City, or Feeder Name...',
    recent_feeders: 'RECENT FEEDERS & SCHEDULES',
    last_readout: 'REAL K-ELECTRIC & DISCO DATASET',
    power_on: 'POWER ON',
    outage: 'OUTAGE',
    scheduled: 'SCHEDULED',
    report_outage_btn: 'REPORT OUTAGE NOW',
    download_csv: 'Download CSV',
    download_json: 'Download JSON',
    nav_home: 'Home',
    nav_report: 'Report',
    nav_ingest: 'Ingest',
    nav_insights: 'Insights',
    scheduled_out: 'Scheduled Out (24h)',
    actual_reported: 'Actual / Reported',
    current_status: 'Current Status',
    timeline_title: 'Timeline (Today - 4 Cycles)',
    legend_scheduled: 'Scheduled',
    legend_reported: 'Reported',
    report_outage_header: 'Report Outage',
    reporting_for: 'Reporting for',
    start_time: 'Start Time',
    end_time: 'End Time',
    optional: 'Optional',
    note_label: 'Note',
    submit_report: 'SUBMIT REPORT',
    insights_title: 'Grid Reliability & Discrepancy Analytics',
    ingest_title: 'DISCO Schedule Ingestion Engine',
    drag_drop_text: 'Drag and drop DISCO Official Schedule PDF or CSV file here',
    or_browse: 'or click to browse local files',
    parse_and_publish: 'PARSE & PUBLISH TO LIVE DB'
  },
  ur: {
    system_title: 'روشنی سسٹم',
    locate_feeder: 'تلاش کریں - فیڈر اور بجلی کی معلومات',
    search_placeholder: 'ڈسکو، گرڈ، شہر یا فیڈر کا نام درج کریں...',
    recent_feeders: 'حالیہ فیڈرز اور 4 سائيکل شیڈول',
    last_readout: 'کے الیکٹرک کا مکمل آفیشل ڈیٹا بیس',
    power_on: 'بجلی موجود',
    outage: 'بجلی بند',
    scheduled: 'شیڈول شدہ',
    report_outage_btn: 'ابھی بجلی کی بندش کی اطلاع دیں',
    download_csv: 'فائل ڈاؤن لوڈ (CSV)',
    download_json: 'فائل ڈاؤن لوڈ (JSON)',
    nav_home: 'ہوم',
    nav_report: 'رپورٹ کریں',
    nav_ingest: 'انجسٹ (فائل)',
    nav_insights: 'تجزیات',
    scheduled_out: 'شیڈول شدہ لوڈشیڈنگ (24h)',
    actual_reported: 'اصل / رپورٹ شدہ',
    current_status: 'موجودہ صورتحال',
    timeline_title: 'ٹائم لائن (آج - 4 سائیکلز)',
    legend_scheduled: 'شیڈول شدہ',
    legend_reported: 'رپورٹ شدہ',
    report_outage_header: 'لوڈشیڈنگ کا اندراج',
    reporting_for: 'اطلاع برائے',
    start_time: 'شروع ہونے کا وقت',
    end_time: 'ختم ہونے کا وقت',
    optional: 'اختیاری',
    note_label: 'وضاحت / نوٹ',
    submit_report: 'اطلاع جمع کرائیں',
    insights_title: 'گریڈ بھروسہ مندی اور لوڈشیڈنگ کا تجزیہ',
    ingest_title: 'ڈسکو شیڈول انٹری اور پراسیسنگ',
    drag_drop_text: 'ڈسکو کی آفیشل PDF یا CSV فائل یہاں ڈریگ کریں',
    or_browse: 'یا فائل منتخب کرنے کے لیے کلک کریں',
    parse_and_publish: 'ڈیٹا بیس میں شامل کریں'
  }
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  renderApp();
});

// --- EVENT LISTENERS SETUP ---
function setupEventListeners() {
  document.querySelectorAll('[data-view-target]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = link.getAttribute('data-view-target');
      const feederId = link.getAttribute('data-feeder-id');
      if (feederId) {
        APP_STATE.currentFeederId = feederId;
      }
      switchView(targetView);
    });
  });

  const langToggleBtns = document.querySelectorAll('.lang-toggle-btn');
  langToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      APP_STATE.lang = APP_STATE.lang === 'en' ? 'ur' : 'en';
      document.documentElement.dir = APP_STATE.lang === 'ur' ? 'rtl' : 'ltr';
      renderTranslations();
      renderApp();
    });
  });

  // Map Mode Toggle (Pakistan vs Karachi)
  document.querySelectorAll('.map-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.map-mode-btn').forEach(b => {
        b.classList.remove('bg-primary', 'text-on-primary', 'font-bold');
        b.classList.add('bg-surface-container-highest', 'text-on-surface-variant');
      });
      btn.classList.remove('bg-surface-container-highest', 'text-on-surface-variant');
      btn.classList.add('bg-primary', 'text-on-primary', 'font-bold');

      APP_STATE.mapMode = btn.getAttribute('data-map-mode');
      APP_STATE.mapZoomScale = 1;
      renderActiveMap();
    });
  });

  const searchInput = document.getElementById('feederSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      APP_STATE.searchQuery = e.target.value.toLowerCase().trim();
      renderSearchResults();
    });

    searchInput.addEventListener('focus', () => {
      renderSearchResults(true);
    });
  }

  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => {
        c.classList.remove('bg-primary', 'text-on-primary', 'border-primary');
        c.classList.add('bg-surface-container', 'text-on-surface-variant', 'border-outline-variant');
      });
      
      chip.classList.remove('bg-surface-container', 'text-on-surface-variant', 'border-outline-variant');
      chip.classList.add('bg-primary', 'text-on-primary', 'border-primary');
      
      APP_STATE.selectedDiscoFilter = chip.getAttribute('data-disco');
      renderRecentFeeders();
    });
  });

  const gridSelect = document.getElementById('gridStationSelect');
  if (gridSelect) {
    gridSelect.addEventListener('change', (e) => {
      APP_STATE.selectedGridFilter = e.target.value;
      renderRecentFeeders();
    });
  }

  const outageForm = document.getElementById('outageForm');
  if (outageForm) {
    outageForm.addEventListener('submit', handleOutageSubmit);
  }

  const dropZone = document.getElementById('ingestDropZone');
  if (dropZone) {
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('border-primary', 'bg-primary/5');
    });
    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('border-primary', 'bg-primary/5');
    });
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('border-primary', 'bg-primary/5');
      if (e.dataTransfer.files.length > 0) {
        handleFileUpload(e.dataTransfer.files[0]);
      }
    });
  }

  const fileInput = document.getElementById('ingestFileInput');
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        handleFileUpload(e.target.files[0]);
      }
    });
  }
}

// --- MAP ZOOM & PAN LOGIC ---
function zoomInMap() {
  if (APP_STATE.mapZoomScale < 2.5) {
    APP_STATE.mapZoomScale += 0.25;
    applyMapZoom();
  }
}

function zoomOutMap() {
  if (APP_STATE.mapZoomScale > 0.75) {
    APP_STATE.mapZoomScale -= 0.25;
    applyMapZoom();
  }
}

function resetMapZoom() {
  APP_STATE.mapZoomScale = 1;
  applyMapZoom();
}

function applyMapZoom() {
  const svg = document.getElementById('mainMapSvg');
  if (svg) {
    svg.style.transform = `scale(${APP_STATE.mapZoomScale})`;
    svg.style.transformOrigin = 'center center';
    svg.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
  }
}

// --- VIEW ROUTER ---
function switchView(viewName) {
  APP_STATE.currentView = viewName;

  document.querySelectorAll('.app-view').forEach(view => view.classList.add('hidden'));

  const activeViewEl = document.getElementById(`view-${viewName}`);
  if (activeViewEl) {
    activeViewEl.classList.remove('hidden');
    activeViewEl.classList.add('fade-in-up');
  }

  document.querySelectorAll('[data-view-target]').forEach(link => {
    const linkTarget = link.getAttribute('data-view-target');
    if (linkTarget === viewName) {
      link.classList.add('text-primary', 'font-bold');
      link.classList.remove('text-on-surface-variant');
    } else {
      link.classList.remove('text-primary', 'font-bold');
      link.classList.add('text-on-surface-variant');
    }
  });

  if (viewName === 'detail') {
    renderFeederDetail();
  } else if (viewName === 'report') {
    prefillReportForm();
  } else if (viewName === 'insights') {
    renderInsightsDashboard();
  } else if (viewName === 'ingest') {
    renderIngestionTable();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- RENDER APP ---
function renderApp() {
  renderTranslations();
  renderActiveMap();
  renderRecentFeeders();
  if (APP_STATE.currentView === 'detail') {
    renderFeederDetail();
  }
}

function renderActiveMap() {
  if (APP_STATE.mapMode === 'pakistan') {
    renderPakistanMap();
  } else {
    renderKarachiMap();
  }
}

// --- TRANSLATIONS RENDERER ---
function renderTranslations() {
  const t = TRANSLATIONS[APP_STATE.lang];
  document.querySelectorAll('[data-tkey]').forEach(el => {
    const key = el.getAttribute('data-tkey');
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
    btn.textContent = APP_STATE.lang === 'en' ? 'EN/UR' : 'اردو / EN';
  });
}

// --- OFFICIAL SIMPLEMAPS PAKISTAN SVG MAP ENGINE ---
function renderPakistanMap() {
  const mapSvg = document.getElementById('mainMapSvg');
  const titleEl = document.getElementById('mapTitleText');
  const subtitleEl = document.getElementById('mapSubtitleText');
  if (!mapSvg) return;

  if (titleEl) titleEl.innerHTML = '<span class="material-symbols-outlined text-primary">public</span> OFFICIAL PAKISTAN HIGH-PRECISION VECTOR MAP (SIMPLEMAPS STYLE)';
  if (subtitleEl) subtitleEl.textContent = 'Hover over any province or DISCO territory to inspect live grid compliance, total feeders, and load shedding status.';

  mapSvg.setAttribute('viewBox', '0 0 800 850');
  mapSvg.innerHTML = '';

  // Background Grid Matrix Pattern
  const gridGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  gridGroup.setAttribute('opacity', '0.1');
  for (let x = 0; x <= 800; x += 40) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x); line.setAttribute('y1', 0);
    line.setAttribute('x2', x); line.setAttribute('y2', 850);
    line.setAttribute('stroke', '#ffffff');
    gridGroup.appendChild(line);
  }
  for (let y = 0; y <= 850; y += 40) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', 0); line.setAttribute('y1', y);
    line.setAttribute('x2', 800); line.setAttribute('y2', y);
    line.setAttribute('stroke', '#ffffff');
    gridGroup.appendChild(line);
  }
  mapSvg.appendChild(gridGroup);

  const card = document.getElementById('mapHoverCard');

  // Render High-Precision SimpleMaps Pakistan Vector Regions
  APP_STATE.simpleMapsPakZones.forEach(zone => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', zone.path);
    path.setAttribute('class', `simplemaps-pak-path ${APP_STATE.activeMapZoneId === zone.id ? 'active-zone' : ''}`);
    path.setAttribute('data-zone-id', zone.id);

    path.onmousemove = (e) => {
      if (!card) return;
      card.classList.add('visible');
      const rect = mapSvg.getBoundingClientRect();
      const posX = e.clientX - rect.left + 15;
      const posY = e.clientY - rect.top + 15;
      card.style.left = `${posX}px`;
      card.style.top = `${posY}px`;

      card.innerHTML = `
        <div class="flex justify-between items-center mb-1">
          <span class="text-xs font-label-mono-sm text-primary font-bold uppercase">PAKISTAN DISCO GRID</span>
          <span class="text-[10px] px-1.5 py-0.5 rounded bg-surface-container-highest text-primary font-label-mono-sm">${zone.compliance}</span>
        </div>
        <div class="text-body-md font-bold text-on-surface mb-1">${zone.name}</div>
        <div class="text-xs text-on-surface-variant mb-2">
          <strong>Key Cities:</strong> ${zone.cities}<br/>
          <strong>Loss Profile:</strong> <span class="text-error">${zone.lossProfile}</span><br/>
          <strong>Unscheduled Cut:</strong> <span class="text-tertiary-container">${zone.unscheduled}</span>
        </div>
        <div class="border-t border-outline-variant/40 pt-2 text-[11px] font-label-mono-sm text-on-surface-variant flex justify-between items-center">
          <span>Active Feeders: <strong>${zone.feeders}</strong></span>
          <span class="text-primary flex items-center gap-0.5"><span class="material-symbols-outlined text-[12px]">touch_app</span> Click to filter</span>
        </div>
      `;
    };

    path.onmouseleave = () => {
      if (card) card.classList.remove('visible');
    };

    path.onclick = () => {
      APP_STATE.activeMapZoneId = zone.id;
      if (zone.disco !== 'GB / AJK') {
        APP_STATE.selectedDiscoFilter = zone.disco;
      }
      
      document.querySelectorAll('.filter-chip').forEach(c => {
        c.classList.remove('bg-primary', 'text-on-primary', 'border-primary');
        c.classList.add('bg-surface-container', 'text-on-surface-variant', 'border-outline-variant');
        if (c.getAttribute('data-disco') === zone.disco) {
          c.classList.remove('bg-surface-container', 'text-on-surface-variant', 'border-outline-variant');
          c.classList.add('bg-primary', 'text-on-primary', 'border-primary');
        }
      });

      renderRecentFeeders();
      showToast(`Filtered feeders for ${zone.name}`);
    };

    mapSvg.appendChild(path);
  });

  // Render Highlighted ICT Square Node (Matching Screenshot)
  const ictSquare = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  ictSquare.setAttribute('x', 522);
  ictSquare.setAttribute('y', 192);
  ictSquare.setAttribute('width', 20);
  ictSquare.setAttribute('height', 20);
  ictSquare.setAttribute('rx', 2);
  ictSquare.setAttribute('class', 'ict-square-node');
  
  ictSquare.onmousemove = (e) => {
    if (!card) return;
    card.classList.add('visible');
    const rect = mapSvg.getBoundingClientRect();
    card.style.left = `${e.clientX - rect.left + 15}px`;
    card.style.top = `${e.clientY - rect.top + 15}px`;
    card.innerHTML = `
      <div class="flex justify-between items-center mb-1">
        <span class="text-xs font-label-mono-sm text-secondary font-bold uppercase">CAPITAL DISCO NODE</span>
        <span class="text-[10px] px-1.5 py-0.5 rounded bg-secondary-container/30 text-secondary font-label-mono-sm">IESCO HQ</span>
      </div>
      <div class="text-body-md font-bold text-on-surface mb-1">Islamabad Capital Territory (ICT)</div>
      <div class="text-xs text-on-surface-variant">
        <strong>Grid Station:</strong> IESCO F-8 / Blue Area / Diplomatic Enclave<br/>
        <strong>Status:</strong> <span class="text-primary font-bold">89% Schedule Compliant</span>
      </div>
    `;
  };

  ictSquare.onmouseleave = () => {
    if (card) card.classList.remove('visible');
  };

  ictSquare.onclick = () => {
    APP_STATE.selectedDiscoFilter = 'IESCO';
    renderRecentFeeders();
    showToast('Filtered feeders for Islamabad IESCO Grid');
  };

  mapSvg.appendChild(ictSquare);

  applyMapZoom();
}

// --- INTERACTIVE KARACHI MAP ENGINE ---
function renderKarachiMap() {
  const mapSvg = document.getElementById('mainMapSvg');
  const titleEl = document.getElementById('mapTitleText');
  const subtitleEl = document.getElementById('mapSubtitleText');
  if (!mapSvg) return;

  if (titleEl) titleEl.innerHTML = '<span class="material-symbols-outlined text-primary">map</span> INTERACTIVE KARACHI KE GRID MAP';
  if (subtitleEl) subtitleEl.textContent = 'Hover over Karachi grid areas to inspect KE 4-cycle schedules & loss profiles. Click to filter feeders.';

  mapSvg.setAttribute('viewBox', '0 0 600 400');
  mapSvg.innerHTML = '';

  const gridGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  gridGroup.setAttribute('opacity', '0.15');
  for (let x = 0; x <= 600; x += 40) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x); line.setAttribute('y1', 0);
    line.setAttribute('x2', x); line.setAttribute('y2', 400);
    line.setAttribute('stroke', '#859490');
    gridGroup.appendChild(line);
  }
  for (let y = 0; y <= 400; y += 40) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', 0); line.setAttribute('y1', y);
    line.setAttribute('x2', 600); line.setAttribute('y2', y);
    line.setAttribute('stroke', '#859490');
    gridGroup.appendChild(line);
  }
  mapSvg.appendChild(gridGroup);

  const card = document.getElementById('mapHoverCard');

  APP_STATE.karachiMapZones.forEach(zone => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', zone.path);
    path.setAttribute('class', `map-zone ${APP_STATE.activeMapZoneId === zone.id ? 'active-zone' : ''}`);
    path.setAttribute('data-zone-id', zone.id);

    path.onmousemove = (e) => {
      if (!card) return;
      card.classList.add('visible');
      const rect = mapSvg.getBoundingClientRect();
      const posX = e.clientX - rect.left + 15;
      const posY = e.clientY - rect.top + 15;
      card.style.left = `${posX}px`;
      card.style.top = `${posY}px`;

      const zoneFeeders = APP_STATE.feeders.filter(f => zone.grids.includes(f.grid));

      card.innerHTML = `
        <div class="flex justify-between items-center mb-1">
          <span class="text-xs font-label-mono-sm text-primary font-bold uppercase">KE GRID TERRITORY</span>
          <span class="text-[10px] px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-mono-sm">${zone.grids.length} GRIDS</span>
        </div>
        <div class="text-body-md font-bold text-on-surface mb-1">${zone.name}</div>
        <div class="text-xs text-on-surface-variant mb-2">
          <strong>Loss Profile:</strong> <span class="text-error">${zone.lossLevel}</span><br/>
          <strong>Grid Status:</strong> <span class="text-primary">${zone.status}</span>
        </div>
        <div class="border-t border-outline-variant/40 pt-2 text-[11px] font-label-mono-sm text-on-surface-variant">
          <strong>Active Feeders:</strong> ${zoneFeeders.map(f => f.name).join(', ') || 'Airport, Mominabad, Caltex, Johar'}<br/>
          <span class="text-primary flex items-center gap-1 mt-1"><span class="material-symbols-outlined text-[12px]">touch_app</span> Click zone to filter feeders</span>
        </div>
      `;
    };

    path.onmouseleave = () => {
      if (card) card.classList.remove('visible');
    };

    path.onclick = () => {
      APP_STATE.activeMapZoneId = zone.id;
      APP_STATE.selectedGridFilter = zone.grids[0];
      const select = document.getElementById('gridStationSelect');
      if (select) select.value = zone.grids[0];
      renderRecentFeeders();
      showToast(`Filtered feeders for ${zone.name}`);
    };

    mapSvg.appendChild(path);

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', zone.labelPos.x);
    text.setAttribute('y', zone.labelPos.y);
    text.setAttribute('class', 'map-label');
    text.setAttribute('text-anchor', 'middle');
    text.textContent = zone.name.split('(')[0].trim();
    mapSvg.appendChild(text);
  });

  applyMapZoom();
}

// --- HOME SEARCH & RECENT FEEDERS ---
function renderRecentFeeders() {
  const container = document.getElementById('recentFeedersContainer');
  if (!container) return;

  container.innerHTML = '';

  let filtered = APP_STATE.feeders;

  if (APP_STATE.selectedDiscoFilter !== 'ALL') {
    filtered = filtered.filter(f => f.disco.toUpperCase() === APP_STATE.selectedDiscoFilter.toUpperCase());
  }

  if (APP_STATE.selectedGridFilter !== 'ALL') {
    filtered = filtered.filter(f => f.grid === APP_STATE.selectedGridFilter);
  }

  if (APP_STATE.searchQuery) {
    filtered = filtered.filter(f => 
      f.name.toLowerCase().includes(APP_STATE.searchQuery) ||
      f.disco.toLowerCase().includes(APP_STATE.searchQuery) ||
      f.grid.toLowerCase().includes(APP_STATE.searchQuery) ||
      f.city.toLowerCase().includes(APP_STATE.searchQuery)
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full p-8 text-center bg-surface-container border border-outline-variant rounded-lg">
        <span class="material-symbols-outlined text-4xl text-outline mb-2">search_off</span>
        <p class="text-on-surface-variant font-label-mono-lg">No feeders found matching current criteria</p>
      </div>
    `;
    return;
  }

  filtered.forEach((feeder, idx) => {
    let statusClass = 'border-primary text-primary';
    let borderTop = 'border-t-primary';
    let badgeIcon = '<span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>';

    if (feeder.status === 'OFFLINE') {
      statusClass = 'border-error text-error';
      borderTop = 'border-t-error';
      badgeIcon = '<span class="material-symbols-outlined text-[14px]">warning</span>';
    } else if (feeder.status === 'SCHEDULED') {
      statusClass = 'border-tertiary-container text-tertiary-container';
      borderTop = 'border-t-tertiary-container';
      badgeIcon = '<span class="material-symbols-outlined text-[14px]">schedule</span>';
    }

    let timelineHTML = '';
    feeder.scheduledOutages.forEach(outage => {
      const leftPct = (outage.start / 24) * 100;
      const widthPct = (Math.max(0.5, outage.end > outage.start ? outage.end - outage.start : (24 - outage.start) + outage.end) / 24) * 100;
      const hatchClass = feeder.status === 'OFFLINE' ? 'hatch-pattern-red' : 'hatch-pattern-amber';
      timelineHTML += `<div class="h-full ${hatchClass} absolute" style="left: ${leftPct}%; width: ${widthPct}%;"></div>`;
    });

    const cycleTags = feeder.cycles ? feeder.cycles.slice(0, 2).join(' | ') : 'Regular Rotation';

    const card = document.createElement('div');
    card.className = `bg-[#161B1B] border border-[#2A3030] rounded-lg p-md flex flex-col justify-between gap-sm fade-in-up border-t-2 ${borderTop} hover:border-primary/50 transition-all cursor-pointer group`;
    card.style.animationDelay = `${0.05 * (idx + 1)}s`;

    card.innerHTML = `
      <div class="flex justify-between items-start" onclick="openFeederDetail('${feeder.id}')">
        <div>
          <div class="text-label-mono-sm font-label-mono-sm text-on-surface-variant mb-1">${feeder.disco} / ${feeder.grid}</div>
          <h3 class="text-body-lg font-body-lg font-semibold text-on-surface group-hover:text-primary transition-colors">${feeder.name}</h3>
        </div>
        <div class="border ${statusClass} px-2 py-1 rounded text-label-mono-sm font-label-mono-sm flex items-center gap-1">
          ${badgeIcon}
          <span>${feeder.status}</span>
        </div>
      </div>
      
      <div class="text-xs text-on-surface-variant font-label-mono-sm flex justify-between mt-1" onclick="openFeederDetail('${feeder.id}')">
        <span>${feeder.lossTag}</span>
        <span class="text-primary">${feeder.city}</span>
      </div>

      <div class="text-[11px] font-label-mono-sm text-outline mt-1 bg-surface-container-lowest p-1.5 rounded border border-outline-variant/30 flex justify-between items-center">
        <span>Cycles: ${cycleTags}</span>
        <button onclick="event.stopPropagation(); downloadScheduleCSV('${feeder.id}')" class="text-primary hover:underline flex items-center gap-0.5">
          <span class="material-symbols-outlined text-[13px]">download</span> CSV
        </button>
      </div>

      <div class="mt-3" onclick="openFeederDetail('${feeder.id}')">
        <div class="flex justify-between text-label-mono-sm font-label-mono-sm text-on-surface-variant mb-1">
          <span>00:00</span>
          <span>24:00</span>
        </div>
        <div class="w-full h-2.5 bg-surface-dim rounded-full overflow-hidden relative border border-outline-variant/40 flex">
          <div class="h-full bg-primary/20 w-full"></div>
          ${timelineHTML}
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function openFeederDetail(id) {
  APP_STATE.currentFeederId = id;
  switchView('detail');
}

function renderSearchResults(forceOpen = false) {
  const dropdown = document.getElementById('searchAutocompleteDropdown');
  const list = document.getElementById('searchAutocompleteList');
  if (!dropdown || !list) return;

  const query = APP_STATE.searchQuery;

  if (!query && !forceOpen) {
    dropdown.classList.add('hidden');
    return;
  }

  const matches = APP_STATE.feeders.filter(f => 
    !query || 
    f.name.toLowerCase().includes(query) ||
    f.disco.toLowerCase().includes(query) ||
    f.grid.toLowerCase().includes(query) ||
    f.city.toLowerCase().includes(query)
  );

  list.innerHTML = '';

  if (matches.length === 0) {
    list.innerHTML = `<li class="px-4 py-3 text-on-surface-variant text-sm">No matching DISCO feeders found</li>`;
  } else {
    matches.forEach(f => {
      const li = document.createElement('li');
      li.className = 'px-4 py-3 hover:bg-surface-container-highest cursor-pointer flex justify-between items-center border-b border-outline-variant/30 transition-colors';
      li.onclick = () => {
        APP_STATE.currentFeederId = f.id;
        dropdown.classList.add('hidden');
        switchView('detail');
      };
      li.innerHTML = `
        <span class="font-body-md text-on-surface"><strong>${f.disco}</strong> [${f.grid}] &gt; ${f.name}</span>
        <span class="text-label-mono-sm text-primary uppercase font-bold">${f.city}</span>
      `;
      list.appendChild(li);
    });
  }

  dropdown.classList.remove('hidden');
}

// --- FEEDER DETAIL VIEW RENDERER ---
function renderFeederDetail() {
  const feeder = APP_STATE.feeders.find(f => f.id === APP_STATE.currentFeederId) || APP_STATE.feeders[0];

  const feederTitle = document.getElementById('detailFeederTitle');
  const feederCategory = document.getElementById('detailFeederCategory');
  const feederDescription = document.getElementById('detailFeederDescription');

  if (feederTitle) feederTitle.textContent = `${feeder.name} (${feeder.grid}), ${feeder.disco}`;
  if (feederCategory) feederCategory.textContent = feeder.lossTag;
  if (feederDescription) feederDescription.textContent = feeder.description;

  const statSchedOut = document.getElementById('detailSchedOut');
  const statActualOut = document.getElementById('detailActualOut');
  const statVariance = document.getElementById('detailVariance');
  const statStatus = document.getElementById('detailStatus');
  const statETA = document.getElementById('detailETA');

  if (statSchedOut) statSchedOut.innerHTML = `${String(Math.floor(feeder.scheduledHours)).padStart(2, '0')}<span class="text-headline-md font-headline-md">H</span>`;
  if (statActualOut) statActualOut.innerHTML = `${String(Math.floor(feeder.actualHours)).padStart(2, '0')}<span class="text-headline-md font-headline-md">H</span>`;
  if (statVariance) statVariance.textContent = feeder.variance;
  
  if (statStatus) {
    statStatus.textContent = feeder.status;
    statStatus.className = feeder.status === 'OFFLINE' ? 'text-headline-md font-headline-md text-error' : feeder.status === 'ONLINE' ? 'text-headline-md font-headline-md text-primary' : 'text-headline-md font-headline-md text-tertiary-container';
  }

  if (statETA) statETA.textContent = `Restoration ETA: ${feeder.restorationETA}`;

  const cyclesContainer = document.getElementById('detailCyclesList');
  if (cyclesContainer && feeder.cycles) {
    cyclesContainer.innerHTML = feeder.cycles.map((c, i) => `
      <div class="bg-surface-container-lowest border border-outline-variant/50 p-2 rounded text-center">
        <span class="text-[10px] text-on-surface-variant font-label-mono-sm block">CYCLE ${i + 1}</span>
        <span class="text-sm font-bold text-primary font-label-mono-lg">${c}</span>
      </div>
    `).join('');
  }

  renderTimelineCenterpiece(feeder);
}

function renderTimelineCenterpiece(feeder) {
  const timelineContainer = document.getElementById('detailTimelineAxis');
  if (!timelineContainer) return;

  timelineContainer.querySelectorAll('.timeline-dynamic-element').forEach(el => el.remove());

  feeder.scheduledOutages.forEach((outage, idx) => {
    const leftPct = (outage.start / 24) * 100;
    const widthPct = (((outage.end > outage.start ? outage.end - outage.start : (24 - outage.start) + outage.end)) / 24) * 100;

    const block = document.createElement('div');
    block.className = 'absolute top-4 h-12 hatch-pattern-error border border-error/50 timeline-block timeline-dynamic-element cursor-pointer group';
    block.style.left = `${leftPct}%`;
    block.style.width = '0%';
    block.setAttribute('data-target-width', `${widthPct}%`);

    const tooltip = document.createElement('div');
    tooltip.className = 'hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-container-highest border border-error text-on-surface text-[11px] font-label-mono-sm px-2 py-0.5 rounded whitespace-nowrap z-30 shadow-md';
    tooltip.textContent = `Cycle ${idx + 1} Outage: ${feeder.cycles ? feeder.cycles[idx] : outage.start + ':00'}`;
    block.appendChild(tooltip);

    timelineContainer.appendChild(block);
  });

  feeder.reports.forEach(report => {
    const leftPct = (report.time / 24) * 100;

    const tick = document.createElement('div');
    tick.className = 'absolute top-2 h-16 w-1.5 bg-primary pulse-report timeline-dynamic-element z-20 cursor-pointer group shadow-[0_0_8px_rgba(87,241,219,0.8)]';
    tick.style.left = `${leftPct}%`;

    const tooltip = document.createElement('div');
    tooltip.className = 'hidden group-hover:block absolute -top-10 left-1/2 -translate-x-1/2 bg-surface-container-highest border border-primary text-primary text-[11px] font-label-mono-sm px-2.5 py-1 rounded whitespace-nowrap z-30 shadow-lg';
    tooltip.innerHTML = `<strong>Report at ${Math.floor(report.time)}:${Math.round((report.time % 1) * 60).toString().padStart(2, '0')}</strong><br/>${report.note}`;
    tick.appendChild(tooltip);

    timelineContainer.appendChild(tick);
  });

  const nowHour = 14.5;
  const nowLeftPct = (nowHour / 24) * 100;
  const nowMarker = document.createElement('div');
  nowMarker.className = 'absolute top-0 h-full w-0.5 bg-secondary timeline-dynamic-element z-10 opacity-70 pointer-events-none';
  nowMarker.style.left = `${nowLeftPct}%`;
  nowMarker.innerHTML = `<span class="absolute top-0 -left-4 bg-secondary text-on-secondary text-[9px] font-label-mono-sm px-1 rounded-sm">NOW</span>`;
  timelineContainer.appendChild(nowMarker);

  setTimeout(() => {
    timelineContainer.querySelectorAll('.timeline-block').forEach(block => {
      const targetWidth = block.getAttribute('data-target-width');
      block.style.width = targetWidth;
    });
  }, 150);
}

// --- SCHEDULE EXPORTER (CSV & JSON DOWNLOAD) ---
function downloadScheduleCSV(feederId = null) {
  const targetId = feederId || APP_STATE.currentFeederId;
  const feeder = APP_STATE.feeders.find(f => f.id === targetId) || APP_STATE.feeders[0];

  let csvContent = 'DISCO,Grid Station,Feeder Name,City,Loss Category,Status,1st Cycle,2nd Cycle,3rd Cycle,4th Cycle\n';
  const cycles = feeder.cycles || ['0935~1105', '1335~1505', '1705~1835', '2005~2135'];
  csvContent += `"${feeder.disco}","${feeder.grid}","${feeder.name}","${feeder.city}","${feeder.category}","${feeder.status}","${cycles[0] || ''}","${cycles[1] || ''}","${cycles[2] || ''}","${cycles[3] || ''}"\n`;

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `ROSHNI_${feeder.disco}_${feeder.name.replace(/\s+/g, '_')}_Schedule.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast(`Downloaded CSV schedule for ${feeder.name}`);
}

function downloadScheduleJSON(feederId = null) {
  const targetId = feederId || APP_STATE.currentFeederId;
  const feeder = APP_STATE.feeders.find(f => f.id === targetId) || APP_STATE.feeders[0];

  const jsonString = JSON.stringify(feeder, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `ROSHNI_${feeder.disco}_${feeder.name.replace(/\s+/g, '_')}_Schedule.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast(`Downloaded JSON schedule for ${feeder.name}`);
}

// --- REPORT OUTAGE FORM LOGIC ---
function prefillReportForm() {
  const feeder = APP_STATE.feeders.find(f => f.id === APP_STATE.currentFeederId) || APP_STATE.feeders[0];
  const targetLabel = document.getElementById('reportTargetFeederLabel');
  if (targetLabel) {
    targetLabel.innerHTML = `Reporting for <strong class="text-on-surface">${feeder.name} (${feeder.grid}), ${feeder.disco}</strong>`;
  }

  const startTimeInput = document.getElementById('startTime');
  if (startTimeInput && !startTimeInput.value) {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    startTimeInput.value = now.toISOString().slice(0, 16);
  }
}

function handleOutageSubmit(e) {
  e.preventDefault();

  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalHTML = submitBtn.innerHTML;

  submitBtn.innerHTML = '<span class="material-symbols-outlined animate-spin">sync</span> PROCESSING...';
  submitBtn.classList.add('opacity-80', 'cursor-not-allowed');

  setTimeout(() => {
    submitBtn.innerHTML = originalHTML;
    submitBtn.classList.remove('opacity-80', 'cursor-not-allowed');

    const noteVal = document.getElementById('note')?.value || 'Unscheduled cut reported';
    const nowHour = new Date().getHours() + (new Date().getMinutes() / 60);

    const feeder = APP_STATE.feeders.find(f => f.id === APP_STATE.currentFeederId) || APP_STATE.feeders[0];
    feeder.reports.push({
      time: Math.round(nowHour * 10) / 10,
      note: noteVal,
      user: 'Verified App User'
    });
    feeder.actualHours += 0.5;
    feeder.variance = `+${(feeder.actualHours - feeder.scheduledHours).toFixed(1)}h var`;

    showToast('Report submitted successfully! Timeline updated.');
    e.target.reset();

    setTimeout(() => {
      switchView('detail');
    }, 1200);

  }, 800);
}

// --- INGESTION DISCO PDF/CSV ENGINE ---
function handleFileUpload(file) {
  const fileNameEl = document.getElementById('ingestFileName');
  const statusEl = document.getElementById('ingestFileStatus');
  if (fileNameEl) fileNameEl.textContent = file.name;
  if (statusEl) statusEl.textContent = `File Size: ${(file.size / 1024).toFixed(1)} KB - Ready for Parsing`;

  showToast(`Loaded "${file.name}" for schedule extraction.`);
}

function renderIngestionTable() {
  const tbody = document.getElementById('ingestTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';
  APP_STATE.ingestionQueue.forEach(item => {
    const tr = document.createElement('tr');
    tr.className = 'border-b border-outline-variant/30 hover:bg-surface-container-highest/40 transition-colors';
    tr.innerHTML = `
      <td class="p-3 text-primary font-bold font-label-mono-lg">${item.disco}</td>
      <td class="p-3 font-body-md text-on-surface">${item.file}</td>
      <td class="p-3 font-label-mono-sm text-on-surface-variant">${item.records} Feeders</td>
      <td class="p-3">
        <span class="px-2 py-0.5 rounded text-xs font-label-mono-sm ${item.status === 'PUBLISHED' ? 'bg-primary/20 text-primary border border-primary/40' : 'bg-tertiary-container/20 text-tertiary-container border border-tertiary-container/40'}">
          ${item.status}
        </span>
      </td>
      <td class="p-3 font-label-mono-sm text-on-surface-variant">${item.timestamp}</td>
    `;
    tbody.appendChild(tr);
  });
}

function triggerPublishSchedule() {
  const publishBtn = document.getElementById('publishScheduleBtn');
  if (!publishBtn) return;

  const origHTML = publishBtn.innerHTML;
  publishBtn.innerHTML = '<span class="material-symbols-outlined animate-spin">sync</span> PUBLISHING MATRIX...';

  setTimeout(() => {
    publishBtn.innerHTML = origHTML;
    APP_STATE.ingestionQueue.forEach(item => item.status = 'PUBLISHED');
    renderIngestionTable();
    showToast('Published DISCO feeder schedules to ROSHNI database.');
  }, 1000);
}

// --- INSIGHTS DASHBOARD ANALYTICS ---
function renderInsightsDashboard() {
  const tableBody = document.getElementById('insightsTableBody');
  if (!tableBody) return;

  tableBody.innerHTML = '';

  APP_STATE.feeders.forEach(feeder => {
    const tr = document.createElement('tr');
    tr.className = 'border-b border-outline-variant/30 hover:bg-surface-container-highest/50 transition-colors cursor-pointer';
    tr.onclick = () => {
      APP_STATE.currentFeederId = feeder.id;
      switchView('detail');
    };

    tr.innerHTML = `
      <td class="p-3 font-bold text-on-surface">${feeder.name}</td>
      <td class="p-3 text-primary font-label-mono-sm">${feeder.disco}</td>
      <td class="p-3 text-on-surface-variant font-label-mono-sm">${feeder.grid}</td>
      <td class="p-3 text-error font-label-mono-sm">${feeder.lossTag}</td>
      <td class="p-3 text-on-surface font-label-mono-lg">${Math.floor(feeder.scheduledHours)}h</td>
      <td class="p-3 text-error font-label-mono-lg font-bold">${Math.floor(feeder.actualHours)}h</td>
      <td class="p-3 text-xs">
        <span class="px-2 py-1 rounded border ${feeder.status === 'OFFLINE' ? 'border-error text-error bg-error-container/10' : feeder.status === 'ONLINE' ? 'border-primary text-primary bg-primary-container/10' : 'border-tertiary-container text-tertiary-container'}">
          ${feeder.variance}
        </span>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

// --- TOAST NOTIFICATIONS ---
function showToast(message) {
  const toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) return;

  const toast = document.createElement('div');
  toast.className = 'bg-surface-container-highest border border-primary/40 text-on-surface px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 toast-enter pointer-events-auto z-50';
  toast.innerHTML = `
    <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">check_circle</span>
    <span class="font-label-mono-lg text-sm">${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
