import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Box, Torus, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingWallet({ scrollY }) {
  const groupRef = useRef();
  const cardRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.3 + (state.pointer.x * 0.15);
      groupRef.current.rotation.x = Math.cos(t * 0.3) * 0.1 + (state.pointer.y * -0.1);
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.15 - (scrollY * 0.004);
      groupRef.current.position.z = -(scrollY * 0.006);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main card body */}
      <Box ref={cardRef} args={[3.2, 2, 0.12]} position={[0, 0, 0]} castShadow>
        <meshStandardMaterial
          color="#1a1730"
          metalness={0.8}
          roughness={0.2}
          envMapIntensity={1}
        />
      </Box>

      {/* Card shimmer top strip */}
      <Box args={[3.2, 0.08, 0.13]} position={[0, 0.6, 0]}>
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={0.8}
          metalness={1}
          roughness={0}
        />
      </Box>

      {/* Chip */}
      <Box args={[0.5, 0.38, 0.05]} position={[-0.9, 0.2, 0.1]}>
        <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.1} />
      </Box>
      <Box args={[0.46, 0.12, 0.06]} position={[-0.9, 0.2, 0.13]}>
        <meshStandardMaterial color="#fbbf24" metalness={1} roughness={0} />
      </Box>

      {/* NFC symbol (torus rings) */}
      {[0.18, 0.28, 0.38].map((r, i) => (
        <Torus key={i} args={[r, 0.015, 8, 20]} position={[0.8, 0.25, 0.1]} rotation={[0, 0, Math.PI / 6]}>
          <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={0.5} />
        </Torus>
      ))}

      {/* Holographic gradient overlay mesh */}
      <Box args={[3.18, 1.98, 0.005]} position={[0, 0, 0.065]}>
        <meshStandardMaterial
          color="#7c3aed"
          transparent
          opacity={0.08}
          metalness={1}
          roughness={0}
        />
      </Box>

      {/* Card glow */}
      <pointLight position={[0, 0, 1]} intensity={0.8} color="#7c3aed" distance={5} />
    </group>
  );
}

function FloatingCoin({ position, scale = 1, delay = 0, color = '#f59e0b' }) {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime() + delay;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 1.2;
      meshRef.current.rotation.z = Math.sin(t * 0.7) * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.12;
    }
  });

  return (
    <group ref={meshRef} position={position} scale={scale}>
      <Torus args={[0.35, 0.08, 32, 64]}>
        <meshStandardMaterial
          color={color}
          metalness={0.95}
          roughness={0.05}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </Torus>
      {/* Coin face */}
      <mesh position={[0, 0, 0.001]}>
        <circleGeometry args={[0.27, 32]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.1} />
      </mesh>
    </group>
  );
}

function GlowOrb({ position, color = '#7c3aed', size = 0.6 }) {
  const meshRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.3;
      meshRef.current.rotation.y = t * 0.4;
    }
  });

  return (
    <Float floatIntensity={1.5} rotationIntensity={0.5} speed={2}>
      <Sphere ref={meshRef} args={[size, 32, 32]} position={position}>
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.15}
          distort={0.5}
          speed={2}
          metalness={0.8}
          roughness={0.2}
        />
      </Sphere>
      <pointLight position={position} intensity={0.6} color={color} distance={4} />
    </Float>
  );
}

function FloatingDiamond({ position, scrollY }) {
  const meshRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.5;
      meshRef.current.rotation.y = t * 0.7;
      meshRef.current.position.y = position[1] + Math.sin(t * 0.6) * 0.2 - scrollY * 0.003;
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow>
      <octahedronGeometry args={[0.45, 0]} />
      <meshStandardMaterial
        color="#3b82f6"
        metalness={0.95}
        roughness={0.05}
        emissive="#3b82f6"
        emissiveIntensity={0.3}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

function SceneEnvironment({ scrollY }) {
  const lightRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(t * 0.3) * 5;
      lightRef.current.position.z = Math.cos(t * 0.3) * 5;
      lightRef.current.intensity = 1.5 + Math.sin(t * 0.7) * 0.3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} color="#1a1730" />
      <pointLight ref={lightRef} position={[5, 5, 3]} intensity={1.5} color="#7c3aed" />
      <pointLight position={[-5, -3, 2]} intensity={0.8} color="#3b82f6" />
      <pointLight position={[0, 3, 5]} intensity={0.6} color="#a78bfa" />

      <FloatingWallet scrollY={scrollY} />

      {/* Coins */}
      <FloatingCoin position={[-4, 1.5, -1]} scale={0.9} delay={0} color="#f59e0b" />
      <FloatingCoin position={[4, -1, -2]} scale={0.7} delay={2} color="#fbbf24" />
      <FloatingCoin position={[-3, -1.5, -1]} scale={0.6} delay={4} color="#f59e0b" />
      <FloatingCoin position={[3.5, 1.8, -3]} scale={1.1} delay={1} color="#fcd34d" />

      {/* Glowing orbs */}
      <GlowOrb position={[-5, 2, -3]} color="#7c3aed" size={1.2} />
      <GlowOrb position={[5, -1.5, -4]} color="#3b82f6" size={0.9} />
      <GlowOrb position={[0, 4, -5]} color="#a78bfa" size={0.7} />

      {/* Diamonds */}
      <FloatingDiamond position={[-5.5, -0.5, -2]} scrollY={scrollY} />
      <FloatingDiamond position={[5, 2.5, -3]} scrollY={scrollY} />
    </>
  );
}

export default function Scene3D({ scrollY = 0 }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      shadows
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
    >
      <fog attach="fog" args={['#03020a', 10, 25]} />
      <SceneEnvironment scrollY={scrollY} />
    </Canvas>
  );
}
