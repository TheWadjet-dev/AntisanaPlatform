import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Volcano3D() {
  const mountRef = useRef()

  useEffect(() => {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#dbeafe')
    scene.fog = new THREE.Fog('#dbeafe', 10, 100)

    const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000)
    camera.position.z = 10

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(800, 600)
    mountRef.current.appendChild(renderer.domElement)

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
      requestAnimationFrame(animate)
      volcano.rotation.y += 0.003
      renderer.render(scene, camera)
    }
    animate()

    return () => mountRef.current.removeChild(renderer.domElement)
  }, [])

  return <div ref={mountRef} />
}