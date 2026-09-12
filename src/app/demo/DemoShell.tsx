"use client";

import { useLayoutEffect, useRef } from "react";
import "./demo.css";
import { createRouter } from "./router";
import type { DemoNamespace } from "./types";

export default function DemoShell({ initial }: { initial: DemoNamespace }) {
  const started = useRef(false);

  useLayoutEffect(() => {
    if (started.current) return;
    started.current = true;
    const router = createRouter();
    void router.init(initial);
    return () => {
      router.destroy();
      started.current = false;
    };
  }, [initial]);

  return (
    <div className="demo-root">
      <div className="demo-wrapper" data-transition="wrapper" />
    </div>
  );
}
