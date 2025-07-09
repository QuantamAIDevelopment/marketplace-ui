import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function Stars() {
  const group = useRef();
  const starCount = 120;
  const stars = Array.from({ length: starCount }, (_, i) => ({
    x: (Math.random() - 0.5) * 10,
    y: (Math.random() - 0.5) * 10,
    z: -Math.random() * 8 - 2,
    size: Math.random() * 0.04 + 0.01,
    color: ['#61868d', '#cde3e7', '#bdbdbd'][Math.floor(Math.random() * 3)]
  }));
  useFrame(() => {
    if (group.current) {
      group.current.rotation.z += 0.0007;
    }
  });
  return (
    <group ref={group}>
      {stars.map((star, i) => (
        <mesh key={i} position={[star.x, star.y, star.z]}>
          <sphereGeometry args={[star.size, 8, 8]} />
          <meshBasicMaterial color={star.color} />
        </mesh>
      ))}
    </group>
  );
}

export default function CosmicBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true" role="presentation">
      <Canvas camera={{ position: [0, 0, 2.5] }} style={{ width: '100vw', height: '100vh' }}>
        <Stars />
      </Canvas>
    </div>
  );
} 