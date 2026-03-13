import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Activity, Zap, ArrowLeftRight, Thermometer, Satellite, Radio } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import { useI18n } from '../contexts/I18nContext'

const features = [
  { key: 'linkEfficiency', icon: Activity, path: '/link-efficiency' },
  { key: 'powerConverter', icon: Zap, path: '/power-converter' },
  { key: 'ebN0', icon: ArrowLeftRight, path: '/ebn0' },
  { key: 'noiseFigure', icon: Thermometer, path: '/noise-figure' },
  { key: 'antenna', icon: Satellite, path: '/antenna' },
  { key: 'eirpGT', icon: Radio, path: '/eirp-gt' },
]

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
      <div className="flex flex-col gap-4">
        {features.map((feat, i) => {
          const Icon = feat.icon
          return (
            <GlassCard
              key={feat.key}
              delay={0.1 + i * 0.06}
              hoverable
              onClick={() => navigate(feat.path)}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex items-center justify-center w-11 h-11 rounded-2xl shrink-0"
                  style={{ background: 'var(--accent-soft)' }}
                >
                  <Icon size={20} style={{ color: 'var(--accent)' }} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <h2
                    className="text-base font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {t(`home.${feat.key}`)}
                  </h2>
                  <p
                    className="text-sm"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {t(`home.${feat.key}Desc`)}
                  </p>
                </div>
              </div>
            </GlassCard>
          )
        })}
      </div>
    </div>
  )
}
