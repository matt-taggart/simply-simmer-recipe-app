import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import { useCopyToClipboard } from "@/lib/utils";
import { DEFAULT_PRINT_STYLE } from "@/lib/constants";
import Markdown from "@/components/Markdown";
import { UtilityBar } from "@/components/utility-bar";

type Props = {
  isLoading: boolean;
  onTryAgain: () => void;
  loader: React.ReactNode;
  recipeData: RecipeData;
  thumbnail: string;
  url: string;
  website: string;
};

type RecipeData = {
  name: string;
  ingredients: string;
  instructions: string;
  modifications: string;
};

export const RecipeOutput = ({
  recipeData,
  thumbnail,
  url,
  website,
  isLoading,
  onTryAgain,
  loader,
}: Props) => {
  const { name, ingredients, instructions, modifications } = recipeData;
  const ingredientsRef = useRef<HTMLSpanElement>(null);
  const componentRef = useRef<HTMLSpanElement>(null);

  const {
    isCopied: areIngredientsCopied,
    copyToClipboard: copyIngredientsToClipboard,
  } = useCopyToClipboard({ timeout: 2000 });
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const handlePrintIngredients = useReactToPrint({
    content: () => ingredientsRef.current,
    pageStyle: DEFAULT_PRINT_STYLE,
  });
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: DEFAULT_PRINT_STYLE,
  });
  return (
    <>
      <div
        className="tremor-Card-root relative w-full text-left ring-1 rounded-tremor-default bg-tremor-background ring-tremor-ring shadow-tremor-card dark:bg-dark-tremor-background dark:ring-dark-tremor-ring dark:shadow-dark-tremor-card border-tremor-brand dark:border-dark-tremor-brand p-6 px-8"
        style={{ minHeight: "50vh" }}
      >
        <div className="group flex justify-between">
          <p
            className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words pb-5 text-center font-bold text-xl text-tremor-default text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis"
            style={{ fontSize: "1.325rem" }}
          >
            Grocery List
          </p>
          <UtilityBar
            printAction={handlePrintIngredients}
            copyAction={copyIngredientsToClipboard}
            textToCopy={`${name}\n\nIngredients:\n\n${ingredients}`}
            copyState={!!areIngredientsCopied}
          />
        </div>
        <span style={{ display: "none" }}>
          <div ref={ingredientsRef} className="flex flex-col gap-2">
            <p className="text-xl">Grocery List</p>
            {ingredients && (
              <Markdown content={ingredients} onTryAgain={onTryAgain} />
            )}
          </div>
        </span>

        <span>
          {isLoading && !ingredients && <>{loader}</>}
          {ingredients && (
            <Markdown content={ingredients} onTryAgain={onTryAgain} />
          )}
        </span>
      </div>
      <div
        className="tremor-Card-root relative w-full text-left ring-1 rounded-tremor-default bg-tremor-background ring-tremor-ring shadow-tremor-card dark:bg-dark-tremor-background dark:ring-dark-tremor-ring dark:shadow-dark-tremor-card border-tremor-brand dark:border-dark-tremor-brand p-6 px-8"
        style={{ minHeight: "50vh" }}
      >
        <div className="group flex justify-between">
          <p
            className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words pb-5 text-center font-bold text-xl text-tremor-default text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis"
            style={{ fontSize: "1.325rem" }}
          >
            Cooking Instructions
          </p>
          <UtilityBar
            printAction={handlePrint}
            copyAction={copyToClipboard}
            textToCopy={`${name}\n\nCooking Instructions:\n\n${instructions}\n\n${modifications ? modifications : ""
              }`}
            copyState={!!isCopied}
          />
        </div>
        <span style={{ display: "none" }}>
          <span className="flex flex-col gap-2" ref={componentRef}>
            <p className="text-xl">Cooking Instructions</p>
            {name && (
              <div className="flex flex-col">
                {name && <Markdown content={name} onTryAgain={onTryAgain} />}
                <p style={{ marginTop: "-20px" }}>{website}</p>
              </div>
            )}

            {instructions && (
              <Markdown content={instructions} onTryAgain={onTryAgain} />
            )}
            {modifications && (
              <Markdown
                content={`## *Modifications*\n\n${modifications}`}
                onTryAgain={onTryAgain}
              />
            )}
          </span>
        </span>
        <span>
          <div className="flex gap-8 mb-5">
            <div className="flex flex-col justify-center items-center">
              {name && <Markdown content={name} onTryAgain={onTryAgain} />}
              {name && (
                <a
                  className="justify-start p-0 hover:underline text-[#eeb08f]"
                  href={url}
                  target="_blank"
                  style={{ marginTop: "-20px" }}
                >
                  {website}
                </a>
              )}
            </div>
            {name && thumbnail && (
              <img
                style={{ width: "100%", maxWidth: "100px", height: "auto" }}
                src={thumbnail}
                alt=""
              />
            )}
          </div>
          {isLoading && !ingredients && <>{loader}</>}

          {instructions && (
            <Markdown content={instructions} onTryAgain={onTryAgain} />
          )}
          <div className="mt-5">
            {modifications && (
              <Markdown
                content={`\n\n## *Modifications*\n\n${modifications}`}
                onTryAgain={onTryAgain}
              />
            )}
          </div>
        </span>
      </div>{" "}
    </>
  );
};
