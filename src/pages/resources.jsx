import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import Head from 'next/head';
import externalResourcesData from '../data/externalResources.json';

export default function ExternalResources() {
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResources, setFilteredResources] = useState([]);

  useEffect(() => {
    // Cargar datos desde el JSON
    setResources(externalResourcesData.externalResources);
    setCategories(externalResourcesData.categories);
    setFilteredResources(externalResourcesData.externalResources);
  }, []);

  // Filtrar recursos por categoría y término de búsqueda
  useEffect(() => {
    let filtered = resources;
    
    // Filtrar por categoría
    if (activeCategory !== 'all') {
      filtered = filtered.filter(resource => resource.category === activeCategory);
    }
    
    // Filtrar por término de búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(term) || 
        resource.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredResources(filtered);
  }, [resources, activeCategory, searchTerm]);

  // Manejar el cambio de categoría
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  // Manejar el cambio en la búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <MainLayout>
      <Head>
        <title>Recursos Externos | Sistema Antisana</title>
      </Head>
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-800">
            📚 Recursos Externos 🌐
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Explora estos recursos adicionales para ampliar tu conocimiento sobre el Sistema Antisana, 
            su ecosistema, conservación y la gestión del agua.
          </p>
        </div>
        
        {/* Búsqueda y Filtros */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            {/* Buscador */}
            <div className="w-full md:w-1/3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar recursos..."
                  className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
              </div>
            </div>
            
            {/* Categorías en escritorio */}
            <div className="hidden md:flex flex-wrap gap-2">
              <button
                onClick={() => handleCategoryChange('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === 'all'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Todos
              </button>
              
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category.icon} {category.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Categorías en móvil */}
          <div className="flex md:hidden overflow-x-auto py-2 gap-2 scrollbar-hide">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex-shrink-0 ${
                activeCategory === 'all'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Todos
            </button>
            
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex-shrink-0 ${
                  activeCategory === category.id
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Lista de Recursos */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(resource => {
              // Encontrar la categoría para mostrar el nombre
              const resourceCategory = categories.find(cat => cat.id === resource.category);
              
              return (
                <div key={resource.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gray-200 relative">
                    {/* Imagen de placeholder si no hay imagen disponible */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 text-white text-4xl">
                      {resourceCategory?.icon || '🔗'}
                    </div>
                    {/* Tag de categoría */}
                    <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-3 py-1 rounded-full text-xs font-medium">
                      {resourceCategory?.icon} {resourceCategory?.name}
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{resource.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{resource.description}</p>
                    
                    <a 
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Visitar Recurso
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No se encontraron recursos</h3>
            <p className="text-gray-500">
              Intenta con otra búsqueda o categoría diferente
            </p>
          </div>
        )}
        
        {/* Sección informativa */}
        <div className="mt-12 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-100">
          <h2 className="text-xl font-bold text-green-800 mb-4">¿Por qué usar estos recursos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="font-semibold text-gray-800 mb-2">Conocimiento Ampliado</h3>
              <p className="text-gray-600">Profundiza en temas específicos sobre el Antisana con fuentes confiables.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl mb-3">🤝</div>
              <h3 className="font-semibold text-gray-800 mb-2">Participación Activa</h3>
              <p className="text-gray-600">Conoce organizaciones donde puedes participar y contribuir a la conservación.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl mb-3">🌱</div>
              <h3 className="font-semibold text-gray-800 mb-2">Inspiración para Actuar</h3>
              <p className="text-gray-600">Descubre proyectos e iniciativas que te pueden inspirar a tomar acción.</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
