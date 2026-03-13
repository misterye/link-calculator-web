import { useState, useMemo } from 'react'
import GlassCard from '../components/GlassCard'
import SegmentedControl from '../components/SegmentedControl'
import LiveNumber from '../components/LiveNumber'
import calculator from '../utils/calculator'
import { useI18n } from '../contexts/I18nContext'

const POWER_UNITS = ['W', 'dBm', 'dBW']

export default function PowerConverter() {
  const { t } = useI18n()

  const [inputUnit, setInputUnit] = useState('W')
  const [inputValue, setInputValue] = useState('')

  const numericInput = parseFloat(inputValue)
  const hasInput = inputValue !== '' && isFinite(numericInput)

  // Validate: for Watts, must be > 0
  const isValid = hasInput && (inputUnit !== 'W' || numericInput > 0)

  const results = useMemo(() => {
    if (!isValid) return null
    return calculator.convertPower(numericInput, inputUnit)
  }, [numericInput, inputUnit, isValid])

  const unitLabels = {
    W: t('power.watts'),
    dBm: t('power.dBm'),
    dBW: t('power.dBW'),
  }

  return (
    <div className="flex flex-col gap-5 pt-4">
      {/* Title */}
      <h1
        className="text-2xl sm:text-3xl font-bold tracking-tight"
        style={{ color: 'var(--text-primary)' }}
      >
        {t('power.title')}
      </h1>

      {/* Input Unit */}
      <GlassCard delay={0.05}>
        <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--text-muted)' }}>
          {t('power.inputUnit')}
        </label>
        <SegmentedControl
          options={POWER_UNITS.map((u) => ({ value: u, label: unitLabels[u] }))}
          value={inputUnit}
          onChange={(val) => {
            setInputUnit(val)
            setInputValue('')
          }}
        />
      </GlassCard>

      {/* Input Value */}
      <GlassCard delay={0.1}>
        <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--text-muted)' }}>
          {t('power.inputValue')}
        </label>
        <div className="flex items-center gap-2">
          <input
            className="glass-input"
            style={{ flex: 1 }}
            type="number"
            placeholder="0"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <span
            className="text-sm font-medium shrink-0"
            style={{ color: 'var(--text-secondary)', minWidth: '40px' }}
          >
            {inputUnit}
          </span>
        </div>
      </GlassCard>

      {/* ─── Results — all three conversions ─── */}
      {results && (
        <GlassCard delay={0}>
          <div className="flex flex-col gap-6">
            <LiveNumber
              label={t('power.resultWatts')}
              value={results.watts}
              unit="W"
              precision={5}
            />
            <LiveNumber
              label={t('power.resultdBm')}
              value={results.dBm}
              unit="dBm"
              precision={3}
            />
            <LiveNumber
              label={t('power.resultdBW')}
              value={results.dBW}
              unit="dBW"
              precision={3}
            />
          </div>
        </GlassCard>
      )}
    </div>
  )
}
