"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import untruncateJson from "untruncate-json";
import {
  ArrowUpCircle,
  CheckIcon,
  PrinterIcon,
  SaveIcon,
  Sparkles,
} from "lucide-react";
import Skeleton from "react-loading-skeleton";
import * as Popover from "@radix-ui/react-popover";
import { useReactToPrint } from "react-to-print";

import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { saveRecipeChangesAction } from "./save-recipe-changes-action";
import sidebar from "../../recipe/[id]/sidebar.module.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/input";
import { RecipeOutput } from "@/components/recipe-output";
import { Loader } from "@/components/Loader";
import { ModificationsMenu } from "./modifications-menu";
import { DEFAULT_PRINT_STYLE, RoutePaths } from "@/lib/constants";
import { FullRecipePrint } from "@/components/full-recipe-print";

export const dynamic = "force-dynamic";

type Payload = {
  user_id: string;
  name: string;
  ingredients: string;
  instructions: string;
  modifications: string;
};

export function ModifyRecipe({ user } = {}) {
  const [isInvalid, setIsInvalid] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [isRecipeLoading, setIsRecipeLoading] = useState(false);

  const [recipeData, setRecipeData] = useState({});
  const [mergedData, setMergedData] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { id } = useParams();

  const {
    messages,
    input,
    isLoading,
    handleSubmit,
    handleInputChange,
    setMessages,
  } = useChat({
    api: "/api/chat",
    onError: () => {
      setIsInvalid(true);
    },
    onResponse: () => {
      setIsPopoverOpen(false);
    },
  });

  const [processedJson, setProcessedJson] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    modifications: "",
    error: "",
  });

  const lastMessage = messages[messages.length - 1];
  const content = lastMessage?.content || "";

  const isLastMessageFromAssistant =
    messages.length > 0 && lastMessage?.role !== "user";

  const isLastMessageFromUser =
    messages.length > 0 && lastMessage?.role !== "assistant";

  useEffect(() => {
    if (isLastMessageFromAssistant) {
      const json = untruncateJson(content);
      if (json) {
        const parsedJson = JSON.parse(json);
        setProcessedJson({
          name: parsedJson?.name,
          ingredients: parsedJson?.ingredients,
          instructions: parsedJson?.instructions,
          modifications: parsedJson?.modifications,
          error: parsedJson?.error,
        });
      }
    }
  }, [content, isLastMessageFromAssistant]);

  function onTryAgain() {
    setIsInvalid(false);
    setMessages([]);
  }

  const onAIDraftSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    handleSubmit(event, {
      data: {
        askAI: true,
        recipe: mergedData,
      },
    });
  };

  const saveRecipeChanges = async ({
    user_id,
    name,
    ingredients,
    instructions,
    modifications,
  }: Payload) => {
    setIsSaving(true);

    try {
      await saveRecipeChangesAction({
        id,
        user_id,
        name,
        ingredients,
        instructions,
        modifications,
      });
    } catch (error) {
      setIsSaving(false);
    }

    setTimeout(() => {
      setIsSaving(false);
    }, 2000);
  };

  async function getRecipe() {
    setIsRecipeLoading(true);
    const supabase = createClient();

    const { data, error } = await supabase
      .from("recipes")
      .select("*")
      .match({ id, user_id: user?.id });

    if (error) {
      router.push(RoutePaths.OVERVIEW);
      return;
    }

    setIsRecipeLoading(false);

    const recipe = data?.find(Boolean);
    const mergedData = `${recipe.name} ${recipe.ingredients} ${recipe.instructions} ${recipe.modifications}`;
    setRecipeData(recipe);
    setMergedData(mergedData);
  }

  useEffect(() => {
    getRecipe();
  }, []);

  const printRef = useRef<HTMLSpanElement>(null);
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle: DEFAULT_PRINT_STYLE,
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640); // Tailwind's default 'sm' breakpoint
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call on initial render

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full">
      <div className="space-y-4 max-w-6xl w-full mx-auto my-6 px-2 sm:px-4">
        {isInvalid ? null : (
          <>
            <div className="flex justify-start sm:justify-end align-center">
              <Popover.Root
                open={isPopoverOpen}
                onOpenChange={() => setIsPopoverOpen(!isPopoverOpen)}
              >
                <div className="flex flex-col w-full sm:w-auto sm:flex-row gap-2">
                  <Button
                    disabled={isSaving}
                    className={cn(
                      "text-current border-none p-0 font-inherit cursor-pointer outline-inherit",
                      "ring-1 rounded-tremor-default bg-tremor-background ring-tremor-ring shadow-tremor-card dark:bg-dark-tremor-background dark:ring-dark-tremor-ring dark:shadow-dark-tremor-card border-tremor-brand dark:border-dark-tremor-brand px-4 py-2 flex",

                      "text-tremor-default text-tremor-content dark:text-dark-tremor-content bg-tremor-background hover:bg-accent opacity-50 hover:opacity-100 text-[#bd1e59] max-[600px]:py-8"
                    )}
                    onClick={() => handlePrint()}
                  >
                    <PrinterIcon className="mr-2" />
                    <p className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words">
                      Print Recipe
                    </p>
                  </Button>
                  {isPopoverOpen ? (
                    <div />
                  ) : (
                    <>
                      <Button
                        disabled={!lastMessage || isSaving}
                        className={cn(
                          "text-current border-none p-0 font-inherit cursor-pointer outline-inherit",
                          "ring-1 rounded-tremor-default bg-tremor-background ring-tremor-ring shadow-tremor-card dark:bg-dark-tremor-background dark:ring-dark-tremor-ring dark:shadow-dark-tremor-card border-tremor-brand dark:border-dark-tremor-brand px-4 py-2 flex",

                          "text-tremor-default text-tremor-content dark:text-dark-tremor-content bg-tremor-background hover:bg-accent opacity-50 hover:opacity-100 text-[#bd1e59] max-[600px]:py-8"
                        )}
                        onClick={() =>
                          saveRecipeChanges({
                            ...processedJson,
                            user_id: user?.id,
                          })
                        }
                      >
                        {isSaving ? (
                          <>
                            <CheckIcon className="mr-2" />
                            <p className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words">
                              Changes saved
                            </p>
                          </>
                        ) : (
                          <>
                            <SaveIcon className="mr-2" />
                            <p className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words">
                              Save changes
                            </p>
                          </>
                        )}
                      </Button>
                    </>
                  )}

                  <Popover.Trigger>
                    <Button
                      className={cn(
                        "text-current border-none p-0 font-inherit cursor-pointer outline-inherit",
                        "ring-1 rounded-tremor-default bg-tremor-background ring-tremor-ring shadow-tremor-card dark:bg-dark-tremor-background dark:ring-dark-tremor-ring dark:shadow-dark-tremor-card border-tremor-brand dark:border-dark-tremor-brand px-4 py-2 flex",
                        "text-tremor-default text-tremor-content dark:text-dark-tremor-content bg-tremor-background hover:bg-accent opacity-50 hover:opacity-100 text-[#bd1e59] max-[600px]:py-8 w-full sm:w-auto"
                      )}
                    >
                      <Sparkles className="mr-2" />
                      <p className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words">
                        Ask AI to modify recipe
                      </p>
                    </Button>
                  </Popover.Trigger>
                </div>

                <Popover.Content
                  side="bottom"
                  align="end"
                  sideOffset={-60}
                  className={`relative z-10 ${isMobile ? "w-full" : "sm:w-96"}`}
                  style={isMobile ? { left: 0, right: 0 } : {}}
                >
                  <div
                    className="flex align-center bg-white dark:bg-black rounded-sm shadow-xl p-4"
                    style={{
                      width: isMobile
                        ? "calc(100vw - 1rem)"
                        : "min(100%, 24rem)",
                    }}
                  >
                    <form className="w-full my-0" onSubmit={onAIDraftSubmit}>
                      <div className="w-full relative">
                        <Sparkles
                          className="mr-2 h-6 w-6 sm:h-5 sm:w-5"
                          color="#eeb08f"
                          style={{
                            position: "absolute",
                            transform: "translate(50%, 50%)",
                            left: 0,
                          }}
                        />
                        <Input
                          autoFocus
                          name="message"
                          placeholder="Draft a message..."
                          className="flex-1 w-full text-neutral-600 pr-10 py-6 sm:py-4 pl-[45px] sm:pl-[40px] sm:py-auto text-base sm:text-sm"
                          value={input}
                          ref={inputRef}
                          onChange={handleInputChange}
                        />
                        <div
                          className="absolute right-5"
                          style={{
                            top: "50%",
                            transform: "translateY(-50%)",
                            right: 0,
                          }}
                        >
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-12 h-12 sm:h-10 sm:w-10 hover:opacity-75"
                          >
                            <ArrowUpCircle color="#eeb08f" />
                          </Button>
                        </div>
                      </div>
                      {isLoading && isLastMessageFromUser && (
                        <p className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words text-sm px-2 text-tremor-default text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis mt-4">
                          AI is modifying your recipe...
                        </p>
                      )}
                    </form>
                  </div>
                  {!isLoading && (
                    <ModificationsMenu
                      ref={inputRef}
                      predicate={handleInputChange}
                    />
                  )}
                </Popover.Content>
              </Popover.Root>
            </div>
            {lastMessage ? (
              <div style={{ display: "none" }}>
                <FullRecipePrint
                  ref={printRef}
                  ingredients={processedJson.ingredients}
                  instructions={processedJson.instructions}
                  modifications={processedJson.modifications}
                  onTryAgain={onTryAgain}
                />
              </div>
            ) : (
              <div style={{ display: "none" }}>
                <FullRecipePrint
                  ref={printRef}
                  {...recipeData}
                  onTryAgain={onTryAgain}
                />
              </div>
            )}

            {processedJson.error ? (
              <div
                className="tremor-Card-root  relative w-full text-left ring-1 rounded-tremor-default bg-tremor-background ring-tremor-ring shadow-tremor-card dark:bg-dark-tremor-background dark:ring-dark-tremor-ring dark:shadow-dark-tremor-card border-tremor-brand dark:border-dark-tremor-brand p-6 pr-4 w-[65ch] mx-auto"
                style={{ marginTop: "50px" }}
              >
                <p className="tremor-TableCell-root text-tremor-content">
                  Unable to process your request. Please click{" "}
                  <Link
                    className="text-[#bd1e59] hover:underline font-bold"
                    href={RoutePaths.OVERVIEW}
                  >
                    here
                  </Link>{" "}
                  to start over and try again.
                </p>
              </div>
            ) : (
              <div className={sidebar.sidebar}>
                {lastMessage ? (
                  <RecipeOutput
                    recipeData={processedJson}
                    thumbnail={recipeData?.thumbnail}
                    url={recipeData?.url}
                    website={recipeData?.website}
                    isLoading={isLoading}
                    onTryAgain={onTryAgain}
                    loader={<Loader isLoading />}
                  />
                ) : (
                  <RecipeOutput
                    recipeData={recipeData}
                    thumbnail={recipeData?.thumbnail}
                    url={recipeData?.url}
                    website={recipeData?.website}
                    isLoading={isRecipeLoading}
                    onTryAgain={onTryAgain}
                    loader={<Skeleton count={15} />}
                  />
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
