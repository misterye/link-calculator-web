import { motion } from 'framer-motion'
import { useI18n } from '../contexts/I18nContext'

export default function LanguageToggle() {
  const { locale, toggleLocale } = useI18n()

  return (
    <motion.button
      className="glass-card !p-2.5 !rounded-full cursor-pointer"
      style={{
        border: '1px solid var(--border-glass)',
        fontFamily: 'var(--font-sans)',
        fontSize: '13px',
        fontWeight: 600,
        minWidth: '38px',
        minHeight: '38px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-secondary)',
      }}
      onClick={toggleLocale}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Switch language"
    >
      <motion.span
        key={locale}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {locale === 'zh' ? 'EN' : '中'}
      </motion.span>
    </motion.button>
  )
}
