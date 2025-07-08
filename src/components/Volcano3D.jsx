import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Volcano3D() {
  const mountRef = useRef()
  const rendererRef = useRef()
  const animationIdRef = useRef()
  const volcanoRef = useRef()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

    // Crear geometría de respaldo (mientras carga el FBX)
    const fallbackGeometry = new THREE.ConeGeometry(3, 6, 8)
    const fallbackMaterial = new THREE.MeshStandardMaterial({ 
      color: '#8b4513',
      roughness: 0.8,
      metalness: 0.2
    })
    const fallbackVolcano = new THREE.Mesh(fallbackGeometry, fallbackMaterial)
    fallbackVolcano.position.y = -3
    scene.add(fallbackVolcano)
    volcanoRef.current = fallbackVolcano

    // Función para cargar modelo
    const loadModel = async () => {
      console.log('🚀 Iniciando carga de modelo 3D...')
      
      // Intentar cargar FBX primero
      const fbxLoader = new FBXLoader()
      const gltfLoader = new GLTFLoader()
      
      try {
        console.log('📁 Intentando cargar volcano.fbx...')
        
        fbxLoader.load(
          '/models/volcano.fbx',
          (fbx) => {
            console.log('✅ FBX cargado exitosamente:', fbx)
            console.log('Dimensiones del modelo:', {
              x: fbx.scale.x,
              y: fbx.scale.y, 
              z: fbx.scale.z
            })
            
            // Remover geometría de respaldo
            scene.remove(fallbackVolcano)
            fallbackGeometry.dispose()
            fallbackMaterial.dispose()
            
            // Calcular el bounding box para escalar apropiadamente
            const box = new THREE.Box3().setFromObject(fbx)
            const size = box.getSize(new THREE.Vector3())
            const maxDim = Math.max(size.x, size.y, size.z)
            const scale = 6 / maxDim // Escalar para que tenga 6 unidades de altura máxima
            
            // Configurar el modelo FBX
            fbx.scale.setScalar(scale)
            fbx.position.set(0, -3, 0)
            fbx.rotation.set(0, 0, 0)
            
            console.log(`🔧 Escalado aplicado: ${scale}`)
            console.log(`📐 Nuevo tamaño: ${size.x * scale}, ${size.y * scale}, ${size.z * scale}`)
            
            // Aplicar materiales y configurar meshes
            let meshCount = 0
            fbx.traverse((child) => {
              if (child.isMesh) {
                meshCount++
                console.log(`🔺 Mesh ${meshCount}:`, child.name || 'sin nombre', {
                  geometry: child.geometry,
                  material: child.material
                })
                
                child.castShadow = true
                child.receiveShadow = true
                
                // Si el modelo no tiene materiales, aplicar uno básico
                if (!child.material) {
                  child.material = new THREE.MeshStandardMaterial({
                    color: '#654321',
                    roughness: 0.8,
                    metalness: 0.1
                  })
                  console.log(`🎨 Material básico aplicado a mesh ${meshCount}`)
                }
              }
            })
            
            console.log(`📊 Total de meshes encontrados: ${meshCount}`)
            
            scene.add(fbx)
            volcanoRef.current = fbx
            setLoading(false)
            console.log('✅ Modelo FBX agregado a la escena exitosamente')
          },
          (progress) => {
            if (progress.total > 0) {
              const percent = (progress.loaded / progress.total * 100).toFixed(1)
              console.log(`📊 Progreso FBX: ${percent}% (${progress.loaded}/${progress.total} bytes)`)
            } else {
              console.log(`📊 Cargando FBX: ${progress.loaded} bytes`)
            }
          },
          (error) => {
            console.error('❌ Error cargando FBX:', error)
            console.error('Detalles del error:', error.message)
            
            // Intentar cargar GLTF como alternativa
            console.log('🔄 Intentando cargar formato GLTF como alternativa...')
            
            gltfLoader.load(
              '/models/volcano.gltf',
              (gltf) => {
                console.log('✅ GLTF cargado exitosamente:', gltf)
                
                // Remover geometría de respaldo
                scene.remove(fallbackVolcano)
                fallbackGeometry.dispose()
                fallbackMaterial.dispose()
                
                const model = gltf.scene
                model.scale.setScalar(0.1)
                model.position.set(0, -3, 0)
                
                scene.add(model)
                volcanoRef.current = model
                setLoading(false)
                console.log('✅ Modelo GLTF agregado a la escena')
              },
              undefined,
              (gltfError) => {
                console.error('❌ Error cargando GLTF:', gltfError)
                setError(`Error: No se pudo cargar el modelo 3D. FBX: ${error.message}`)
                setLoading(false)
              }
            )
          }
        )
        
      } catch (err) {
        console.error('❌ Error general cargando modelo:', err)
        setError(`Error general: ${err.message}`)
        setLoading(false)
      }
    }
    
    // Iniciar carga del modelo
    loadModel()

    const light = new THREE.DirectionalLight('#ffffff', 1)
    light.position.set(5, 10, 7)
    scene.add(light)

    const ambient = new THREE.AmbientLight('#ffffff', 0.5)
    scene.add(ambient)

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)
      
      // Rotar el volcán si existe
      if (volcanoRef.current) {
        volcanoRef.current.rotation.y += 0.003
      }
      
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
      if (fallbackGeometry) {
        fallbackGeometry.dispose()
      }
      if (fallbackMaterial) {
        fallbackMaterial.dispose()
      }
      
      // Limpiar modelo FBX si existe
      if (volcanoRef.current) {
        volcanoRef.current.traverse((child) => {
          if (child.isMesh) {
            if (child.geometry) child.geometry.dispose()
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach(material => material.dispose())
              } else {
                child.material.dispose()
              }
            }
          }
        })
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
      className="w-full h-full flex justify-center items-center bg-blue-50 rounded-lg overflow-hidden relative"
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
    >
      {/* Indicador de carga */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-blue-50 bg-opacity-90 z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-blue-600 font-medium">Cargando volcán 3D...</p>
          </div>
        </div>
      )}
      
      {/* Indicador de error */}
      {error && (
        <div className="absolute top-4 left-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded z-10">
          <p className="text-sm">{error}</p>
        </div>
      )}
      
      {/* Controles de ayuda */}
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 rounded-lg p-3 text-xs text-gray-600 z-10">
        <p>🖱️ El volcán rota automáticamente</p>
        <p>🏔️ Modelo 3D del Volcán Antisana</p>
      </div>
    </div>
  )
}