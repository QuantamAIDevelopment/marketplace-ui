import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

function BlackHoleRing() {
  const mesh = useRef();
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.z += 0.003;
    }
  });
  return (
    <mesh ref={mesh}>
      <torusGeometry args={[1.2, 0.18, 32, 100]} />
      <meshStandardMaterial
        color={'#61868d'}
        emissive={'#cde3e7'}
        emissiveIntensity={0.7}
        metalness={0.5}
        roughness={0.3}
      />
    </mesh>
  );
}

function BlackHoleLogo3D() {
  return (
    <Canvas camera={{ position: [0, 0, 4] }} style={{ width: 128, height: 128 }}>
      <ambientLight intensity={1.0} />
      <pointLight position={[0, 0, 4]} intensity={1.2} color="#61868d" />
      <BlackHoleRing />
      <Html center>
        <span style={{
          fontFamily: 'Styrene A Web, sans-serif',
          fontWeight: 700,
          fontSize: 48,
          color: '#293133',
          textShadow: '0 2px 8px #cde3e7',
          letterSpacing: 2
        }}>G</span>
      </Html>
    </Canvas>
  );
}

export default function BlackHoleLogo() {
  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20" style={{ width: 128, height: 128 }} aria-label="Grok Black Hole Logo" role="img">
      <BlackHoleLogo3D />
    </div>
  );
} 