import { InitKnowledgeClient } from "./init-knowledge-client";
import { notFound } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ key?: string }>;
}

export default async function InitKnowledgePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const secret = process.env["ADMIN_INIT_SECRET"];
  const isDev = process.env["NODE_ENV"] === "development";

  const allowed = (isDev && !secret) || (secret && params.key === secret);

  if (!allowed) {
    notFound();
  }

  return <InitKnowledgeClient />;
}
