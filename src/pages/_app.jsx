import '../styles/globals.css'
import Head from 'next/head'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  // Registrar el Service Worker al cargar la aplicación
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('Service Worker registrado correctamente:', registration.scope);
          })
          .catch(error => {
            console.error('Error al registrar el Service Worker:', error);
          });
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>Sistema Antisana</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#F0F0F0" />
        <meta name="description" content="Plataforma educativa sobre el Sistema Antisana y su importancia como fuente de agua para Quito" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}