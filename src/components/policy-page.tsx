import { createElement, type ReactNode } from "react";
import policies from "@/lib/policies.json";
type ContentNode = { text?: string; tag?: string; href?: string | null; children?: ContentNode[] };

const allowedTags = new Set(["h1", "h2", "h3", "p", "ul", "ol", "li", "hr", "strong", "em", "a"]);

function safeHref(href?: string | null) {
  if (!href) return undefined;
  if (href.startsWith("/") && !href.startsWith("//")) return href;

  try {
    const url = new URL(href);
    return ["https:", "http:", "mailto:", "tel:"].includes(url.protocol) ? href : undefined;
  } catch {
    return undefined;
  }
}

function renderNode(n: ContentNode, key: number): ReactNode {
  if (n.text !== undefined) return n.text;
  if (!n.tag || !allowedTags.has(n.tag)) return null;
  const props = n.tag === "a" ? { key, href: safeHref(n.href) } : { key };
  return createElement(n.tag, props, ...(n.children ?? []).map(renderNode));
}
export function PolicyPage({ slug }: { slug: keyof typeof policies }) {
  return <main className="policy-page">{(policies[slug] as ContentNode[]).map(renderNode)}</main>;
}
