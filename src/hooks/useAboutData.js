import { useState, useEffect } from 'react'

export function useAboutData() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadAboutData = async () => {
      try {
        // En un entorno real, esto podría ser una llamada a API
        const response = await import('../data/aboutContent.json')
        setData(response.default)
      } catch (err) {
        setError(err.message)
        console.error('Error loading about data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadAboutData()
  }, [])

  return { data, loading, error }
}
