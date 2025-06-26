import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Volcano3D() {
  const mountRef = useRef()
  const rendererRef = useRef()
  const animationIdRef = useRef()

  useEffect(() => {
    if (!mountRef.current) return

    // Obtener dimensiones del contenedor
    const container = mountRef.current
    const containerWidth = container.offsetWidth || 800
    const containerHeight = container.offsetHeight || 600
    
    // Calcular dimensiones manteniendo aspect ratio
    let width = Math.min(containerWidth, 800)
    let height = Math.min(containerHeight, 600)
    
    if (width / height > 4/3) {
      width = height * (4/3)
    } else {
      height = width * (3/4)
    }

    // Crear escena con configuración optimizada para iOS
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#dbeafe')
    scene.fog = new THREE.Fog('#dbeafe', 10, 100)

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 10

    // Configurar renderer optimizado para iOS
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: false,
      powerPreference: 'default', // Mejor para dispositivos móviles
      preserveDrawingBuffer: false
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Limitar pixel ratio para mejor rendimiento
    renderer.domElement.style.maxWidth = '100%'
    renderer.domElement.style.height = 'auto'
    renderer.domElement.style.display = 'block'
    rendererRef.current = renderer
    
    // Verificar que mountRef.current existe antes de appendChild
    if (mountRef.current) {
      try {
        mountRef.current.appendChild(renderer.domElement)
      } catch (error) {
        console.warn('Error adding Three.js canvas to DOM:', error)
        return
      }
    }

    const geometry = new THREE.ConeGeometry(3, 6, 4)
    const material = new THREE.MeshStandardMaterial({ color: '#6b7280', flatShading: true })
    const volcano = new THREE.Mesh(geometry, material)
    volcano.rotation.y = Math.PI / 4
    scene.add(volcano)

    const light = new THREE.DirectionalLight('#ffffff', 1)
    light.position.set(5, 10, 7)
    scene.add(light)

    const ambient = new THREE.AmbientLight('#ffffff', 0.5)
    scene.add(ambient)

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)
      volcano.rotation.y += 0.003
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      // Cancelar la animación
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
        animationIdRef.current = null
      }
      
      // Limpiar el renderer y el DOM de forma segura
      if (rendererRef.current) {
        // Verificar que mountRef.current y el renderer.domElement existen
        if (mountRef.current && rendererRef.current.domElement) {
          try {
            if (mountRef.current.contains(rendererRef.current.domElement)) {
              mountRef.current.removeChild(rendererRef.current.domElement)
            }
          } catch (error) {
            console.warn('Error removing Three.js canvas:', error)
          }
        }
        
        // Limpiar contexto WebGL
        const gl = rendererRef.current.getContext()
        if (gl && gl.getExtension('WEBGL_lose_context')) {
          gl.getExtension('WEBGL_lose_context').loseContext()
        }
        
        rendererRef.current.dispose()
        rendererRef.current = null
      }
      
      // Limpiar geometrías y materiales
      if (geometry) {
        geometry.dispose()
      }
      if (material) {
        material.dispose()
      }
      
      // Limpiar escena
      if (scene) {
        scene.clear()
      }
    }
  }, [])

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full flex justify-center items-center bg-blue-50 rounded-lg overflow-hidden"
      style={{
        minHeight: '300px',
        maxWidth: '100%',
        maxHeight: '600px',
        aspectRatio: '4/3',
        /* iOS Safari específico */
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden'
      }}
    />
  )
}