import { Routes, Route } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import ThemeToggle from './components/ThemeToggle'
import LanguageToggle from './components/LanguageToggle'
import Home from './pages/Home'
import LinkEfficiency from './pages/LinkEfficiency'
import PowerConverter from './pages/PowerConverter'
import { useI18n } from './contexts/I18nContext'

function AppLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useI18n()
  const isHome = location.pathname === '/'

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* ─── Header bar ─── */}
      <header className="flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        <div className="flex items-center gap-3">
          {!isHome && (
            <motion.button
              className="flex items-center gap-1.5 text-sm cursor-pointer"
              style={{
                color: 'var(--text-secondary)',
                background: 'none',
                border: 'none',
                fontFamily: 'var(--font-sans)',
              }}
              onClick={() => navigate('/')}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: -3, color: 'var(--accent)' }}
              transition={{ duration: 0.2 }}
            >
              <ArrowLeft size={16} />
              {t('common.back')}
            </motion.button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </header>

      {/* ─── Main content ─── */}
      <main className="px-5 pt-2 pb-24 sm:px-8">
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
