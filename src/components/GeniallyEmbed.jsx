import React, { useEffect, useState } from 'react';

const GeniallyEmbed = ({ geniallyUrl, title = 'Contenido Interactivo', aspectRatio = '16/9' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  
  useEffect(() => {
    // Simular tiempo de carga para mostrar el indicador
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    // Configurar listener para evento de cambio a pantalla completa
    const handleFullscreenChange = () => {
      setFullScreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      clearTimeout(timer);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  // Función para entrar a pantalla completa
  const enterFullScreen = (elem) => {
    if (elem && elem.requestFullscreen) {
      elem.requestFullscreen().catch(err => {
        console.error(`Error al intentar pantalla completa: ${err.message}`);
      });
    }
  };
  
  return (
    <div className="w-full">
      {/* Título del contenido Genially */}
      <h2 className="text-2xl font-bold text-center text-green-800 mb-4">{title}</h2>
      
      {/* Contenedor con proporción aspectual para mantener las dimensiones */}
      <div 
        className="relative w-full bg-gray-100 rounded-lg shadow-md overflow-hidden"
        style={{ paddingTop: `calc(100% / (${aspectRatio.split('/')[0]} / ${aspectRatio.split('/')[1]}))` }}
      >
        {/* Indicador de carga */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mb-4"></div>
              <p className="text-gray-600">Cargando contenido interactivo...</p>
            </div>
          </div>
        )}
        
        {/* iFrame de Genially */}
        <iframe
          className="absolute top-0 left-0 w-full h-full border-0"
          src={geniallyUrl}
          title={title}
          allowFullScreen={true}
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
        
        {/* Botón de pantalla completa */}
        <button
          className="absolute bottom-4 right-4 bg-green-600 hover:bg-green-700 text-white p-2 rounded-md shadow-md transition-colors z-20"
          onClick={(e) => {
            const container = e.currentTarget.parentElement;
            enterFullScreen(container);
          }}
          aria-label="Ver en pantalla completa"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
          </svg>
        </button>
      </div>
      
      {/* Nota informativa */}
      <div className="text-center mt-4 space-y-2">
        <p className="text-gray-500 text-sm">
          Este contenido interactivo fue creado con Genially. 
          Para una mejor experiencia, visualízalo en modo de pantalla completa.
        </p>
        <div className="flex justify-center space-x-2">
          <a 
            href={geniallyUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
          >
            <span>Abrir en nueva ventana</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default GeniallyEmbed;
