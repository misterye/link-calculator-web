import { useRef, useLayoutEffect, useState } from 'react'

export default function SegmentedControl({ options, value, onChange, className = '' }) {
  const containerRef = useRef(null)
  const [indicatorStyle, setIndicatorStyle] = useState({})

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return
    const activeIndex = options.findIndex((o) => o.value === value)
    const buttons = container.querySelectorAll('.seg-btn')
    const activeBtn = buttons[activeIndex]
    if (activeBtn) {
      setIndicatorStyle({
        left: activeBtn.offsetLeft + 'px',
        width: activeBtn.offsetWidth + 'px',
      })
    }
  }, [value, options])

  return (
    <div className={`seg-control ${className}`} ref={containerRef}>
      <div className="seg-indicator" style={indicatorStyle} />
      {options.map((opt) => (
        <button
          key={opt.value}
          className={`seg-btn ${value === opt.value ? 'active' : ''}`}
          onClick={() => onChange(opt.value)}
          type="button"
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
