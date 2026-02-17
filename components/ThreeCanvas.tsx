import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const SecurityCore = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    // state.pointer is normalized (-1 to 1)
    const { x, y } = state.pointer;
    
    // Rotate meshes based on mouse position
    if (meshRef.current) {
      // Direct response to cursor for "interactive" feel
      meshRef.current.rotation.x = y * 0.8;
      meshRef.current.rotation.y = x * 0.8;
    }
    
    if (outerRef.current) {
      outerRef.current.rotation.z += 0.002;
      // Opposite rotation for depth effect
      outerRef.current.rotation.x = -y * 0.5;
      outerRef.current.rotation.y = -x * 0.5;
    }
  });

  return (
    <group scale={1.2}>
      {/* Inner Core - The glowing brain */}
      <Sphere args={[1.2, 64, 64]} ref={meshRef}>
        <MeshDistortMaterial
          color="#00ff41"
          emissive="#00ff41"
          emissiveIntensity={0.8}
          wireframe={true}
          distort={0.5}
          speed={1.5}
          transparent
          opacity={0.9}
        />
      </Sphere>

      {/* Outer Security Shell - The firewall */}
      <Sphere args={[2.2, 32, 32]} ref={outerRef}>
        <meshBasicMaterial
          color="#00f3ff"
          wireframe
          transparent
          opacity={0.1}
        />
      </Sphere>
      
      {/* Ambient Particles */}
      <points>
        <sphereGeometry args={[3.5, 64, 64]} />
        <pointsMaterial color="#00ff41" size={0.015} transparent opacity={0.3} sizeAttenuation={true} />
      </points>
    </group>
  );
};

const ThreeCanvas = () => {
  return (
    <div className="absolute inset-0 z-0 h-full w-full">
      <Canvas 
        eventSource={document.body}
        eventPrefix="client"
        camera={{ position: [0, 0, 5], fov: 60 }}
      >
        <fog attach="fog" args={['#020202', 2, 10]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} color="#00ff41" intensity={1.5} />
        <pointLight position={[-5, -5, -5]} color="#00f3ff" intensity={1} />
        <SecurityCore />
      </Canvas>
    </div>
  );
};

export default ThreeCanvas;