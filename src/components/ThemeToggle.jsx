import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <motion.button
      className="glass-card !p-2.5 !rounded-full cursor-pointer"
      style={{ border: '1px solid var(--border-glass)' }}
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        {isDark ? (
          <Sun size={18} style={{ color: 'var(--accent)' }} />
        ) : (
          <Moon size={18} style={{ color: 'var(--text-secondary)' }} />
        )}
      </motion.div>
    </motion.button>
  )
}
