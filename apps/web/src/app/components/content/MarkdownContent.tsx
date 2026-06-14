import type { ComponentPropsWithoutRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownContentProps = {
  children: string;
};

function MarkdownLink({
  href,
  children,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  const isExternal =
    href?.startsWith("http://") || href?.startsWith("https://");

  return (
    <a
      {...props}
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer noopener" : undefined}
      className="font-bold text-foreground underline decoration-border-strong underline-offset-4 transition-colors hover:decoration-foreground"
    >
      {children}
    </a>
  );
}

export function MarkdownContent({ children }: MarkdownContentProps) {
  return (
    <div className="min-w-0 text-sm leading-7 text-muted-foreground">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        skipHtml
        components={{
          h1: ({ children }) => (
            <h3 className="mb-3 mt-7 text-xl font-black leading-tight text-foreground first:mt-0">
              {children}
            </h3>
          ),
          h2: ({ children }) => (
            <h3 className="mb-3 mt-7 text-lg font-black leading-tight text-foreground first:mt-0">
              {children}
            </h3>
          ),
          h3: ({ children }) => (
            <h4 className="mb-2 mt-6 font-black text-foreground first:mt-0">
              {children}
            </h4>
          ),
          p: ({ children }) => <p className="my-3 first:mt-0">{children}</p>,
          a: MarkdownLink,
          strong: ({ children }) => (
            <strong className="font-black text-foreground">{children}</strong>
          ),
          ul: ({ children }) => (
            <ul className="my-3 list-disc space-y-1 pl-5 marker:text-foreground">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-3 list-decimal space-y-1 pl-5 marker:font-bold marker:text-foreground">
              {children}
            </ol>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-4 border-l-4 border-border-strong bg-surface-raised px-4 py-2 text-foreground">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-6 border-border" />,
          code: ({ children, className }) => (
            <code
              className={`rounded-control bg-surface-inset px-1.5 py-0.5 font-mono text-[0.85em] text-foreground ${className ?? ""}`}
            >
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="my-4 overflow-x-auto rounded-tile border border-border bg-surface-inset p-4 text-sm [&>code]:bg-transparent [&>code]:p-0">
              {children}
            </pre>
          ),
          table: ({ children }) => (
            <div className="my-4 overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-border bg-surface-raised px-3 py-2 font-black text-foreground">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-border px-3 py-2">{children}</td>
          ),
          input: (props) => (
            <input {...props} disabled className="mr-2 accent-foreground" />
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
