import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { animated, useSpring } from '@react-spring/three';

// 3D Panel/Card component
function FloatingPanel({ position, title, children }) {
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState([0, 0, 0]);
  const [focused, setFocused] = useState(false);

  // Animation for hover/focus effect
  const { scale, rotation } = useSpring({
    scale: hovered || focused ? 1.08 : 1,
    rotation: hovered || focused ? [0, 0, 0.08] : [0, 0, 0],
    config: { mass: 1, tension: 210, friction: 20 },
  });

  // Drag logic (mouse)
  const onPointerDown = (e) => {
    setDragging(true);
    setOffset([
      e.point.x - mesh.current.position.x,
      e.point.y - mesh.current.position.y,
      e.point.z - mesh.current.position.z,
    ]);
    e.stopPropagation();
  };
  const onPointerUp = () => setDragging(false);
  const onPointerMove = (e) => {
    if (dragging) {
      mesh.current.position.x = e.point.x - offset[0];
      mesh.current.position.y = e.point.y - offset[1];
      mesh.current.position.z = e.point.z - offset[2];
    }
  };

  // Keyboard navigation for accessibility
  const onKeyDown = (e) => {
    if (!focused) return;
    // Arrow keys move the panel
    const step = 0.2;
    switch (e.key) {
      case 'ArrowUp':
        mesh.current.position.y += step;
        break;
      case 'ArrowDown':
        mesh.current.position.y -= step;
        break;
      case 'ArrowLeft':
        mesh.current.position.x -= step;
        break;
      case 'ArrowRight':
        mesh.current.position.x += step;
        break;
      default:
        break;
    }
  };

  return (
    <animated.mesh
      ref={mesh}
      position={position}
      scale={scale}
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerMove={onPointerMove}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[2.8, 1.6, 0.18]} />
      <meshStandardMaterial color={hovered || focused ? '#5fa8f2' : '#f0efea'} roughness={0.3} metalness={0.1} />
      <Html center style={{ width: '90%', height: '90%' }}>
        <div
          className="rounded-xl shadow-3d p-4 bg-white/80 backdrop-blur-md border border-bg-neutral-alt outline-none"
          tabIndex={0}
          aria-label={title}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={onKeyDown}
          role="region"
        >
          <h2 className="font-header text-lg text-gray-900 mb-2">{title}</h2>
          <div className="font-body text-gray-700 text-sm">{children}</div>
        </div>
      </Html>
    </animated.mesh>
  );
}

export default function Dashboard3D() {
  return (
    <div className="w-full h-[70vh] md:h-[80vh] rounded-2xl overflow-hidden shadow-3d bg-bg-neutral flex items-center justify-center">
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 7]} intensity={0.7} castShadow />
        <Suspense fallback={null}>
          <FloatingPanel position={[-2.5, 0.5, 0]} title="Workflow Overview">
            Quick access to your AI agents and workflows.
          </FloatingPanel>
          <FloatingPanel position={[1.5, -0.7, 0]} title="Recent Activity">
            See what's new in your marketplace.
          </FloatingPanel>
          <FloatingPanel position={[0, 1.5, 0]} title="Insights">
            Data-driven insights and analytics.
          </FloatingPanel>
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  );
}

export { FloatingPanel }; 