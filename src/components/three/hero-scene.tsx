import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles, Icosahedron, Edges, MeshDistortMaterial } from '@react-three/drei'
import { Suspense, useRef, useMemo } from 'react'
import type { Mesh, Group } from 'three'

const ACCENT = '#d4f03c'

function WireframeIcosahedron() {
  const ref = useRef<Mesh>(null!)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * 0.12
    ref.current.rotation.y = state.clock.elapsedTime * 0.18
  })

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.6}>
      {/* Outer wireframe icosahedron - the "geometric dev" feel */}
      <Icosahedron ref={ref} args={[1.6, 1]} position={[0, 0, 0]}>
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.45} />
      </Icosahedron>

      {/* Solid wireframe edges layered for depth */}
      <Icosahedron args={[1.6, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#0a0a08"
          metalness={0.6}
          roughness={0.3}
          transparent
          opacity={0.6}
        />
        <Edges color={ACCENT} lineWidth={1.2} />
      </Icosahedron>

      {/* Inner glowing distorted core */}
      <mesh position={[0, 0, 0]} scale={0.85}>
        <sphereGeometry args={[1, 48, 48]} />
        <MeshDistortMaterial
          color={ACCENT}
          attach="material"
          distort={0.35}
          speed={2}
          roughness={0.1}
          metalness={0.9}
          emissive={ACCENT}
          emissiveIntensity={0.4}
        />
      </mesh>
    </Float>
  )
}

function OrbitingCubes({ count = 14 }: { count?: number }) {
  const group = useRef<Group>(null!)

  const cubes = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5
      const radius = 2.5 + Math.random() * 1.5
      const height = (Math.random() - 0.5) * 2.5
      const size = 0.08 + Math.random() * 0.12
      return {
        angle,
        radius,
        height,
        size,
        rotSpeed: 0.3 + Math.random() * 0.4,
        orbitSpeed: 0.08 + Math.random() * 0.06,
      }
    })
  }, [count])

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = state.clock.elapsedTime * 0.06
  })

  return (
    <group ref={group}>
      {cubes.map((c, i) => (
        <OrbitCube key={i} {...c} index={i} />
      ))}
    </group>
  )
}

type OrbitCubeProps = {
  angle: number
  radius: number
  height: number
  size: number
  rotSpeed: number
  orbitSpeed: number
  index: number
}

function OrbitCube({ angle, radius, height, size, rotSpeed, orbitSpeed, index }: OrbitCubeProps) {
  const ref = useRef<Mesh>(null!)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    const a = angle + t * orbitSpeed
    ref.current.position.x = Math.cos(a) * radius
    ref.current.position.z = Math.sin(a) * radius
    ref.current.position.y = height + Math.sin(t * 0.5 + index) * 0.3
    ref.current.rotation.x = t * rotSpeed
    ref.current.rotation.y = t * rotSpeed * 1.2
  })

  return (
    <mesh ref={ref}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial
        color={ACCENT}
        emissive={ACCENT}
        emissiveIntensity={0.6}
        metalness={0.8}
        roughness={0.2}
      />
      <Edges color="#ffffff" lineWidth={0.5} />
    </mesh>
  )
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 3, 4]} intensity={1.4} color={ACCENT} />
      <pointLight position={[-3, -2, 3]} intensity={0.5} color="#f0a03c" />
      <pointLight position={[0, 4, -3]} intensity={0.4} color={ACCENT} />

      <Suspense fallback={null}>
        <WireframeIcosahedron />
        <OrbitingCubes count={14} />
        <Sparkles
          count={60}
          scale={6}
          size={2.5}
          speed={0.4}
          opacity={0.55}
          color={ACCENT}
        />
      </Suspense>
    </Canvas>
  )
}

export default HeroScene
