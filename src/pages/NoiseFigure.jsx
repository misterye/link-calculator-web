import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import GlassCard from '../components/GlassCard'
import SegmentedControl from '../components/SegmentedControl'
import LiveNumber from '../components/LiveNumber'
import calculator from '../utils/calculator'
import { useI18n } from '../contexts/I18nContext'

export default function NoiseFigure() {
  const { t } = useI18n()
  const navigate = useNavigate()

  const [mode, setMode] = useState('nfToTe')
  const [inputVal, setInputVal] = useState('')

  const numInput = parseFloat(inputVal)
  const valid = inputVal !== '' && isFinite(numInput) && (mode === 'nfToTe' ? true : numInput >= 0)

  const result = useMemo(() => {
    if (!valid) return null
    if (mode === 'nfToTe') {
      return { nf: numInput, te: calculator.nfToTe(numInput) }
    } else {
      return { te: numInput, nf: calculator.teToNf(numInput) }
    }
  }, [mode, numInput, valid])

  return (
    <div className="flex flex-col gap-5 pt-4">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
        {t('noise.title')}
      </h1>

      <GlassCard delay={0.05}>
        <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--text-muted)' }}>
          {t('noise.mode')}
        </label>
        <SegmentedControl
          options={[
            { value: 'nfToTe', label: t('noise.nfToTe') },
            { value: 'teToNf', label: t('noise.teToNf') },
          ]}
          value={mode}
          onChange={(v) => { setMode(v); setInputVal('') }}
        />
      </GlassCard>

      <GlassCard delay={0.1}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
              {mode === 'nfToTe' ? t('noise.nf') : t('noise.te')}
            </label>
            <div className="flex gap-2">
              <input
                className="glass-input"
                style={{ flex: 1 }}
                type="number"
                placeholder="0"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
              />
              <span className="text-sm font-medium flex items-center shrink-0" style={{ color: 'var(--text-secondary)' }}>
                {mode === 'nfToTe' ? 'dB' : 'K'}
              </span>
            </div>
          </div>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {t('noise.t0')}
          </p>
        </div>
      </GlassCard>

      {result && (
        <GlassCard delay={0}>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <LiveNumber label={t('noise.resultNF')} value={result.nf} unit="dB" precision={3} />
            <LiveNumber label={t('noise.resultTe')} value={result.te} unit="K" precision={2} />
          </div>
        </GlassCard>
      )}

      {/* Formula Explanation Card */}
      <GlassCard delay={0.2}>
        <div 
          className="flex flex-row items-center justify-between cursor-pointer"
          onClick={() => navigate('/noise-figure/formula')}
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
