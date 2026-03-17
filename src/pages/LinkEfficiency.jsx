import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import GlassCard from '../components/GlassCard'
import SegmentedControl from '../components/SegmentedControl'
import LiveNumber from '../components/LiveNumber'
import calculator from '../utils/calculator'
import { useI18n } from '../contexts/I18nContext'

const ROLL_OFF_OPTIONS = [...calculator.ROLL_OFF_PRESETS.map(String), 'custom']

export default function LinkEfficiency() {
  const { t } = useI18n()
  const navigate = useNavigate()

  // ─── State ───
  const [linkType, setLinkType] = useState('downlink')
  const [calcMode, setCalcMode] = useState('dataToSymbol')
  const [selectedModcod, setSelectedModcod] = useState('')
  const [rollOff, setRollOff] = useState('0.05')
  const [customRollOff, setCustomRollOff] = useState('')
  const [overhead, setOverhead] = useState('1')
  const [inputValue, setInputValue] = useState('')
  const [dataRateUnit, setDataRateUnit] = useState('kbps')
  const [symbolRateUnit, setSymbolRateUnit] = useState('ksps')

  // ─── Derived ───
  const modcods = linkType === 'downlink' ? calculator.DOWNLINK_MODCODS : calculator.UPLINK_MODCODS
  const activeModcod = modcods.includes(selectedModcod) ? selectedModcod : modcods[0]

  const effectiveRollOff = rollOff === 'custom'
    ? parseFloat(customRollOff) || 0
    : parseFloat(rollOff)

  const effectiveOverhead = parseFloat(overhead)

  const numericInput = parseFloat(inputValue) || 0

  // ─── Real-time calculation ───
  const results = useMemo(() => {
    if (numericInput <= 0) return null

    if (calcMode === 'dataToSymbol') {
      // Input is data rate
      const dataRate = numericInput
      const symbolRate = calculator.calculateSymbolRate(dataRate, activeModcod, effectiveOverhead)
      const bandwidth = calculator.calculateBandwidth(symbolRate, effectiveRollOff)
      const efficiency = calculator.calculateEfficiency(dataRate, bandwidth)
      return { dataRate, symbolRate, bandwidth, efficiency }
    } else {
      // Input is symbol rate
      const symbolRate = numericInput
      const dataRate = calculator.calculateDataRate(symbolRate, activeModcod, effectiveOverhead)
      const bandwidth = calculator.calculateBandwidth(symbolRate, effectiveRollOff)
      const efficiency = calculator.calculateEfficiency(dataRate, bandwidth)
      return { dataRate, symbolRate, bandwidth, efficiency }
    }
  }, [numericInput, calcMode, activeModcod, effectiveRollOff, effectiveOverhead])

  // ─── Unit labels for results ───
  const drUnitMap = { bps: 'bps', kbps: 'kbps', Mbps: 'Mbps', Gbps: 'Gbps' }
  const srUnitMap = { sps: 'sps', ksps: 'ksps', Msps: 'Msps' }
  const bwUnitMap = { Hz: 'Hz', kHz: 'kHz', MHz: 'MHz' }

  // Map data rate unit → corresponding symbol rate / bandwidth units
  const unitIndex = calculator.DATA_RATE_UNITS.indexOf(dataRateUnit)
  const srUnit = calculator.SYMBOL_RATE_UNITS[Math.min(unitIndex, calculator.SYMBOL_RATE_UNITS.length - 1)]
  const bwUnit = calculator.BANDWIDTH_UNITS[Math.min(unitIndex, calculator.BANDWIDTH_UNITS.length - 1)]

  // ─── Handle link type change → reset modcod ───
  const handleLinkTypeChange = (val) => {
    setLinkType(val)
    setSelectedModcod('')
  }

  return (
    <div className="flex flex-col gap-5 pt-4">
      {/* Title */}
      <h1
        className="text-2xl sm:text-3xl font-bold tracking-tight"
        style={{ color: 'var(--text-primary)' }}
      >
        {t('link.title')}
      </h1>

      {/* Link Type */}
      <GlassCard delay={0.05}>
        <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--text-muted)' }}>
          {t('link.linkType')}
        </label>
        <SegmentedControl
          options={[
            { value: 'downlink', label: t('link.downlink') },
            { value: 'uplink', label: t('link.uplink') },
          ]}
          value={linkType}
          onChange={handleLinkTypeChange}
        />
      </GlassCard>

      {/* Calc Mode */}
      <GlassCard delay={0.1}>
        <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--text-muted)' }}>
          {t('link.calcMode')}
        </label>
        <SegmentedControl
          options={[
            { value: 'dataToSymbol', label: t('link.dataToSymbol') },
            { value: 'symbolToData', label: t('link.symbolToData') },
          ]}
          value={calcMode}
          onChange={setCalcMode}
        />
      </GlassCard>

      {/* MODCOD + Roll-off + Overhead */}
      <GlassCard delay={0.15}>
        <div className="flex flex-col gap-4">
          {/* MODCOD */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
              {t('link.modcod')}
            </label>
            <select
              className="glass-select"
              value={activeModcod}
              onChange={(e) => setSelectedModcod(e.target.value)}
            >
              {modcods.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Roll-off */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
              {t('link.rollOff')}
            </label>
            <div className="flex gap-2">
              <select
                className="glass-select"
                style={{ flex: 1 }}
                value={rollOff}
                onChange={(e) => setRollOff(e.target.value)}
              >
                {calculator.ROLL_OFF_PRESETS.map((r) => (
                  <option key={r} value={String(r)}>{r}</option>
                ))}
                <option value="custom">{t('link.rollOffCustom')}</option>
              </select>
              {rollOff === 'custom' && (
                <input
                  className="glass-input"
                  style={{ flex: 1 }}
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  placeholder="0.00–1.00"
                  value={customRollOff}
                  onChange={(e) => setCustomRollOff(e.target.value)}
                />
              )}
            </div>
          </div>

          {/* Overhead Efficiency */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
              {t('link.overhead')}
            </label>
            <select
              className="glass-select"
              value={overhead}
              onChange={(e) => setOverhead(e.target.value)}
            >
              {calculator.OVERHEAD_PRESETS.map((o) => (
                <option key={o.value} value={String(o.value)}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      </GlassCard>

      {/* Input */}
      <GlassCard delay={0.2}>
        <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--text-muted)' }}>
          {calcMode === 'dataToSymbol' ? t('link.inputDataRate') : t('link.inputSymbolRate')}
        </label>
        <div className="flex gap-2">
          <input
            className="glass-input"
            style={{ flex: 1 }}
            type="number"
            min="0"
            placeholder="0"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <select
            className="glass-select"
            style={{ width: '100px', flex: 'none' }}
            value={calcMode === 'dataToSymbol' ? dataRateUnit : symbolRateUnit}
            onChange={(e) =>
              calcMode === 'dataToSymbol'
                ? setDataRateUnit(e.target.value)
                : setSymbolRateUnit(e.target.value)
            }
          >
            {(calcMode === 'dataToSymbol' ? calculator.DATA_RATE_UNITS : calculator.SYMBOL_RATE_UNITS).map(
              (u) => <option key={u} value={u}>{u}</option>
            )}
          </select>
        </div>
      </GlassCard>

      {/* ─── Results ─── */}
      {results && (
        <GlassCard delay={0}>
          <label className="text-xs font-medium mb-4 block" style={{ color: 'var(--text-muted)' }}>
            {t('link.resultDataRate') + ' / ' + t('link.resultSymbolRate')}
          </label>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <LiveNumber
              label={t('link.resultDataRate')}
              value={results.dataRate}
              unit={calcMode === 'dataToSymbol' ? dataRateUnit : drUnitMap[dataRateUnit] || 'kbps'}
              precision={4}
            />
            <LiveNumber
              label={t('link.resultSymbolRate')}
              value={results.symbolRate}
              unit={calcMode === 'dataToSymbol' ? srUnit : symbolRateUnit}
              precision={4}
            />
            <LiveNumber
              label={t('link.resultBandwidth')}
              value={results.bandwidth}
              unit={bwUnit}
              precision={4}
            />
            <LiveNumber
              label={t('link.resultEfficiency')}
              value={results.efficiency}
              unit={t('link.unitBpsHz')}
              precision={4}
            />
          </div>
        </GlassCard>
      )}

      {/* Formula Explanation Card */}
      <GlassCard delay={0.3}>
        <div 
          className="flex flex-row items-center justify-between cursor-pointer"
          onClick={() => navigate('/link-efficiency/formula')}
        >
          <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
            {t('common.formulaExplanation')}
          </span>
          <span style={{ color: 'var(--text-muted)' }}>→</span>
        </div>
      </GlassCard>
    </div>
  )
}
