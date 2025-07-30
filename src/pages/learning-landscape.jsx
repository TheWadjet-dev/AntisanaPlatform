import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import GeniallyEmbed from '../components/GeniallyEmbed';
import Head from 'next/head';
import Link from 'next/link';

export default function LearningLandscapePage() {
  const [loading, setLoading] = useState(false);
  
  // URL del Genially que se va a mostrar
  const geniallyUrl = "https://view.genially.com/68897ca523da84303abfff41/interactive-content-descubriendo-el-antisana";
  
  return (
    <MainLayout>
      <Head>
        <title>Paisaje de Aprendizaje | Sistema Antisana</title>
        <meta name="description" content="Explora el paisaje de aprendizaje interactivo del Sistema Antisana" />
      </Head>
      
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-800">
            🏔️ Descubriendo el Antisana 🏔️
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Explora este contenido interactivo para conocer los diferentes aspectos 
            del Sistema Antisana y su importancia para el agua de Quito.
          </p>
        </div>
        
        {/* Contenido Genially */}
        <div className="mb-12">
          <GeniallyEmbed 
            geniallyUrl={geniallyUrl} 
            title="Paisaje de Aprendizaje Interactivo" 
            aspectRatio="16/9"
          />
        </div>
        
        {/* Información Adicional */}
        <div className="bg-green-50 rounded-xl p-6 shadow-md mb-8">
          <h2 className="text-xl font-bold text-green-800 mb-3">¿Cómo navegar por el contenido?</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span>Haz clic en los diferentes elementos para explorar la información.</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span>Usa los botones de navegación para moverte entre secciones.</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span>Para una mejor experiencia, puedes ver el contenido en pantalla completa haciendo clic en el botón de la esquina inferior derecha.</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span>También puedes abrir el contenido en una nueva ventana para verlo a tamaño completo.</span>
            </li>
          </ul>
        </div>
        
        {/* Enlaces de navegación */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Link 
            href="/about" 
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Ver información detallada
          </Link>
          
          <a 
            href={geniallyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Abrir en ventana completa
          </a>
        </div>
      </div>
    </MainLayout>
  );
}
