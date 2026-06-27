import { useState, useEffect } from 'react'

export default function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : defaultValue
    } catch (e) {
      console.warn(`Error reading localStorage key "${key}":`, e)
      return defaultValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state))
    } catch (e) {
      console.warn(`Error setting localStorage key "${key}":`, e)
    }
  }, [key, state])

  return [state, setState]
}
