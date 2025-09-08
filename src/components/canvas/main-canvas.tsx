
"use client";
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Stars = (props: any) => {
  const ref = React.useRef<THREE.Points>(null!);
  const [sphere] = React.useState(() => {
    const positions = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 5;
      positions[i3+1] = (Math.random() - 0.5) * 5;
      positions[i3+2] = (Math.random() - 0.5) * 5;
    }
    return positions;
  });

  useGLTF.preload('/star/scene.gltf');
  const star = useGLTF('/star/scene.gltf');

  React.useLayoutEffect(() => {
    if (ref.current) {
      const transform = new THREE.Object3D();
      for (let i = 0; i < 5000; ++i) {
        const i3 = i * 3;
        transform.position.set(positions[i3], positions[i3 + 1], positions[i3 + 2]);
        transform.updateMatrix();
        ref.current.setMatrixAt(i, transform.matrix);
      }
      ref.current.instanceMatrix.needsUpdate = true;
    }
  }, [positions]);

  return (
    <instancedMesh ref={ref} args={[star.scene.children[0].geometry, undefined, 5000]} {...props}>
        <meshStandardMaterial color="white" />
    </instancedMesh>
  );
};


export const MainCanvas = () => {
    return (
        <div className="absolute inset-0 z-[-1]">
             <Canvas camera={{ position: [0, 0, 1] }}>
                <Suspense fallback={null}>
                    <Stars />
                </Suspense>
                <Preload all />
            </Canvas>
        </div>
    )
}
