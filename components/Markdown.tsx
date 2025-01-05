import { FC, memo } from "react";
import ReactMarkdown, { Options } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

const MemoizedReactMarkdown: FC<Options> = memo(
  ReactMarkdown,
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.className === nextProps.className
);

const Markdown = ({ content, onTryAgain, className }) => {
  return (
    <MemoizedReactMarkdown
      className={cn(
        "prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words text-tremor-default text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis text-tremor-title",
        className
      )}
      remarkPlugins={[remarkGfm, remarkMath]}
      components={{
        p({ children }) {
          return (
            <div className="mb-4 last:mb-0">
              <p className="mb-6">{children}</p>
              <p>
                {content
                  .toLowerCase()
                  .includes("no recipe found on this page") && (
                    <Button onClick={onTryAgain}>Try again</Button>
                  )}
              </p>
            </div>
          );
        },
        ul({ children }) {
          return <ul className="mb-4 last:mb-0 list-disc">{children}</ul>;
        },
        ol({ children }) {
          return <ol className="mb-4 last:mb-0 list-disc">{children}</ol>;
        },
        code({ node, inline, className, children, ...props }) {
          return (
            <div className="mb-4 last:mb-0">
              <p className="mb-6">{children}</p>
              <p>
                {content
                  .toLowerCase()
                  .includes("no recipe found on this page") && (
                    <Button onClick={onTryAgain}>Try again</Button>
                  )}
              </p>
            </div>
          );
        },
      }}
    >
      {content}
    </MemoizedReactMarkdown>
  );
};

Markdown.displayName = "Markdown";

export default Markdown;
