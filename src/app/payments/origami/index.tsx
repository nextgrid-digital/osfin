"use client";

import dynamic from "next/dynamic";

const OrigamiCore = dynamic(() => import("./core-canvas"), { ssr: false });

export default OrigamiCore;
