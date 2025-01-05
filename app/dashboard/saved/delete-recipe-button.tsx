">puse client";

import { TrashIcon } from "lucide-react";
import * as Toast from "@radix-ui/react-toast";
import { useState } from "react";

import { deleteRecipeAction } from "./delete-recipe-action";
import "./toast-style.css";

type Props = {
  userId: string;
  recipeId: string;
};

type DeletePayload = {
  userId: string;
  recipeId: string;
};

export const DeleteRecipeButton = ({ userId, recipeId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function deleteRecipe({ recipeId, userId }: DeletePayload) {
    setIsLoading(true);
    setIsOpen(true);

    try {
      await deleteRecipeAction({ recipeId, userId });
    } catch (error) {
      setIsLoading(false);
    }

    setIsLoading(false);
    setIsOpen(true);

    setTimeout(() => {
      setIsOpen(false);
    }, 3000);
  }

  return (
    <>
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className="ToastRoot fixed bottom-5 right-5 bg-white dark:bg-black rounded-sm shadow-xl p-4 list-none"
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <Toast.Title>
            <p className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words text-tremor-default text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis text-tremor-title">
              Recipe removed!
            </p>
          </Toast.Title>
        </Toast.Root>
        <Toast.Viewport />
      </Toast.Provider>
      <button
        disabled={isLoading}
        className="bg-white border-none p-0 cursor-pointer flex gap-1 items-center text-rusticRed hover:text-rusticRedLight text-lg"
        onClick={() => {
          deleteRecipe({ recipeId, userId });
        }}
      >
        <TrashIcon className="h-4 w-4 mr-1" />
        <p className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words">
          {isLoading ? "Deleting..." : "Remove recipe"}
        </p>
      </button>
    </>
  );
};
