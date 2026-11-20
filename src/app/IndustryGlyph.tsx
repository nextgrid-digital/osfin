"use client";

import { Icon, type IconifyIcon } from "@iconify/react";

export default function IndustryGlyph({ icon }: { icon: IconifyIcon }) {
  return <Icon aria-hidden icon={icon} width={40} height={40} />;
}
