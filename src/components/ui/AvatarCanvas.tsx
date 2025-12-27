import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { SkeletonUtils } from 'three-stdlib';

// --- Components ---

const PlatformBox = ({ color }: { color: string }) => (
  <mesh position={[0, -1.6, 0]} receiveShadow>
    <boxGeometry args={[3.5, 0.2, 3.5]} /> 
    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.1} roughness={0.2} metalness={0.5} />
  </mesh>
);

const ErrorHighlight = ({ targetBone }: { targetBone: THREE.Object3D }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (meshRef.current && targetBone) {
      const worldPos = new THREE.Vector3();
      targetBone.getWorldPosition(worldPos);
      meshRef.current.position.copy(worldPos);
      meshRef.current.position.y -= 0.05; 
    }
  });
  return (
    <mesh ref={meshRef}>
      <capsuleGeometry args={[0.12, 0.45, 4, 8]} /> 
      <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={1.5} transparent opacity={0.5} depthTest={false} />
    </mesh>
  );
};

const Model = ({ url, scale, isSelected, accentColor, isThumbnail, positionZ = 0, highlightPart }: any) => {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(url) as any;
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { actions } = useAnimations(animations, group);
  const [targetBone, setTargetBone] = useState<THREE.Object3D | null>(null);

  useEffect(() => {
    const actionKeys = Object.keys(actions);
    if (actionKeys.length > 0) {
      const action = actions[actionKeys[0]];
      if (action) {
        action.reset().fadeIn(0.5).play();
        action.paused = !!highlightPart; 
        action.timeScale = isSelected ? 1 : 0.5;
      }
      return () => { action?.fadeOut(0.5); };
    }
  }, [actions, isSelected, highlightPart]);

  useEffect(() => {
    if (!highlightPart) { setTargetBone(null); return; }
    const boneMap: Record<string, string> = {
      'forearm': 'RightForearm', 'upper_arm': 'RightArm', 'joint': 'RightForearm',
      'back': 'Spine1', 'spine': 'Spine'
    };
    const searchName = boneMap[highlightPart] || highlightPart;
    let found: THREE.Object3D | null = null;
    clone.traverse((child: any) => {
      if (child.isBone && child.name.includes(searchName)) found = child;
    });
    setTargetBone(found);
  }, [highlightPart, clone]);

  return (
    <group ref={group} dispose={null}>
      <primitive object={clone} scale={scale} position={[0, -1.6, positionZ]} />
      {targetBone && <ErrorHighlight targetBone={targetBone} />}
      {isSelected && !isThumbnail && (
         <pointLight position={[2, 2, 2]} intensity={3} color={accentColor} distance={6} />
      )}
    </group>
  );
};

export const AvatarCanvas = ({
  modelUrl,
  isSelected,
  accentColor,
  className = "w-full h-full",
  isThumbnail = false,
  variant = "select", 
  view = "front",
  highlightPart = null
}: {
  modelUrl: string;
  isSelected: boolean;
  accentColor: string;
  className?: string;
  isThumbnail?: boolean;
  variant?: "select" | "exercise";
  view?: "front" | "side";
  highlightPart?: string | null;
}) => {
  
  // === Adjusted Camera Settings for Better Fit ===
  let cameraPosition: [number, number, number] = [0, 0.9, 5.5];
  let fov = 40;

  if (isThumbnail) {
    cameraPosition = [0, 0.9, 4.8];
    fov = 48;
  } else if (variant === "exercise") {
    // Increased distance (Z) slightly to ensure full body fits
    if (view === "side") {
      cameraPosition = [10.5, 1.2, 0];
    } else {
      cameraPosition = [0, 1.2, 10.5]; 
    }
    fov = 30; // Lower FOV + higher distance = less distortion, flatter look
  }

  // Slightly reduced scale to prevent head clipping at top
  const modelScale = isThumbnail ? 1.3 : 1.8;

  return (
    <div className={className}>
      <Canvas key={view} camera={{ position: cameraPosition, fov }} shadows dpr={[1, 2]}>
        <ambientLight intensity={isThumbnail ? 1.5 : 0.8} />
        <spotLight position={[5, 10, 5]} angle={0.25} penumbra={1} intensity={4} castShadow />
        <Environment preset="city" />

        <Model
          url={modelUrl}
          scale={modelScale}
          isSelected={isSelected}
          accentColor={accentColor}
          isThumbnail={isThumbnail}
          positionZ={0}
          highlightPart={highlightPart}
        />

        {/* Render Platform only in exercise mode */}
        {variant === "exercise" && <PlatformBox color="#112d32" />}

        <ContactShadows opacity={0.5} scale={10} blur={2} far={4} resolution={256} color="#000000" />
        
        {/* Orbit Controls (Limited angles to keep the view clean) */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enabled={!isThumbnail} 
          minPolarAngle={Math.PI / 2.5} 
          maxPolarAngle={Math.PI / 1.9}
        />
      </Canvas>
    </div>
  );
};

export default AvatarCanvas;