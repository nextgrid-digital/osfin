"use client";

import { useGSAP } from "@gsap/react";
import { Center } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { CustomMaterial } from "./material";

type CoreSceneProps = {
  playing: boolean;
  reducedMotion: boolean;
};

export function CoreScene({ playing, reducedMotion }: CoreSceneProps) {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const cone1Ref = useRef<THREE.Mesh>(null);
  const cone2Ref = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      if (
        reducedMotion ||
        !ring1Ref.current ||
        !ring2Ref.current ||
        !cone1Ref.current ||
        !cone2Ref.current ||
        !groupRef.current
      ) {
        return;
      }

      const timeline = gsap
        .timeline({
          repeat: -1,
          paused: !playing,
        })
        .to(
          ring1Ref.current.rotation,
          {
            z: `+=${Math.PI * 2}`,
            x: `+=${Math.PI * 2}`,
            duration: 4,
            ease: "none",
          },
          0
        )
        .to(
          ring2Ref.current.rotation,
          {
            z: `-=${Math.PI * 2}`,
            x: `-=${Math.PI * 2}`,
            ease: "none",
            duration: 4,
          },
          0
        )
        .to(
          groupRef.current.rotation,
          {
            y: Math.PI * 2,
            duration: 4,
            ease: "none",
          },
          0
        );

      timelineRef.current = timeline;

      return () => {
        timeline.kill();
        timelineRef.current = null;
      };
    },
    { dependencies: [reducedMotion] }
  );

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) {
      return;
    }
    if (playing) {
      timeline.play();
      return;
    }
    timeline.pause();
  }, [playing]);

  return (
    <Center ref={groupRef} scale={0.55}>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.1, 0.1]} />
        <CustomMaterial />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.1]} />
        <CustomMaterial />
      </mesh>
      <group scale={0.8}>
        <mesh position={[0, 1, 0]} rotation={[0, 0, 0]} ref={cone1Ref}>
          <coneGeometry args={[1, 1.41, 4]} />
          <CustomMaterial />
        </mesh>
        <mesh position={[0, -1, 0]} rotation={[-Math.PI, 0, 0]} ref={cone2Ref}>
          <coneGeometry args={[1, 1.41, 4]} />
          <CustomMaterial />
        </mesh>
      </group>
    </Center>
  );
}
