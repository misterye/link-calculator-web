import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Activity, Zap } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import { useI18n } from '../contexts/I18nContext'

export default function Home() {
  const navigate = useNavigate()
  const { t } = useI18n()

  return (
    <div className="flex flex-col gap-8 pt-8 sm:pt-16">
      {/* ─── Title ─── */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h1
          className="text-3xl sm:text-4xl font-bold tracking-tight mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('home.title')}
        </h1>
        <p
          className="text-sm sm:text-base"
          style={{ color: 'var(--text-muted)' }}
        >
          {t('home.subtitle')}
        </p>
      </motion.div>

      {/* ─── Feature cards ─── */}
      <div className="flex flex-col gap-5">
        <GlassCard
          delay={0.15}
          hoverable
          onClick={() => navigate('/link-efficiency')}
        >
          <div className="flex items-start gap-4">
            <div
              className="flex items-center justify-center w-12 h-12 rounded-2xl shrink-0"
              style={{ background: 'var(--accent-soft)' }}
            >
              <Activity size={22} style={{ color: 'var(--accent)' }} />
            </div>
            <div className="flex flex-col gap-1">
              <h2
                className="text-base font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                {t('home.linkEfficiency')}
              </h2>
              <p
                className="text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                {t('home.linkEfficiencyDesc')}
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard
          delay={0.25}
          hoverable
          onClick={() => navigate('/power-converter')}
        >
          <div className="flex items-start gap-4">
            <div
              className="flex items-center justify-center w-12 h-12 rounded-2xl shrink-0"
              style={{ background: 'var(--accent-soft)' }}
            >
              <Zap size={22} style={{ color: 'var(--accent)' }} />
            </div>
            <div className="flex flex-col gap-1">
              <h2
                className="text-base font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                {t('home.powerConverter')}
              </h2>
              <p
                className="text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                {t('home.powerConverterDesc')}
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
