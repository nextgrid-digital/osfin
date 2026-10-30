import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INDUSTRIES } from "../../../content/industries";
import IndustrySwitcher from "../../IndustrySwitcher";

function industryBySlug(slug: string) {
  return INDUSTRIES.find((item) => item.id === slug);
}

export function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({ slug: industry.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = industryBySlug(slug);
  if (!industry) return {};
  return {
    title: `${industry.label} | Osfin`,
    description: industry.summary,
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!industryBySlug(slug)) notFound();
  return <IndustrySwitcher initialSlug={slug} />;
}
