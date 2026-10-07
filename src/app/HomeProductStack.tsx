"use client";

import { ServicesStack, type Service } from "@/components/ui/services-stack";
import { PRODUCTS } from "../content/products";

const services: Service[] = PRODUCTS.map((product) => ({
  id: product.slug,
  sceneId: product.sceneId,
  title: product.name,
  text: product.homeBody,
  capabilities: product.capabilities.map((cap) => cap.title.replace(/\.$/, "")),
  href: `/products/${product.slug}`,
}));

export default function HomeProductStack() {
  return <ServicesStack eyebrow="Products" services={services} />;
}
