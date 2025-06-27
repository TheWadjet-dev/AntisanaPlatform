import { useEffect } from 'react'
import Head from 'next/head'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Registrar Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registrado:', registration)
        })
        .catch((error) => {
          console.log('Error al registrar Service Worker:', error)
        })
    }
  }, [])

  return (
    <>
      <Head>
        {/* PWA Meta Tags */}
        <meta name="application-name" content="Plataforma Antisana" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Antisana" />
        <meta name="description" content="Plataforma educativa e interactiva sobre el ecosistema Antisana" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#059669" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#059669" />
        
        {/* iOS específico */}
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="apple-mobile-web-app-orientations" content="portrait" />
        
        {/* Prevenir zoom en inputs y mejorar touch - iOS optimizado */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover, shrink-to-fit=no" />
        
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Favicon - Solo PNG */}
        <link rel="icon" href="/assets/images/iconfinal.png" type="image/png" />
        <link rel="shortcut icon" href="/assets/images/iconfinal.png" />
        
        {/* Apple Touch Icons - PNG para mejor compatibilidad */}
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/iconfinal.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/assets/images/iconfinal.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/assets/images/iconfinal.png" />
        <link rel="apple-touch-icon" href="/assets/images/iconfinal.png" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}