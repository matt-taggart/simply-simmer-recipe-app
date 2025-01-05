"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import untruncateJson from "untruncate-json";
import {
  ArrowUpCircle,
  CheckIcon,
  PlusSquare,
  PrinterIcon,
  SaveIcon,
  Sparkles,
} from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import * as Toast from "@radix-ui/react-toast";
import { useReactToPrint } from "react-to-print";

import { saveRecipeChangesAction } from "@/app/dashboard/saved/[id]/save-recipe-changes-action";

import { cn, ensureHttps } from "@/lib/utils";
import sidebar from "./sidebar.module.css";
import { Button } from "@/components/ui/button";
import { saveRecipeAction } from "./save-recipe-action";
import { Loader } from "@/components/Loader";
import { Input } from "@/components/input";
import { RecipeOutput } from "@/components/recipe-output";
import { ModificationsMenu } from "@/app/dashboard/saved/[id]/modifications-menu";
import { DEFAULT_PRINT_STYLE, RoutePaths } from "@/lib/constants";
import { FullRecipePrint } from "@/components/full-recipe-print";
import { createClient } from "@/utils/supabase/client";

export const dynamic = "force-dynamic";

type Payload = {
  user_id: string;
  name: string;
  ingredients: string;
  instructions: string;
  modifications: string;
  thumbnail?: string;
  url?: string;
  website?: string;
  isSubscribed: boolean;
};

export default function RecipeDetails({ user, isSubscribed } = {}) {
  const [isInvalid, setIsInvalid] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCalled, setIsCalled] = useState(false);
  const [savedId, setSavedId] = useState(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { id } = useParams();

  const supabase = createClient();

  const { data = [] } = useQuery({
    queryKey: ["recipes"],
    enabled: false,
  });

  const recipe = data.find((recipe) => recipe.id === id);
  const recipeUrl = recipe?.url;

  const {
    messages,
    input,
    isLoading,
    handleSubmit,
    handleInputChange,
    setMessages,
    setInput,
  } = useChat({
    api: "/api/chat",
    onError: () => {
      setIsInvalid(true);
      setIsCalled(true);
    },
    onResponse: async () => {
      setIsPopoverOpen(false);
      setIsCalled(true);
      const user = await supabase.auth.getUser();
      await supabase.rpc("increment_generation_count", {
        user_id_value: user?.data?.user?.id,
      });
    },
  });

  const [processedJson, setProcessedJson] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    modifications: "",
    error: false,
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

  function onSubmit(event) {
    const parsedUrl = ensureHttps(event.target.value);

    if (!parsedUrl) {
      setIsInvalid(true);

      return;
    } else {
      setIsInvalid(false);
    }

    handleSubmit(event, { askAI: false, recipe: parsedUrl });
  }

  function onTryAgain() {
    setIsInvalid(false);
    setMessages([]);
  }

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
        id: savedId,
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

  const onAIDraftSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const firstMessageFromAssistant = messages.find(
      (message) => message.role === "assistant"
    );
    handleSubmit(event, {
      data: {
        askAI: true,
        recipe: firstMessageFromAssistant?.content,
      },
    });
  };

  const saveRecipe = async ({
    user_id,
    name,
    ingredients,
    instructions,
    modifications,
    thumbnail,
    url,
    website,
  }: Payload) => {
    setIsSaving(true);

    try {
      const response = await saveRecipeAction({
        user_id,
        name,
        ingredients,
        instructions,
        modifications,
        thumbnail,
        url,
        website,
      });

      const id = response?.find(Boolean)?.id;
      setSavedId(id);
    } catch (error) {
      setIsSaving(false);
    }

    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
    }, 2000);
  };

  useEffect(() => {
    if (!recipeUrl) {
      router.push(RoutePaths.OVERVIEW);
    }
  }, [recipeUrl]);

  useEffect(() => {
    setInput(recipeUrl);
  }, [setInput]);

  useEffect(() => {
    if (recipeUrl && !isCalled) {
      onSubmit({ preventDefault: () => { }, target: { value: recipeUrl } });
    }
  }, [onSubmit, recipeUrl, isCalled]);

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
            {lastMessage && (
              <div className="flex justify-start sm:justify-end align-center">
                <Popover.Root
                  open={isPopoverOpen}
                  onOpenChange={() => setIsPopoverOpen(!isPopoverOpen)}
                >
                  <div className="flex flex-col w-full sm:w-auto sm:flex-row gap-2">
                    <Button
                      disabled={!lastMessage || isLoading}
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
                        {(() => {
                          if (isSaved) {
                            return (
                              <>
                                {isSubscribed && (
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
                                )}
                              </>
                            );
                          }

                          return (
                            <>
                              {isSubscribed && (
                                <Button
                                  disabled={!lastMessage || isLoading}
                                  className={cn(
                                    "text-current border-none p-0 font-inherit cursor-pointer outline-inherit",
                                    "ring-1 rounded-tremor-default bg-tremor-background ring-tremor-ring shadow-tremor-card dark:bg-dark-tremor-background dark:ring-dark-tremor-ring dark:shadow-dark-tremor-card border-tremor-brand dark:border-dark-tremor-brand px-4 py-2 flex",

                                    "text-tremor-default text-tremor-content dark:text-dark-tremor-content bg-tremor-background hover:bg-accent opacity-50 hover:opacity-100 text-[#bd1e59] max-[600px]:py-8"
                                  )}
                                  onClick={() =>
                                    saveRecipe({
                                      ...processedJson,
                                      user_id: user?.id,
                                      thumbnail: recipe?.thumbnail?.src,
                                      url: recipe?.profile?.url,
                                      website: recipe?.profile?.long_name,
                                    })
                                  }
                                >
                                  {isSaving ? (
                                    <>
                                      <CheckIcon className="mr-2" />
                                      <p className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words">
                                        Recipe saved
                                      </p>
                                    </>
                                  ) : (
                                    <>
                                      <PlusSquare className="mr-2" />
                                      <p className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words">
                                        Save recipe
                                      </p>
                                    </>
                                  )}
                                </Button>
                              )}
                            </>
                          );
                        })()}
                      </>
                    )}
                    <Toast.Provider swipeDirection="right">
                      <Toast.Root
                        className="ToastRoot fixed bottom-5 right-5 bg-white dark:bg-black rounded-sm shadow-xl p-4 list-none"
                        open={isDeleteModalOpen}
                        onOpenChange={setIsDeleteModalOpen}
                      >
                        <Toast.Title>Recipe removed!</Toast.Title>
                      </Toast.Root>
                      <Toast.Viewport />
                    </Toast.Provider>
                    {isSubscribed && (
                      <Popover.Trigger disabled={!lastMessage || isLoading}>
                        <Button
                          disabled={!lastMessage || isLoading}
                          className={cn(
                            "text-current border-none p-0 font-inherit cursor-pointer outline-inherit",
                            "ring-1 rounded-tremor-default bg-tremor-background ring-tremor-ring shadow-tremor-card dark:bg-dark-tremor-background dark:ring-dark-tremor-ring dark:shadow-dark-tremor-card border-tremor-brand dark:border-dark-tremor-brand px-4 py-2 flex",
                            "text-tremor-default text-tremor-content dark:text-dark-tremor-content bg-tremor-background hover:bg-accent opacity-50 hover:opacity-100 text-[#bd1e59] max-[600px]:py-8 w-full sm:w-auto -mt-[0.5rem] sm:mt-0 sm:-ml-[0.5rem]"
                          )}
                        >
                          <Sparkles className="mr-2" />
                          <p className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words">
                            Ask AI to modify recipe
                          </p>
                        </Button>
                      </Popover.Trigger>
                    )}
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
            )}

            <div style={{ display: "none" }}>
              <FullRecipePrint
                ref={printRef}
                ingredients={processedJson.ingredients}
                instructions={processedJson.instructions}
                modifications={processedJson.modifications}
                onTryAgain={onTryAgain}
              />
            </div>

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
                {lastMessage && (
                  <RecipeOutput
                    thumbnail={recipe?.thumbnail?.src}
                    url={recipe?.profile?.url}
                    website={recipe?.profile?.long_name}
                    recipeData={processedJson}
                    isLoading={isLoading}
                    onTryAgain={onTryAgain}
                    loader={<Loader isLoading />}
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
