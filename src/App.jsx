import { Routes, Route } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Home as HomeIcon } from 'lucide-react'
import ThemeToggle from './components/ThemeToggle'
import LanguageToggle from './components/LanguageToggle'
import Home from './pages/Home'
import LinkEfficiency from './pages/LinkEfficiency'
import PowerConverter from './pages/PowerConverter'
import EbN0Converter from './pages/EbN0Converter'
import NoiseFigure from './pages/NoiseFigure'
import AntennaCalc from './pages/AntennaCalc'
import EirpGT from './pages/EirpGT'
import FormulaExplanation from './pages/FormulaExplanation'
import { useI18n } from './contexts/I18nContext'

function AppLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useI18n()
  const isHome = location.pathname === '/'
  const isFormulaPage = location.pathname.endsWith('/formula')

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* ─── Header bar ─── */}
      <header className="flex items-center justify-between px-5 pt-8 pb-4 sm:px-8 sm:pt-10 sm:pb-5">
        <div className="flex items-center gap-3">
          {!isHome && !isFormulaPage && (
            <motion.button
              className="glass-card !p-2.5 !rounded-full cursor-pointer"
              style={{
                border: '1px solid var(--border-glass)',
                minWidth: '38px',
                minHeight: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={() => navigate(-1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={t('common.back')}
            >
              <ArrowLeft size={18} style={{ color: 'var(--text-secondary)' }} />
            </motion.button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {!isHome && (
            <motion.button
              className="glass-card !p-2.5 !rounded-full cursor-pointer"
              style={{
                border: '1px solid var(--border-glass)',
                minWidth: '38px',
                minHeight: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Go to home"
            >
              <HomeIcon size={18} style={{ color: 'var(--text-secondary)' }} />
            </motion.button>
          )}
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </header>

      {/* ─── Main content ─── */}
      <main className="px-5 pt-2 pb-10 sm:px-8">
        <div className="mx-auto w-full max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/link-efficiency" element={<LinkEfficiency />} />
                <Route path="/power-converter" element={<PowerConverter />} />
                <Route path="/ebn0" element={<EbN0Converter />} />
                <Route path="/noise-figure" element={<NoiseFigure />} />
                <Route path="/antenna" element={<AntennaCalc />} />
                <Route path="/eirp-gt" element={<EirpGT />} />
                <Route path="/:type/formula" element={<FormulaExplanation />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}

export default function App() {
  return <AppLayout />
}
