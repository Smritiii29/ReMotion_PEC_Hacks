import { Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, useAnimations, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

interface AvatarViewerProps {
  modelPath: string;
}

const AvatarModel = ({ modelPath }: { modelPath: string }) => {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(modelPath) as any;
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAction = actions[Object.keys(actions)[0]];
      firstAction?.reset().fadeIn(0.5).play();
    }
    return () => {
      Object.values(actions).forEach((action: any) => action?.stop());
    };
  }, [actions, modelPath]);

  return (
    <group ref={group} dispose={null}>
      <primitive
        object={scene}
        // INCREASED SCALE: Makes the avatar physically larger
        scale={2.8} 
        // ADJUSTED POSITION: [x, y, z]
        // y: -3.4 lowers the model so the feet are at the bottom
        // z: 0.5 keeps it slightly forward
        position={[0, -3.4, 0.5]} 
        rotation={[0, 0, 0]}
      />
    </group>
  );
};

export default function AvatarViewer({ modelPath }: AvatarViewerProps) {
  return (
    <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center">
      {/* CAMERA ADJUSTMENT: 
          position: [0, 1, 3.5] -> Moved Z from 5 to 3.5 (Closer)
          fov: 40 -> Slightly wider to catch the full body at close range
      */}
      <Canvas camera={{ position: [0, 1, 3.5], fov: 40 }} shadows>
        <ambientLight intensity={2.3} />
        <spotLight position={[5, 6, 6]} intensity={3.5} color="#ffe2c6" castShadow />
        <Environment preset="city" />
        <Suspense fallback={null}>
          <AvatarModel modelPath={modelPath} />
        </Suspense>
        <ContactShadows opacity={0.5} scale={10} blur={2} far={4} resolution={256} color="#000000" />
      </Canvas>
    </div>
  );
}