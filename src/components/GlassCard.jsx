import { motion } from 'framer-motion'

export default function GlassCard({ children, className = '', delay = 0, onClick, hoverable = false, ...props }) {
  return (
    <motion.div
      className={`glass-card ${hoverable ? 'cursor-pointer' : ''} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={hoverable ? { scale: 1.015, boxShadow: 'var(--shadow-glow)' } : undefined}
      whileTap={hoverable ? { scale: 0.985 } : undefined}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  )
}
