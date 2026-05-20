import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, Environment } from '@react-three/drei'
import { Suspense, useRef, useMemo } from 'react'
import type { Mesh } from 'three'
import * as THREE from 'three'

function DistortedSphere() {
  const meshRef = useRef<Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    meshRef.current.rotation.y = t * 0.15
    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.1
  })

  return (
    <Float speed={1.6} rotationIntensity={0.6} floatIntensity={1.2}>
      <Sphere ref={meshRef} args={[1.6, 96, 96]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#d4f03c"
          attach="material"
          distort={0.45}
          speed={1.6}
          roughness={0.25}
          metalness={0.6}
          emissive="#d4f03c"
          emissiveIntensity={0.05}
        />
      </Sphere>
    </Float>
  )
}

function Particles({ count = 80 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 2.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.05
    ref.current.rotation.x = state.clock.elapsedTime * 0.03
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#f0ede8"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  )
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={1.2} color="#d4f03c" />
      <pointLight position={[-3, -2, 2]} intensity={0.6} color="#f0a03c" />
      <Suspense fallback={null}>
        <DistortedSphere />
        <Particles count={60} />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  )
}

export default HeroScene
