# 🏔️ Antisana Platform

Una plataforma web interactiva educativa sobre el Volcán Antisana y su ecosistema, desarrollada con Next.js y tecnologías de vanguardia para ofrecer una experiencia inmersiva y educativa.

## 🌟 Características Principales

### 🎮 Experiencias Interactivas
- **Trivia Educativa**: Sistema de preguntas y respuestas sobre el ecosistema del Antisana
- **Juego Phaser**: Aventura interactiva ambientada en el volcán
- **Visualización 3D**: Modelo tridimensional del volcán con Three.js
- **Gráficos Dinámicos**: Visualización de datos con Recharts

### 📱 Funcionalidades Técnicas
- **PWA (Progressive Web App)**: Instalable en dispositivos móviles
- **Responsive Design**: Optimizado para todos los dispositivos
- **Animaciones Fluidas**: Transiciones con Framer Motion
- **Carga Optimizada**: Lazy loading y optimización de imágenes

### 🎨 Diseño y UX
- **Interfaz Moderna**: Diseño limpio con Tailwind CSS
- **Accesibilidad**: Cumple estándares de accesibilidad web
- **Rendimiento**: Optimizado para dispositivos móviles e iOS Safari
- **Navegación Intuitiva**: Experiencia de usuario fluida

## 🛠️ Tecnologías

### Frontend
- **Next.js 14.1.0** - Framework React para producción
- **React 18.3.1** - Biblioteca para interfaces de usuario
- **Tailwind CSS 3.3.0** - Framework de CSS utilitario
- **Framer Motion 10.0.0** - Biblioteca de animaciones

### 3D y Juegos
- **Three.js 0.160.0** - Biblioteca 3D para WebGL
- **@react-three/fiber 8.15.0** - Renderer React para Three.js
- **@react-three/drei 9.56.0** - Utilidades para React Three Fiber
- **Phaser 3.90.0** - Framework para juegos 2D

### Visualización
- **Recharts 2.7.0** - Biblioteca de gráficos para React

## 📁 Estructura del Proyecto

```
antisana-platform/
├── public/                 # Archivos estáticos
│   ├── assets/            # Imágenes y recursos
│   │   ├── images/        # Imágenes del proyecto
│   │   └── sprites/       # Sprites para juegos
│   ├── sounds/            # Archivos de audio
│   ├── manifest.json      # Configuración PWA
│   └── sw.js             # Service Worker
├── src/
│   ├── components/        # Componentes reutilizables
│   │   ├── Footer.jsx     # Pie de página
│   │   ├── Navbar.jsx     # Barra de navegación
│   │   ├── PhaserGame.jsx # Integración del juego Phaser
│   │   ├── Volcano3D.jsx  # Componente 3D del volcán
│   │   └── about/         # Componentes de la sección "Acerca de"
│   ├── data/              # Datos estáticos
│   │   ├── aboutContent.json    # Contenido educativo
│   │   ├── animalData.json      # Datos de fauna
│   │   └── triviaQuestions.json # Preguntas del trivia
│   ├── hooks/             # Hooks personalizados
│   ├── interactive/       # Componentes interactivos
│   │   ├── index.jsx      # Página principal interactiva
│   │   └── Trivia.jsx     # Componente de trivia
│   ├── layouts/           # Layouts de página
│   ├── pages/             # Páginas de Next.js
│   │   ├── about.jsx      # Página educativa completa
│   │   ├── about-clean.jsx # Página educativa simplificada
│   │   ├── actividad.jsx  # Actividades interactivas
│   │   ├── flora-fauna.jsx # Información de flora y fauna
│   │   ├── home.jsx       # Página principal
│   │   ├── interactive.jsx # Página de interactividad
│   │   └── index.jsx      # Página de inicio
│   ├── styles/            # Estilos globales
│   └── utils/             # Utilidades
├── next.config.js         # Configuración de Next.js
├── tailwind.config.js     # Configuración de Tailwind
└── package.json           # Dependencias del proyecto
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación

1. **Clonar el repositorio**
```bash
git clone [URL_DEL_REPOSITORIO]
cd antisana-platform
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

### Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción

## 📱 Páginas y Funcionalidades

### 🏠 Página Principal (`/`)
- Landing page con navegación principal
- Introducción al volcán Antisana
- Enlaces a todas las secciones

### 🏔️ Home (`/home`)
- Información general del volcán
- Visualización 3D interactiva
- Datos geográficos y geológicos

### 📚 Acerca de (`/about`)
- **Historia**: Origen y formación del volcán
- **Geografía**: Ubicación y características físicas
- **Flora y Fauna**: Biodiversidad del ecosistema
- **Conservación**: Esfuerzos de protección ambiental
- **Guardianes**: Comunidades locales y su papel
- **Curiosidades**: Datos interesantes y únicos
- **Cómo Ayudar**: Formas de contribuir a la conservación

### 🌿 Flora y Fauna (`/flora-fauna`)
- Catálogo detallado de especies
- Imágenes y descripciones
- Estado de conservación

### 🎮 Interactivo (`/interactive`)
- Trivia educativa con preguntas aleatorias
- Sistema de puntuación
- Retroalimentación instantánea

### 🎯 Actividades (`/actividad`)
- Juego Phaser integrado
- Mecánicas de aventura
- Elementos educativos gamificados

## 🎨 Componentes Principales

### 🌋 Volcano3D
Renderiza un modelo 3D del volcán Antisana con:
- Carga de modelos FBX/GLTF
- Rotación automática
- Optimización para dispositivos móviles
- Fallback con geometría básica

### 🎲 Trivia
Sistema de preguntas interactivas con:
- Preguntas aleatorias sobre el ecosistema
- 4 opciones de respuesta
- Retroalimentación inmediata
- Sistema de puntuación

### 🎮 PhaserGame
Integración del framework Phaser para:
- Juego 2D ambientado en el volcán
- Mecánicas de plataforma
- Elementos educativos

### 📊 Componentes de Visualización
- Gráficos con Recharts
- Datos dinámicos del ecosistema
- Visualizaciones interactivas

## 🎨 Diseño y Estilos

### Paleta de Colores
- **Azules**: Cielo y agua (#3B82F6, #DBEAFE)
- **Verdes**: Vegetación (#10B981, #D1FAE5)
- **Marrones**: Tierra y montañas (#8B4513, #F3E8FF)
- **Grises**: Texto y elementos neutros (#6B7280, #F9FAFB)

### Responsive Design
- **Mobile First**: Diseñado primero para móviles
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Grid System**: Flexbox y CSS Grid para layouts

## 📱 PWA (Progressive Web App)

### Características
- **Instalable**: Se puede instalar en dispositivos móviles
- **Offline**: Funciona sin conexión (funcionalidad básica)
- **Fast**: Carga rápida con service worker
- **Engaging**: Notificaciones push (futuro)

### Configuración
- `manifest.json`: Metadatos de la aplicación
- `sw.js`: Service Worker para caché
- Iconos optimizados para diferentes dispositivos

## 🔧 Optimizaciones

### Rendimiento
- **Lazy Loading**: Carga diferida de componentes pesados
- **Image Optimization**: Optimización automática de imágenes con Next.js
- **Code Splitting**: División automática del código
- **Prefetching**: Precarga de páginas críticas

### SEO
- **Meta Tags**: Optimización para motores de búsqueda
- **Open Graph**: Integración con redes sociales
- **Structured Data**: Datos estructurados para mejor indexación

### Accesibilidad
- **ARIA Labels**: Etiquetas para lectores de pantalla
- **Keyboard Navigation**: Navegación por teclado
- **Color Contrast**: Contraste adecuado para legibilidad
- **Focus Management**: Gestión del foco para accesibilidad

## 🌐 Compatibilidad

### Navegadores Soportados
- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+ (incluyendo iOS Safari)
- **Edge** 90+

### Dispositivos
- **Desktop**: Windows, macOS, Linux
- **Mobile**: iOS 14+, Android 10+
- **Tablet**: iPad, Android tablets

## 🚨 Solución de Problemas

### Errores Comunes

#### Modelo 3D no carga
```bash
# Verificar que los archivos de modelo existen
ls public/models/

# Error de CORS - asegurar que los archivos están en public/
```

#### Errores de dependencias
```bash
# Limpiar caché y reinstalar
rm -rf node_modules package-lock.json
npm install
```

#### Error fetchPriority (React/Next.js)
```bash
# Limpiar build y reconstruir
rm -rf .next
npm run build
```

### Performance en iOS Safari
- Reducción de pixel ratio para mejor rendimiento
- Optimización de WebGL para dispositivos móviles
- Fallbacks para funcionalidades no soportadas

## 🔮 Futuras Mejoras

### Funcionalidades Planificadas
- [ ] **Realidad Aumentada**: Visualización AR del volcán
- [ ] **Multijugador**: Trivia colaborativa en tiempo real
- [ ] **Más Juegos**: Expansión del arsenal de juegos educativos
- [ ] **API Integration**: Datos en tiempo real del volcán
- [ ] **Multilingual**: Soporte para múltiples idiomas

### Mejoras Técnicas
- [ ] **Testing**: Implementación de tests unitarios y e2e
- [ ] **CI/CD**: Pipeline de integración continua
- [ ] **Analytics**: Integración con Google Analytics
- [ ] **Error Tracking**: Monitoreo de errores con Sentry

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Contacto

Para preguntas, sugerencias o colaboraciones, contacta a través de:
- Email: [tu-email@ejemplo.com]
- GitHub: [tu-usuario-github]

## 🙏 Agradecimientos

- **Comunidades locales** del Antisana por su conocimiento ancestral
- **Científicos y conservacionistas** por la información técnica
- **Desarrolladores open source** por las herramientas utilizadas

---

**¡Explora, aprende y contribuye a la conservación del Volcán Antisana! 🌋🌿**
