import { notFound } from "next/navigation";
import { getProduct, productSlugs } from "../../../content/products";
import ProductSwitcher from "../../ProductSwitcher";

export function generateStaticParams() {
  return productSlugs().map((slug) => ({ slug }));
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
