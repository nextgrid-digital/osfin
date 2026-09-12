import type { ReactNode } from "react";
export type LogoData = {
  ariaLabel: string;
  viewBox: string;
  fill: string;
  icon: ReactNode;
  dataname?: string;
};
/** A logo. */
export default function Logo({ d }: { d: LogoData }) {
  return (
    <li className="list-item">
      <svg className="w-25 h-25 block overflow-hidden align-middle" data-component="image" aria-label={d.ariaLabel} height="100" viewBox={d.viewBox} width="100" fill={d.fill} data-name={d.dataname}>{d.icon}</svg>
      {" "}
    </li>
  );
}
