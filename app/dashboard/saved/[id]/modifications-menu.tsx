import { forwardRef } from "react";

import { Button } from "@/components/ui/button";

export const ModificationsMenu = forwardRef((props, ref) => {
  const { predicate } = props;
  return (
    <div
      className="flex flex-col bg-white dark:bg-black rounded-sm shadow-xl py-4 mt-1"
      style={{
        width: "min(100%, 24rem)",
        zIndex: "999 !important",
      }}
    >
      <Button
        onClick={() => {
          ref.current?.focus();

          predicate({
            target: { value: "Double the recipe" },
          });
        }}
        variant="ghost"
        className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words text-tremor-default text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis text-left px-4 py-2"
        style={{ justifyContent: "flex-start" }}
      >
        Double the recipe...
      </Button>
      <Button
        onClick={() => {
          ref.current?.focus();

          predicate({
            target: { value: "Make this healthier" },
          });
        }}
        variant="ghost"
        className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words text-tremor-default text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis text-left px-4 py-2"
        style={{ justifyContent: "flex-start" }}
      >
        Make this healthier...
      </Button>
      <Button
        onClick={() => {
          ref.current?.focus();

          predicate({
            target: { value: "Make this macro friendly" },
          });
        }}
        variant="ghost"
        className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words text-tremor-default text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis text-left px-4 py-2"
        style={{ justifyContent: "flex-start" }}
      >
        Make this macro friendly...
      </Button>
      <Button
        onClick={() => {
          ref.current?.focus();

          predicate({
            target: {
              value: "Convert measurements to metric",
            },
          });
        }}
        variant="ghost"
        className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words text-tremor-default text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis text-left px-4 py-2"
        style={{ justifyContent: "flex-start" }}
      >
        Convert measurements to metric...
      </Button>

      <Button
        onClick={() => {
          ref.current?.focus();

          predicate({
            target: {
              value: "I have allergies to cheese. What's a good substitute?",
            },
          });
        }}
        variant="ghost"
        className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words text-tremor-default text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis text-left px-4 py-2"
        style={{ justifyContent: "flex-start" }}
      >
        I have allergies to cheese...
      </Button>
    </div>
  );
});
