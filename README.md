# Sistema Antisana

![Logo Antisana](/public/assets/images/iconfinal.png)

## 📋 Descripción del Proyecto

**Sistema Antisana** es una plataforma educativa interactiva diseñada para informar y concienciar sobre la importancia del volcán Antisana y su ecosistema como fuente vital de agua para Quito, Ecuador. Esta aplicación web progresiva (PWA) proporciona información detallada, recursos educativos y actividades interactivas para estudiantes, educadores y público en general.

## 🌊 Importancia del Sistema Antisana

El Sistema Antisana es fundamental para el abastecimiento de agua potable de Quito. A través de la Laguna de La Mica y una extensa red de infraestructura, este ecosistema de páramo andino:

- Proporciona aproximadamente el 30% del agua que consumen los habitantes de Quito
- Alberga una biodiversidad única adaptada a las condiciones de alta montaña
- Actúa como un importante regulador climático y sumidero de carbono
- Representa un patrimonio natural y cultural invaluable para Ecuador

## ✨ Características Principales

- **Diseño Responsivo**: Experiencia optimizada para dispositivos móviles, tablets y escritorio
- **Modo Offline**: Funcionalidad como PWA que permite usar la aplicación sin conexión
- **Contenido Educativo**: Información detallada sobre el ecosistema, flora, fauna y sistema hídrico
- **Recursos Multimedia**: Galerías de imágenes, videos y recursos externos
- **Actividades Interactivas**: Juegos y cuestionarios para reforzar el aprendizaje
- **Accesibilidad**: Diseño pensado para ser accesible para diversos usuarios

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React, Next.js, Tailwind CSS
- **Interactividad**: JavaScript, Canvas API
- **PWA**: Service Workers, Web App Manifest
- **Multimedia**: Optimización de imágenes y videos para web
- **Despliegue**: Optimizado para hosting en plataformas como Vercel o Netlify

## 🚀 Instalación y Ejecución

### Requisitos Previos

- Node.js (v14.0.0 o superior)
- npm (v6.0.0 o superior) o yarn (v1.22.0 o superior)

### Pasos de Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/antisana-platform.git
   cd antisana-platform
   ```

2. Instalar dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```

3. Ejecutar en modo desarrollo:
   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. Abrir [http://localhost:3000](http://localhost:3000) en el navegador

### Crear Build de Producción

```bash
npm run build
npm start
# o
yarn build
yarn start
```

## 📱 Instalación como PWA

La plataforma puede instalarse como una aplicación en dispositivos móviles y de escritorio:

1. Visitar la aplicación en un navegador compatible (Chrome, Edge, Safari)
2. Esperar a que aparezca la notificación de instalación o:
   - En móviles: Tocar "Añadir a pantalla de inicio"
   - En escritorio: Hacer clic en el ícono de instalación en la barra de direcciones

## 📚 Estructura del Proyecto

```
antisana-platform/
├── public/               # Archivos estáticos
│   ├── assets/           # Imágenes, iconos y multimedia
│   ├── manifest.json     # Manifest para PWA
│   └── sw.js             # Service Worker
├── src/
│   ├── components/       # Componentes React reutilizables
│   ├── data/             # Datos JSON para el contenido
│   ├── hooks/            # Custom hooks de React
│   ├── interactive/      # Componentes para actividades interactivas
│   ├── layouts/          # Layouts de página
│   ├── pages/            # Páginas de Next.js
│   ├── styles/           # Estilos globales
│   └── utils/            # Utilidades y funciones auxiliares
├── .gitignore           # Archivos ignorados por Git
├── jsconfig.json        # Configuración de JavaScript
├── next.config.js       # Configuración de Next.js
├── package.json         # Dependencias y scripts
├── postcss.config.js    # Configuración de PostCSS
└── tailwind.config.js   # Configuración de Tailwind CSS
```

## 📋 Contenido y Secciones

### 🏠 Inicio
Introducción y visión general del Sistema Antisana.

### 🏞️ Acerca del Sistema Antisana
Información detallada sobre la geografía, historia y funcionamiento del sistema hídrico.

### 🦅 Flora y Fauna
Exploración de la biodiversidad única del ecosistema Antisana.

### 🎮 Actividades Interactivas
Quizzes y juegos educativos sobre el Antisana.

### 🦅 Cóndor Guardián
Juego interactivo sobre la conservación del ecosistema.

### 🔗 Recursos Externos
Enlaces a fuentes adicionales para ampliar el conocimiento.

## 👥 Equipo de Desarrollo

Este proyecto fue desarrollado por DevNation 593 como una iniciativa educativa para promover la conservación del Sistema Antisana y concientizar sobre la importancia del agua.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- A las instituciones educativas que colaboraron en la validación del contenido
- A las organizaciones de conservación que proporcionaron información y recursos
- A los desarrolladores de las bibliotecas y herramientas de código abierto utilizadas

---

Hecho con ❤️ en Ecuador para la conservación del Antisana 🏔️
