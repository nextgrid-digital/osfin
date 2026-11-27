import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  financeOperationSlugs,
  financeTaglinePlain,
  getFinanceOperation,
} from "../../../content/finance-operations";
import FinanceOperationsSwitcher from "../../FinanceOperationsSwitcher";

export function generateStaticParams() {
  return financeOperationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const operation = getFinanceOperation(slug);
  if (!operation) return {};
  return {
    title: `${operation.name} | Osfin`,
    description: financeTaglinePlain(operation.tagline),
  };
}

export default async function FinanceOperationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const operation = getFinanceOperation(slug);
  if (!operation) notFound();
  return <FinanceOperationsSwitcher initialSlug={operation.slug} />;
}
