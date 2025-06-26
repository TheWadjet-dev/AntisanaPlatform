import { useState, useEffect } from 'react'

export const useInstallPWA = () => {
  const [isInstallable, setIsInstallable] = useState(false)
  const [installPrompt, setInstallPrompt] = useState(null)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setInstallPrompt(e)
      setIsInstallable(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const installPWA = async () => {
    if (!installPrompt) return false

    const result = await installPrompt.prompt()
    setInstallPrompt(null)
    setIsInstallable(false)
    
    return result.outcome === 'accepted'
  }

  return { isInstallable, installPWA }
}
