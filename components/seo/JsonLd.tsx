type JsonLdProps = { data: Record<string, unknown> };

/**
 * Renders schema.org structured data. `<` is escaped so injected strings
 * can't break out of the script tag (per the Next.js JSON-LD guide).
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
