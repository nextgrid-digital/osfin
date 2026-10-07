import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, productSlugs } from "../../../content/products";
import ProductSwitcher from "../../ProductSwitcher";

export function generateStaticParams() {
  return productSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} | Osfin`,
    description: product.seoDescription ?? product.cardBody,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductSwitcher initialSlug={product.slug} />;
}
