import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import GlassCard from '../components/GlassCard'
import SegmentedControl from '../components/SegmentedControl'
import LiveNumber from '../components/LiveNumber'
import calculator from '../utils/calculator'
import { useI18n } from '../contexts/I18nContext'

export default function EirpGT() {
  const { t } = useI18n()
  const navigate = useNavigate()

  const [section, setSection] = useState('eirp')

  // EIRP inputs
  const [ptx, setPtx] = useState('')
  const [gtx, setGtx] = useState('')
  const [ltx, setLtx] = useState('')

  // G/T inputs
  const [grx, setGrx] = useState('')
  const [tsys, setTsys] = useState('')

  const eirpResult = useMemo(() => {
    const p = parseFloat(ptx)
    const g = parseFloat(gtx)
    const l = parseFloat(ltx)
    if ([p, g, l].some((v) => isNaN(v))) return null
    return calculator.calcEIRP(p, g, l)
  }, [ptx, gtx, ltx])

  const gtResult = useMemo(() => {
    const g = parseFloat(grx)
    const ts = parseFloat(tsys)
    if (isNaN(g) || isNaN(ts) || ts <= 0) return null
    return calculator.calcGT(g, ts)
  }, [grx, tsys])

  return (
    <div className="flex flex-col gap-5 pt-4">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
        {t('eirp.title')}
      </h1>

      <GlassCard delay={0.05}>
        <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--text-muted)' }}>
          {t('eirp.section')}
        </label>
        <SegmentedControl
          options={[
            { value: 'eirp', label: t('eirp.calcEIRP') },
            { value: 'gt', label: t('eirp.calcGT') },
          ]}
          value={section}
          onChange={setSection}
        />
      </GlassCard>

      {/* ─── EIRP ─── */}
      {section === 'eirp' && (
        <>
          <GlassCard delay={0.1}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{t('eirp.ptx')}</label>
                <div className="flex gap-2">
                  <input className="glass-input" style={{ flex: 1 }} type="number" placeholder="0" value={ptx} onChange={(e) => setPtx(e.target.value)} />
                  <span className="text-sm font-medium flex items-center shrink-0" style={{ color: 'var(--text-secondary)' }}>dBW</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{t('eirp.gtx')}</label>
                <div className="flex gap-2">
                  <input className="glass-input" style={{ flex: 1 }} type="number" placeholder="0" value={gtx} onChange={(e) => setGtx(e.target.value)} />
                  <span className="text-sm font-medium flex items-center shrink-0" style={{ color: 'var(--text-secondary)' }}>dBi</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{t('eirp.ltx')}</label>
                <div className="flex gap-2">
                  <input className="glass-input" style={{ flex: 1 }} type="number" placeholder="0" value={ltx} onChange={(e) => setLtx(e.target.value)} />
                  <span className="text-sm font-medium flex items-center shrink-0" style={{ color: 'var(--text-secondary)' }}>dB</span>
                </div>
              </div>
            </div>
          </GlassCard>

          {eirpResult !== null && (
            <GlassCard delay={0}>
              <LiveNumber label={t('eirp.resultEIRP')} value={eirpResult} unit="dBW" precision={2} />
            </GlassCard>
          )}
        </>
      )}

      {/* ─── G/T ─── */}
      {section === 'gt' && (
        <>
          <GlassCard delay={0.1}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{t('eirp.grx')}</label>
                <div className="flex gap-2">
                  <input className="glass-input" style={{ flex: 1 }} type="number" placeholder="0" value={grx} onChange={(e) => setGrx(e.target.value)} />
                  <span className="text-sm font-medium flex items-center shrink-0" style={{ color: 'var(--text-secondary)' }}>dBi</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{t('eirp.tsys')}</label>
                <div className="flex gap-2">
                  <input className="glass-input" style={{ flex: 1 }} type="number" placeholder="0" min="0" value={tsys} onChange={(e) => setTsys(e.target.value)} />
                  <span className="text-sm font-medium flex items-center shrink-0" style={{ color: 'var(--text-secondary)' }}>K</span>
                </div>
              </div>
            </div>
          </GlassCard>

          {gtResult !== null && (
            <GlassCard delay={0}>
              <LiveNumber label={t('eirp.resultGT')} value={gtResult} unit="dB/K" precision={2} />
            </GlassCard>
          )}
        </>
      )}

      {/* Formula Explanation Card */}
      <GlassCard delay={0.2}>
        <div 
          className="flex flex-row items-center justify-between cursor-pointer"
          onClick={() => navigate('/eirp-gt/formula')}
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
