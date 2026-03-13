import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LiveNumber({ value, unit, precision = 4, label = '' }) {
  const [displayValue, setDisplayValue] = useState(value)
  const [key, setKey] = useState(0)

  useEffect(() => {
    setDisplayValue(value)
    setKey((k) => k + 1)
  }, [value])

  const formatted = typeof displayValue === 'number' && isFinite(displayValue)
    ? displayValue.toFixed(precision)
    : '—'

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
          {label}
        </span>
      )}
      <div className="flex items-baseline gap-1 flex-wrap">
        <AnimatePresence mode="wait">
          <motion.span
            key={key}
            className="live-number"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {formatted}
          </motion.span>
        </AnimatePresence>
        {unit && <span className="live-unit">{unit}</span>}
      </div>
    </div>
  )
}
