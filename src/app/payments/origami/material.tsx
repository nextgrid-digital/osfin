"use client";

import { useTexture } from "@react-three/drei";
import { MeshMatcapMaterialProps } from "@react-three/fiber";
import { forwardRef } from "react";
import { MeshMatcapMaterial } from "three";

const MATCAP_PATH = "/origami/2.jpeg";

export const CustomMaterial = forwardRef<
  MeshMatcapMaterial,
  MeshMatcapMaterialProps
>((props, ref) => {
  const texture = useTexture(MATCAP_PATH);
  return <meshMatcapMaterial {...props} ref={ref} matcap={texture} />;
});

CustomMaterial.displayName = "CustomMaterial";
