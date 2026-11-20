import type { Metadata } from "next";
import MachineDocument from "./MachineDocument";

export const metadata: Metadata = {
  title: "Osfin",
  description: "The finance automation platform built for enterprise complexity.",
};

export default function MachinePage() {
  return <MachineDocument />;
}
