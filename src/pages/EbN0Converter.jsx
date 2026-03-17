import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import GlassCard from '../components/GlassCard'
import SegmentedControl from '../components/SegmentedControl'
import LiveNumber from '../components/LiveNumber'
import calculator from '../utils/calculator'
import { useI18n } from '../contexts/I18nContext'

const RATE_UNITS = [
  { value: 1, label: 'bps / Hz' },
  { value: 1e3, label: 'kbps / kHz' },
  { value: 1e6, label: 'Mbps / MHz' },
]

export default function EbN0Converter() {
  const { t } = useI18n()
  const navigate = useNavigate()

  const [mode, setMode] = useState('ebToC')
  const [inputVal, setInputVal] = useState('')
  const [rb, setRb] = useState('')
  const [bn, setBn] = useState('')
  const [rbScale, setRbScale] = useState('1000') // kbps default
  const [bnScale, setBnScale] = useState('1000') // kHz default

  const numInput = parseFloat(inputVal) || 0
  const numRb = (parseFloat(rb) || 0) * parseFloat(rbScale)
  const numBn = (parseFloat(bn) || 0) * parseFloat(bnScale)
  const valid = numInput !== 0 && numRb > 0 && numBn > 0

  const result = useMemo(() => {
    if (!valid) return null
    if (mode === 'ebToC') {
      return { cn: calculator.ebN0ToCN(numInput, numRb, numBn), ebN0: numInput }
    } else {
      return { ebN0: calculator.cnToEbN0(numInput, numRb, numBn), cn: numInput }
    }
  }, [mode, numInput, numRb, numBn, valid])

  return (
    <div className="flex flex-col gap-5 pt-4">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
        {t('ebN0.title')}
      </h1>

      <GlassCard delay={0.05}>
        <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--text-muted)' }}>
          {t('ebN0.mode')}
        </label>
        <SegmentedControl
          options={[
            { value: 'ebToC', label: t('ebN0.ebToC') },
            { value: 'cToEb', label: t('ebN0.cToEb') },
          ]}
          value={mode}
          onChange={(v) => { setMode(v); setInputVal('') }}
        />
      </GlassCard>

      <GlassCard delay={0.1}>
        <div className="flex flex-col gap-4">
          {/* Input value */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
              {mode === 'ebToC' ? t('ebN0.ebN0') : t('ebN0.cn')}
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
              <span className="text-sm font-medium flex items-center shrink-0" style={{ color: 'var(--text-secondary)' }}>dB</span>
            </div>
          </div>

          {/* Rb */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
              {t('ebN0.rb')}
            </label>
            <div className="flex gap-2">
              <input className="glass-input" style={{ flex: 1 }} type="number" placeholder="0" value={rb} onChange={(e) => setRb(e.target.value)} />
              <select className="glass-select" style={{ width: '110px', flex: 'none' }} value={rbScale} onChange={(e) => setRbScale(e.target.value)}>
                <option value="1">bps</option>
                <option value="1000">kbps</option>
                <option value="1000000">Mbps</option>
              </select>
            </div>
          </div>

          {/* Bn */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
              {t('ebN0.bn')}
            </label>
            <div className="flex gap-2">
              <input className="glass-input" style={{ flex: 1 }} type="number" placeholder="0" value={bn} onChange={(e) => setBn(e.target.value)} />
              <select className="glass-select" style={{ width: '110px', flex: 'none' }} value={bnScale} onChange={(e) => setBnScale(e.target.value)}>
                <option value="1">Hz</option>
                <option value="1000">kHz</option>
                <option value="1000000">MHz</option>
              </select>
            </div>
          </div>
        </div>
      </GlassCard>

      {result && (
        <GlassCard delay={0}>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <LiveNumber label={t('ebN0.resultEbN0')} value={result.ebN0} unit="dB" precision={3} />
            <LiveNumber label={t('ebN0.resultCN')} value={result.cn} unit="dB" precision={3} />
          </div>
        </GlassCard>
      )}

      {/* Formula Explanation Card */}
      <GlassCard delay={0.2}>
        <div 
          className="flex flex-row items-center justify-between cursor-pointer"
          onClick={() => navigate('/ebn0/formula')}
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
