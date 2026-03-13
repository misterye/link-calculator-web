/**
 * Satellite Link Parameter Calculator
 * Refactored for DVB-S2 / DVB-S2X compatibility
 *
 * Key changes from original:
 * - Roll-off factor (α) is user-configurable, not a constant
 * - Overhead efficiency (η_oh) is configurable (default 1.0; 188/204 for legacy DVB-S RS)
 * - "Modulation factor" renamed to "bits per symbol" (m = log2(M))
 * - Added dBW conversion
 * - Added unit scaling helpers
 */

// ----- Bits per symbol (m) per modulation scheme -----
const BITS_PER_SYMBOL = {
  BPSK: 1,
  QPSK: 2,
  '8PSK': 3,
  '16APSK': 4,
  '32APSK': 5,
  '64APSK': 6,
  '128APSK': 7,
  '256APSK': 8,
}

// ----- Common roll-off presets -----
const ROLL_OFF_PRESETS = [0.05, 0.1, 0.15, 0.2, 0.25, 0.35]

// ----- Overhead efficiency presets -----
const OVERHEAD_PRESETS = [
  { label: '1.0 (DVB-S2/S2X)', value: 1 },
  { label: '188/204 (DVB-S RS)', value: 188 / 204 },
]

// ----- Unit scale multipliers (relative to base unit) -----
const UNIT_SCALES = {
  bps: 1,
  kbps: 1e3,
  Mbps: 1e6,
  Gbps: 1e9,
  sps: 1,
  ksps: 1e3,
  Msps: 1e6,
  Hz: 1,
  kHz: 1e3,
  MHz: 1e6,
}

const DATA_RATE_UNITS = ['bps', 'kbps', 'Mbps', 'Gbps']
const SYMBOL_RATE_UNITS = ['sps', 'ksps', 'Msps']
const BANDWIDTH_UNITS = ['Hz', 'kHz', 'MHz']

// ----- Downlink MODCOD list (DVB-S2 / S2X) -----
const DOWNLINK_MODCODS = [
  'BPSK 1/5','BPSK 11/45','BPSK 4/15','BPSK 1/3',
  'QPSK 2/9','QPSK 11/45','QPSK 1/4','QPSK 4/15','QPSK 13/45','QPSK 14/45',
  'QPSK 1/3','QPSK 2/5','QPSK 9/20','QPSK 7/15','QPSK 1/2','QPSK 11/20',
  'QPSK 8/15','QPSK 3/5','QPSK 2/3','QPSK 32/45','QPSK 3/4','QPSK 4/5',
  'QPSK 5/6','QPSK 8/9','QPSK 9/10',
  '8PSK 7/15','8PSK 8/15','8PSK 3/5','8PSK 26/45','8PSK 23/36','8PSK 2/3',
  '8PSK 25/36','8PSK 13/18','8PSK 32/45','8PSK 3/4','8PSK 5/6','8PSK 8/9','8PSK 9/10',
  '16APSK 1/2-L','16APSK 7/15','16APSK 8/15-L','16APSK 5/9-L','16APSK 8/15',
  '16APSK 3/5-L','16APSK 26/45','16APSK 3/5','16APSK 28/45','16APSK 23/36',
  '16APSK 2/3-L','16APSK 2/3','16APSK 25/36','16APSK 13/18','16APSK 32/45',
  '16APSK 3/4','16APSK 7/9','16APSK 4/5','16APSK 5/6','16APSK 77/90',
  '16APSK 8/9','16APSK 9/10',
  '32APSK 2/3-L','32APSK 2/3','32APSK 32/45','32APSK 11/15','32APSK 3/4',
  '32APSK 7/9','32APSK 4/5','32APSK 5/6','32APSK 8/9','32APSK 9/10',
  '64APSK 32/45-L','64APSK 11/15','64APSK 7/9','64APSK 4/5','64APSK 5/6',
  '128APSK 3/4','128APSK 7/9',
  '256APSK 29/45-L','256APSK 2/3-L','256APSK 31/45-L','256APSK 32/45',
  '256APSK 11/15-L','256APSK 3/4',
]

// ----- Uplink MODCOD list -----
const UPLINK_MODCODS = [
  'QPSK-7/20','QPSK-2/5','QPSK-9/20','QPSK-1/2','QPSK-11/20','QPSK-3/5',
  'QPSK-13/20','QPSK-7/10','QPSK-3/4','QPSK-4/5','QPSK-17/20',
  '8PSK-7/15','8PSK-1/2','8PSK-8/15','8PSK-17/30','8PSK-3/5',
  '8PSK-19/30','8PSK-2/3','8PSK-7/10','8PSK-11/15',
  '16APSK-2/5','16APSK-17/40','16APSK-9/20','16APSK-19/40','16APSK-1/2',
  '16APSK-21/40','16APSK-11/20','16APSK-23/40','16APSK-3/5','16APSK-5/8',
  '16APSK-13/20','16APSK-27/40','16APSK-7/10','16APSK-29/40',
  '16APSK-3/4','16APSK-31/40','16APSK-4/5',
  '64APSK-31/60','64APSK-8/15','64APSK-11/20','64APSK-17/30','64APSK-7/12',
  '64APSK-3/5','64APSK-37/60','64APSK-19/30','64APSK-13/20','64APSK-2/3',
  '64APSK-41/60','64APSK-7/10','64APSK-43/60','64APSK-11/15',
  '64APSK-3/4','64APSK-23/30','64APSK-47/60','64APSK-4/5','64APSK-49/60',
  '64APSK-5/6','64APSK-17/20','64APSK-13/15','64APSK-53/60',
]

// ===================== Helper functions =====================

/** Extract modulation name from MODCOD string */
function getModulation(modcod) {
  if (modcod.includes(' ')) return modcod.split(' ')[0]
  if (modcod.includes('-')) return modcod.split('-')[0]
  return ''
}

/** Extract FEC code rate (numeric) from MODCOD string */
function getFecRate(modcod) {
  let fecPart = ''
  if (modcod.includes(' ')) {
    fecPart = modcod.split(' ')[1]
  } else if (modcod.includes('-')) {
    fecPart = modcod.split('-').slice(1).join('-')
  }
  // Strip -L suffix
  fecPart = fecPart.replace(/-L$/, '')
  if (fecPart.includes('/')) {
    const [num, den] = fecPart.split('/').map(Number)
    return num / den
  }
  return 1
}

/** Get bits per symbol for a MODCOD */
function getBitsPerSymbol(modcod) {
  const mod = getModulation(modcod)
  return BITS_PER_SYMBOL[mod] || 2
}

// ===================== Core calculations =====================

/**
 * Calculate Symbol Rate
 * Rs = Rd / (m × CR × η_oh)
 */
function calculateSymbolRate(dataRate, modcod, overheadEfficiency = 1) {
  const m = getBitsPerSymbol(modcod)
  const cr = getFecRate(modcod)
  return dataRate / (m * cr * overheadEfficiency)
}

/**
 * Calculate Data Rate
 * Rd = Rs × m × CR × η_oh
 */
function calculateDataRate(symbolRate, modcod, overheadEfficiency = 1) {
  const m = getBitsPerSymbol(modcod)
  const cr = getFecRate(modcod)
  return symbolRate * m * cr * overheadEfficiency
}

/**
 * Calculate Bandwidth
 * BW = Rs × (1 + α)
 */
function calculateBandwidth(symbolRate, rollOff) {
  return symbolRate * (1 + rollOff)
}

/**
 * Calculate Spectral Efficiency
 * η = Rd / BW   (bits/s/Hz)
 */
function calculateEfficiency(dataRate, bandwidth) {
  return bandwidth > 0 ? dataRate / bandwidth : 0
}

// ===================== Power conversions =====================

/** Watts → dBm : P_dBm = 10·log10(P_W) + 30 */
function wattsTodBm(watts) {
  return watts > 0 ? 10 * Math.log10(watts) + 30 : -Infinity
}

/** Watts → dBW : P_dBW = 10·log10(P_W) */
function wattsTodBW(watts) {
  return watts > 0 ? 10 * Math.log10(watts) : -Infinity
}

/** dBm → Watts : P_W = 10^((P_dBm − 30)/10) */
function dBmToWatts(dBm) {
  return Math.pow(10, (dBm - 30) / 10)
}

/** dBm → dBW : P_dBW = P_dBm − 30 */
function dBmTodBW(dBm) {
  return dBm - 30
}

/** dBW → Watts : P_W = 10^(P_dBW/10) */
function dBWToWatts(dBW) {
  return Math.pow(10, dBW / 10)
}

/** dBW → dBm : P_dBm = P_dBW + 30 */
function dBWTodBm(dBW) {
  return dBW + 30
}

/**
 * Given one power value & its unit, compute all three representations.
 * Returns { watts, dBm, dBW }
 */
function convertPower(value, fromUnit) {
  let watts, dBm, dBW
  switch (fromUnit) {
    case 'W':
      watts = value
      dBm = wattsTodBm(value)
      dBW = wattsTodBW(value)
      break
    case 'dBm':
      dBm = value
      watts = dBmToWatts(value)
      dBW = dBmTodBW(value)
      break
    case 'dBW':
      dBW = value
      watts = dBWToWatts(value)
      dBm = dBWTodBm(value)
      break
    default:
      watts = value
      dBm = wattsTodBm(value)
      dBW = wattsTodBW(value)
  }
  return { watts, dBm, dBW }
}

// ===================== Exports =====================

const calculator = {
  // Constants & data
  BITS_PER_SYMBOL,
  ROLL_OFF_PRESETS,
  OVERHEAD_PRESETS,
  UNIT_SCALES,
  DATA_RATE_UNITS,
  SYMBOL_RATE_UNITS,
  BANDWIDTH_UNITS,
  DOWNLINK_MODCODS,
  UPLINK_MODCODS,
  // Helpers
  getModulation,
  getFecRate,
  getBitsPerSymbol,
  // Link calculations
  calculateSymbolRate,
  calculateDataRate,
  calculateBandwidth,
  calculateEfficiency,
  // Power conversions
  wattsTodBm,
  wattsTodBW,
  dBmToWatts,
  dBmTodBW,
  dBWToWatts,
  dBWTodBm,
  convertPower,
}

export default calculator
