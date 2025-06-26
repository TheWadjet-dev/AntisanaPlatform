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

    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#dbeafe')
    scene.fog = new THREE.Fog('#dbeafe', 10, 100)

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 10

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.domElement.style.maxWidth = '100%'
    renderer.domElement.style.height = 'auto'
    rendererRef.current = renderer
    
    // Verificar que mountRef.current existe antes de appendChild
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement)
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
      }
      
      // Limpiar el renderer y el DOM
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
      
      // Verificar que mountRef.current y el renderer.domElement existen
      if (mountRef.current && rendererRef.current && rendererRef.current.domElement) {
        try {
          if (mountRef.current.contains(rendererRef.current.domElement)) {
            mountRef.current.removeChild(rendererRef.current.domElement)
          }
        } catch (error) {
          console.warn('Error removing Three.js canvas:', error)
        }
      }
      
      // Limpiar geometrías y materiales
      geometry.dispose()
      material.dispose()
    }
  }, [])

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full flex justify-center items-center bg-blue-50 rounded-lg overflow-hidden"
      style={{
        minHeight: '400px',
        maxWidth: '800px',
        maxHeight: '600px',
        aspectRatio: '4/3'
      }}
    />
  )
}