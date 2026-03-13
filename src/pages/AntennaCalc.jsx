import { useState, useMemo } from 'react'
import GlassCard from '../components/GlassCard'
import LiveNumber from '../components/LiveNumber'
import calculator from '../utils/calculator'
import { useI18n } from '../contexts/I18nContext'

export default function AntennaCalc() {
  const { t } = useI18n()

  const [diameter, setDiameter] = useState('')
  const [frequency, setFrequency] = useState('')
  const [freqUnit, setFreqUnit] = useState('1e9') // GHz
  const [efficiency, setEfficiency] = useState('0.6')

  const numD = parseFloat(diameter) || 0
  const numF = (parseFloat(frequency) || 0) * parseFloat(freqUnit)
  const numEta = parseFloat(efficiency) || 0.6
  const valid = numD > 0 && numF > 0 && numEta > 0 && numEta <= 1

  const result = useMemo(() => {
    if (!valid) return null
    return {
      gain: calculator.antennaGain(numD, numF, numEta),
      beamwidth: calculator.beamwidth3dB(numD, numF),
    }
  }, [numD, numF, numEta, valid])

  return (
    <div className="flex flex-col gap-5 pt-4">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
        {t('antenna.title')}
      </h1>

      <GlassCard delay={0.05}>
        <div className="flex flex-col gap-4">
          {/* Diameter */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
              {t('antenna.diameter')}
            </label>
            <div className="flex gap-2">
              <input className="glass-input" style={{ flex: 1 }} type="number" min="0" placeholder="0" value={diameter} onChange={(e) => setDiameter(e.target.value)} />
              <span className="text-sm font-medium flex items-center shrink-0" style={{ color: 'var(--text-secondary)' }}>m</span>
            </div>
          </div>

          {/* Frequency */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
              {t('antenna.frequency')}
            </label>
            <div className="flex gap-2">
              <input className="glass-input" style={{ flex: 1 }} type="number" min="0" placeholder="0" value={frequency} onChange={(e) => setFrequency(e.target.value)} />
              <select className="glass-select" style={{ width: '90px', flex: 'none' }} value={freqUnit} onChange={(e) => setFreqUnit(e.target.value)}>
                <option value="1e6">MHz</option>
                <option value="1e9">GHz</option>
              </select>
            </div>
          </div>

          {/* Efficiency */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
              {t('antenna.efficiency')}
            </label>
            <select className="glass-select" value={efficiency} onChange={(e) => setEfficiency(e.target.value)}>
              <option value="0.5">0.50</option>
              <option value="0.55">0.55</option>
              <option value="0.6">0.60</option>
              <option value="0.65">0.65</option>
              <option value="0.7">0.70</option>
            </select>
          </div>
        </div>
      </GlassCard>

      {result && (
        <GlassCard delay={0}>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <LiveNumber label={t('antenna.resultGain')} value={result.gain} unit="dBi" precision={2} />
            <LiveNumber label={t('antenna.resultBeamwidth')} value={result.beamwidth} unit="°" precision={3} />
          </div>
        </GlassCard>
      )}
    </div>
  )
}
