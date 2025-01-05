import Markdown from "@/components/Markdown";
import { forwardRef } from "react";

type Props = {
  ingredients: string;
  instructions: string;
  modifications?: string;
  onTryAgain: () => void;
};

export const FullRecipePrint = forwardRef(
  ({ ingredients, instructions, modifications, onTryAgain }: Props, ref) => {
    return (
      <div ref={ref}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1>Grocery List</h1>
            <Markdown content={ingredients} onTryAgain={onTryAgain} />
          </div>
          <div className="flex flex-col gap-2">
            <h1>Instructions</h1>
            <Markdown content={instructions} onTryAgain={onTryAgain} />
          </div>
          {modifications && (
            <div className="flex flex-col gap-2">
              <h1>Modifications</h1>
              <Markdown content={modifications} onTryAgain={onTryAgain} />
            </div>
          )}
        </div>
      </div>
    );
  }
);

FullRecipePrint.displayName = "Input";
