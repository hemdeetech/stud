
"use client";
import React, { Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Preload, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Stars = (props: any) => {
  const ref = React.useRef<THREE.Points>(null!);
  
  const sphere = useMemo(() => {
    return (new THREE.Float32BufferAttribute(Array.from({ length: 5000 * 3 }, () => (Math.random() - 0.5) * 5), 3));
  }, []);

  useFrame((state, delta) => {
    if(ref.current) {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
        <Points ref={ref} positions={sphere.array as Float32Array} stride={3} frustumCulled {...props}>
            <PointMaterial
                transparent
                color="#f272c8"
                size={0.002}
                sizeAttenuation={true}
                depthWrite={false}
            />
        </Points>
    </group>
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
